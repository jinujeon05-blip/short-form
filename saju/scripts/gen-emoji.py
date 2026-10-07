"""Copies the Fluent Emoji Flat SVGs (MIT, Microsoft) for every emoji the site renders as an image.

    npm pack @iconify-json/fluent-emoji-flat && tar xzf iconify-json-fluent-emoji-flat-*.tgz
    python3 scripts/gen-emoji.py package

Writes public/emoji/<codepoints>.svg and src/content/emojiSet.json (the keys that exist).
"""
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pkg = sys.argv[1]
icons = json.load(open(os.path.join(pkg, 'icons.json'), encoding='utf-8'))
chars = json.load(open(os.path.join(pkg, 'chars.json'), encoding='utf-8'))
W, H = icons.get('width', 32), icons.get('height', 32)

# Sources whose emojis are drawn with <Emoji>: dream/taemong data, zodiac animals, home.
files = glob.glob(os.path.join(ROOT, 'src/content/dreams/*.ts')) + [
    os.path.join(ROOT, p) for p in ['src/content/taemong.ts', 'src/i18n/ko.ts', 'src/i18n/vi.ts', 'src/pages/Home.tsx']
]
EMOJI = re.compile(r"emoji: '([^']+)'|animalEmoji: \[([^\]]+)\]|'(\U0001F300-\U0001FAFF)'")
found = set()
for f in files:
    text = open(f, encoding='utf-8').read()
    for m in re.finditer(r"emoji: '([^']+)'", text):
        found.add(m.group(1))
    for m in re.finditer(r"animalEmoji: \[([^\]]+)\]", text):
        found |= set(re.findall(r"'([^']+)'", m.group(1)))
found |= {'🐐', '🐑'}


def key(e):
    return '-'.join(f'{ord(c):x}' for c in e if ord(c) != 0xFE0F)


def body(name):
    seen = 0
    while name in icons.get('aliases', {}) and seen < 5:
        name = icons['aliases'][name]['parent']
        seen += 1
    return icons['icons'][name]['body']


out = os.path.join(ROOT, 'public/emoji')
os.makedirs(out, exist_ok=True)
ok, missing = [], []
for e in sorted(found):
    k = key(e)
    name = chars.get(k) or chars.get(k + '-fe0f')
    if not name:
        missing.append(e)
        continue
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">{body(name)}</svg>'
    open(os.path.join(out, f'{k}.svg'), 'w', encoding='utf-8').write(svg)
    ok.append(k)
json.dump(sorted(ok), open(os.path.join(ROOT, 'src/content/emojiSet.json'), 'w'), separators=(',', ':'))
print(len(ok), 'emoji written; missing:', ' '.join(missing))
