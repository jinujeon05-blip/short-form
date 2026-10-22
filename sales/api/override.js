// 손님 화면이 menu.js 바로 뒤에서 불러오는 스크립트. 점주가 고친 메뉴가 있으면 window.MENU 를 바꿔 끼우고, 없으면 아무것도 안 한다.
// 사진(메뉴 항목 옆 작은 사진)도 여기서 붙인다. 실패해도 손님 화면은 기본 menu.js 로 그대로 나온다.
const L = require('./_lib');
const S = require('./_store');
const M = require('./_menu');

const RUNTIME = `(function(){var M=window.MENU;if(!M)return;var st=document.createElement('style');st.textContent='.qm-photo{float:right;width:84px;height:84px;object-fit:cover;border-radius:12px;margin:2px 0 6px 10px;cursor:zoom-in;background:rgba(128,128,128,.15)}#menu li::after{content:"";display:block;clear:both}.qm-zoom{position:fixed;inset:0;z-index:2147483000;display:none;place-items:center;padding:16px;background:rgba(15,15,15,.88);cursor:zoom-out}.qm-zoom.show{display:grid}.qm-zoom figure{margin:0;max-width:640px;width:100%}.qm-zoom img{width:100%;max-height:78vh;object-fit:contain;border-radius:16px;display:block;background:#fff}.qm-zoom figcaption{margin-top:10px;text-align:center;font:800 16px/1.4 system-ui,sans-serif;color:#fff}';document.head.appendChild(st);function apply(){var secs=document.querySelectorAll('#menu > section');for(var i=0;i<secs.length;i++){var cat=M[i];if(!cat)continue;var lis=secs[i].querySelectorAll(':scope > ul > li');for(var j=0;j<lis.length;j++){var it=cat.items[j],li=lis[j];if(!it||!it.photo||li.querySelector('img'))continue;var im=document.createElement('img');im.className='qm-photo';im.loading='lazy';im.alt='';im.src=it.photo;im.tabIndex=0;li.insertBefore(im,li.firstChild)}}}var z,zi,zc;function open(im){if(!z){z=document.createElement('div');z.className='qm-zoom';z.innerHTML='<figure><img alt=""><figcaption></figcaption></figure>';document.body.appendChild(z);zi=z.querySelector('img');zc=z.querySelector('figcaption');z.addEventListener('click',function(){z.classList.remove('show')})}var li=im.closest('li'),b=li&&li.querySelector('.row b, b');zi.src=im.currentSrc||im.src;zc.textContent=b?b.textContent:'';z.classList.add('show')}document.addEventListener('click',function(e){var t=e.target;if(t&&t.classList&&t.classList.contains('qm-photo'))open(t)});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&z)z.classList.remove('show');if(e.key==='Enter'&&e.target&&e.target.classList&&e.target.classList.contains('qm-photo'))open(e.target)});document.addEventListener('DOMContentLoaded',function(){var m=document.getElementById('menu');if(!m)return;apply();new MutationObserver(apply).observe(m,{childList:true,subtree:true})})})();`;

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=15, stale-while-revalidate=300');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const shop = String(req.query.shop || '');
  if (!L.validShop(shop)) return res.status(200).send('/* - */');
  try {
    const doc = await S.getJson(`menu/${shop}.json`);
    if (!doc || !Array.isArray(doc.menu)) return res.status(200).send('/* default */');
    if (!doc.v) { try { const d = await M.loadDefault(shop); doc.menu = M.restoreFromDefault(doc.menu, d.menu); } catch {} } // 예전 저장본 복구
    const info = doc.info || {};
    const safe = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(new RegExp('[\\u2028\\u2029]', 'g'), '');
    return res.status(200).send(`window.MENU=${safe(doc.menu)};window.RESTAURANT=Object.assign(window.RESTAURANT||{},${safe(info)});${RUNTIME}`);
  } catch (e) {
    console.error('override 실패', shop, e && e.message);
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=5');
    return res.status(200).send('/* error */');
  }
};
