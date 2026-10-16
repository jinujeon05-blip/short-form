# QR 확인 (버전 3, 바이트 모드만): python3 tools/qr-check.py <qr.json>  — tools/qr.cjs 가 만든 .json 을 직접 해독해 URL이 맞는지 본다.
import json, sys
def gf():
    exp=[0]*512; log=[0]*256; x=1
    for i in range(255):
        exp[i]=x; log[x]=i; x<<=1
        if x&256: x^=0x11d
    for i in range(255,512): exp[i]=exp[i-255]
    return exp,log
EXP,LOG=gf()
def mul(a,b): return 0 if a==0 or b==0 else EXP[LOG[a]+LOG[b]]
def rs_ec(data,n):
    g=[1]
    for i in range(n):
        ng=[0]*(len(g)+1)
        for j,c in enumerate(g): ng[j]^=c; ng[j+1]^=mul(c,EXP[i])
        g=ng
    msg=list(data)+[0]*n
    for i in range(len(data)):
        c=msg[i]
        if c:
            for j in range(len(g)): msg[i+j]^=mul(g[j],c)
    return msg[len(data):]
def decode(M):
    n=len(M); assert n==29, n
    bits=[M[8][c] for c in (0,1,2,3,4,5,7,8)]+[M[r][8] for r in (7,5,4,3,2,1,0)]
    fmt=int(''.join(map(str,bits)),2)
    # find nearest valid format code
    best=None
    for ec in range(4):
        for mask in range(8):
            v=(ec<<3)|mask; b=v<<10
            for i in range(14,9,-1):
                if b&(1<<i): b^=0x537<<(i-10)
            code=((v<<10)|b)^0x5412
            dist=bin(code^fmt).count('1')
            if best is None or dist<best[0]: best=(dist,ec,mask)
    dist,ec,mask=best
    assert dist==0, ('format bits damaged', dist)
    func=[[False]*n for _ in range(n)]
    def box(r0,c0,h,w):
        for r in range(r0,r0+h):
            for c in range(c0,c0+w):
                if 0<=r<n and 0<=c<n: func[r][c]=True
    box(0,0,9,9); box(0,n-8,9,8); box(n-8,0,8,9)
    box(6,0,1,n); box(0,6,n,1); box(20,20,5,5); func[n-8][8]=True
    masks=[lambda i,j:(i+j)%2==0,lambda i,j:i%2==0,lambda i,j:j%3==0,lambda i,j:(i+j)%3==0,
           lambda i,j:(i//2+j//3)%2==0,lambda i,j:(i*j)%2+(i*j)%3==0,
           lambda i,j:((i*j)%2+(i*j)%3)%2==0,lambda i,j:((i+j)%2+(i*j)%3)%2==0]
    out=[]; up=True; c=n-1
    while c>0:
        if c==6: c-=1
        rows=range(n-1,-1,-1) if up else range(n)
        for r in rows:
            for cc in (c,c-1):
                if not func[r][cc]: out.append(M[r][cc]^int(masks[mask](r,cc)))
        up=not up; c-=2
    cw=[int(''.join(map(str,out[i:i+8])),2) for i in range(0,len(out)//8*8,8)]
    assert len(cw)==70, len(cw)
    level={1:'L',0:'M',3:'Q',2:'H'}[ec]
    nb,nd,ne={'L':(1,55,15),'M':(1,44,26),'Q':(2,17,18),'H':(2,13,22)}[level]
    blocks=[[] for _ in range(nb)]; ecs=[[] for _ in range(nb)]; k=0
    for i in range(nd):
        for b in range(nb): blocks[b].append(cw[k]); k+=1
    for i in range(ne):
        for b in range(nb): ecs[b].append(cw[k]); k+=1
    for b in range(nb): assert rs_ec(blocks[b],ne)==ecs[b], 'RS mismatch'
    data=sum(blocks,[]); bs=''.join(f'{x:08b}' for x in data)
    assert bs[:4]=='0100', 'not byte mode'
    ln=int(bs[4:12],2)
    return level,mask,bytes(int(bs[12+8*i:20+8*i],2) for i in range(ln)).decode()
if __name__=='__main__':
    M=json.load(open(sys.argv[1]))
    print(decode(M))
