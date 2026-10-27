// QR 만들기: node tools/qr.cjs <URL> <출력.svg> [오류정정 L|M|Q|H, 기본 Q]
// 버전 3(29칸)에 맞으면 tools/qr-check.py 로 확인할 수 있다. 안 맞으면 M 으로 낮춘다.
// 클라우드는 /opt/node22, 윈도우 PC는 node.exe 옆 node_modules 의 npm 안에 있다
const path = require('path'), fs = require('fs');
const Q = ['/opt/node22/lib/node_modules/npm/node_modules/qrcode-terminal/vendor/QRCode',
  path.join(path.dirname(process.execPath), 'node_modules/npm/node_modules/qrcode-terminal/vendor/QRCode')].find((p) => fs.existsSync(p));
const QRCode = require(Q), L = require(Q + '/QRErrorCorrectLevel');
const [url, out, lv = 'Q'] = process.argv.slice(2);
if (!url || !out) { console.error('사용법: node tools/qr.cjs <URL> <출력.svg> [L|M|Q|H]'); process.exit(1); }
const qr = new QRCode(-1, L[lv]); qr.addData(url); qr.make();
const n = qr.getModuleCount(), q = 4, size = n + q * 2;
let d = '';
for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c + q} ${r + q}h1v1h-1z`;
fs.writeFileSync(out,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges"><rect width="${size}" height="${size}" fill="#fff"/><path d="${d}" fill="#000"/></svg>\n`);
fs.writeFileSync(out.replace(/\.svg$/, '.json'), JSON.stringify(qr.modules.map(r => r.map(Number))));
console.log('modules', n, 'version', (n - 17) / 4, '→ 확인: python3 tools/qr-check.py', out.replace(/\.svg$/, '.json'), '(확인 후 .json 삭제)');
