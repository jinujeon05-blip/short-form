"""glTF/GLB 정리 도구 (3D 사무실 office-3d용, 2026-11-22)

  python tools/glb-pack.py anims <UAL.glb> <out.glb> 이름1,이름2,...   # 동작만 남기고 몸 메시 제거
  python tools/glb-pack.py model <in.gltf|in.glb> <out.glb> [텍스처크기=512]  # 노멀·거칠기 텍스처 빼고 작게 묶기

원본(Quaternius·Kenney, CC0)은 저장소 밖에 두고, 대시보드에는 이 도구로 줄인 파일만 넣는다.
"""
import io, json, struct, sys
from pathlib import Path


def load(path):
    p = Path(path)
    if p.suffix.lower() == '.glb':
        b = p.read_bytes()
        off, j, binc = 12, None, b''
        while off < len(b):
            ln, typ = struct.unpack('<II', b[off:off + 8])
            chunk = b[off + 8:off + 8 + ln]
            if typ == 0x4E4F534A: j = json.loads(chunk)
            elif typ == 0x004E4942: binc = chunk
            off += 8 + ln
        bufs = [binc]
    else:
        j = json.loads(p.read_text(encoding='utf-8'))
        bufs = [(p.parent / buf['uri']).read_bytes() for buf in j.get('buffers', [])]
    imgs = []
    for im in j.get('images', []):
        if 'uri' in im:  # 노멀 텍스처 등 원본에 빠진 파일은 어차피 버리므로 None으로 둔다
            f = p.parent / im['uri']
            imgs.append((f.read_bytes() if f.exists() else None, im.get('mimeType') or 'image/png'))
        else:
            bv = j['bufferViews'][im['bufferView']]
            d = bufs[bv.get('buffer', 0)][bv.get('byteOffset', 0):bv.get('byteOffset', 0) + bv['byteLength']]
            imgs.append((d, im.get('mimeType', 'image/png')))
    return j, bufs, imgs


def view_bytes(j, bufs, bvi):
    bv = j['bufferViews'][bvi]
    o = bv.get('byteOffset', 0)
    return bufs[bv.get('buffer', 0)][o:o + bv['byteLength']], bv


def write_glb(j, bufs, imgs, out):
    """j 안에서 실제로 쓰는 accessor·image만 새 버퍼에 다시 담는다."""
    blob = bytearray(); new_views = []

    def add(data, extra=None):
        while len(blob) % 4: blob.append(0)
        v = {'buffer': 0, 'byteOffset': len(blob), 'byteLength': len(data)}
        if extra: v.update(extra)
        blob.extend(data); new_views.append(v); return len(new_views) - 1

    vmap = {}
    for a in j.get('accessors', []):
        if 'bufferView' not in a: continue
        old = a['bufferView']
        if old not in vmap:
            data, bv = view_bytes(j, bufs, old)
            vmap[old] = add(data, {k: bv[k] for k in ('byteStride', 'target') if k in bv})
        a['bufferView'] = vmap[old]
    if j.get('images'):
        for i, im in enumerate(j['images']):
            data, mime = imgs[i]
            j['images'][i] = {'bufferView': add(data), 'mimeType': mime, **({'name': im['name']} if 'name' in im else {})}
    while len(blob) % 4: blob.append(0)
    j['bufferViews'] = new_views
    j['buffers'] = [{'byteLength': len(blob)}]
    js = json.dumps(j, separators=(',', ':')).encode()
    js += b' ' * ((4 - len(js) % 4) % 4)
    total = 12 + 8 + len(js) + 8 + len(blob)
    Path(out).write_bytes(struct.pack('<III', 0x46546C67, 2, total) + struct.pack('<II', len(js), 0x4E4F534A) + js
                          + struct.pack('<II', len(blob), 0x004E4942) + bytes(blob))
    print(out, f'{total / 1024:.0f} KB')


def prune_accessors(j, keep):
    """keep에 든 accessor만 남기고 번호를 다시 매긴다. 반환: 옛 번호→새 번호."""
    keep = sorted(set(keep)); amap = {o: n for n, o in enumerate(keep)}
    j['accessors'] = [j['accessors'][o] for o in keep]
    return amap


def cmd_anims(src, out, names):
    j, bufs, _ = load(src)
    want = names.split(',')
    have = {a['name']: a for a in j['animations']}
    miss = [n for n in want if n not in have]
    if miss: sys.exit(f'없는 동작: {miss}')
    anims = [have[n] for n in want]
    used = [s[k] for a in anims for s in a['samplers'] for k in ('input', 'output')]
    amap = prune_accessors(j, used)
    for a in anims:
        for s in a['samplers']: s['input'] = amap[s['input']]; s['output'] = amap[s['output']]
    j['animations'] = anims
    for n in j['nodes']: n.pop('mesh', None); n.pop('skin', None)
    for k in ('meshes', 'skins', 'materials', 'textures', 'images', 'samplers'): j.pop(k, None)
    write_glb(j, bufs, [], out)


def cmd_model(src, out, size=512):
    from PIL import Image
    j, bufs, imgs = load(src)
    for m in j.get('materials', []):
        m.pop('normalTexture', None); m.pop('occlusionTexture', None)
        pbr = m.setdefault('pbrMetallicRoughness', {})
        pbr.pop('metallicRoughnessTexture', None); pbr['metallicFactor'] = 0; pbr['roughnessFactor'] = 0.85
    used_tex = {m['pbrMetallicRoughness']['baseColorTexture']['index'] for m in j.get('materials', [])
                if 'baseColorTexture' in m.get('pbrMetallicRoughness', {})}
    tex_keep = sorted(used_tex); tmap = {o: n for n, o in enumerate(tex_keep)}
    img_keep = sorted({j['textures'][t]['source'] for t in tex_keep}); imap = {o: n for n, o in enumerate(img_keep)}
    j['textures'] = [dict(j['textures'][t], source=imap[j['textures'][t]['source']]) for t in tex_keep]
    for m in j.get('materials', []):
        bc = m['pbrMetallicRoughness'].get('baseColorTexture')
        if bc: bc['index'] = tmap[bc['index']]
    new_imgs = []
    for o in img_keep:
        im = Image.open(io.BytesIO(imgs[o][0])); has_a = im.mode in ('RGBA', 'LA') and im.getextrema()[-1][0] < 255
        im = im.convert('RGBA' if has_a else 'RGB'); im.thumbnail((size, size))
        b = io.BytesIO()
        if has_a: im.save(b, 'PNG', optimize=True); new_imgs.append((b.getvalue(), 'image/png'))
        else: im.save(b, 'JPEG', quality=86); new_imgs.append((b.getvalue(), 'image/jpeg'))
    j['images'] = [j['images'][o] for o in img_keep]
    if not j['images']: j.pop('images'); j.pop('textures', None)
    write_glb(j, bufs, new_imgs, out)


if __name__ == '__main__':
    a = sys.argv[1:]
    if a and a[0] == 'anims': cmd_anims(a[1], a[2], a[3])
    elif a and a[0] == 'model': cmd_model(a[1], a[2], int(a[3]) if len(a) > 3 else 512)
    else: print(__doc__)
