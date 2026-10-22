// 손님 화면이 menu.js 바로 뒤에서 불러오는 스크립트. 점주가 고친 메뉴가 있으면 window.MENU 를 바꿔 끼우고, 없으면 아무것도 안 한다.
// 사진(메뉴 항목 옆 작은 사진)도 여기서 붙인다. 실패해도 손님 화면은 기본 menu.js 로 그대로 나온다.
const L = require('./_lib');
const S = require('./_store');

const RUNTIME = `(function(){var M=window.MENU;if(!M)return;var st=document.createElement('style');st.textContent='.qm-photo{float:right;width:76px;height:76px;object-fit:cover;border-radius:12px;margin:2px 0 6px 10px}#menu li::after{content:"";display:block;clear:both}';document.head.appendChild(st);function apply(){var secs=document.querySelectorAll('#menu > section');for(var i=0;i<secs.length;i++){var cat=M[i];if(!cat)continue;var lis=secs[i].querySelectorAll(':scope > ul > li');for(var j=0;j<lis.length;j++){var it=cat.items[j],li=lis[j];if(!it||!it.photo||li.querySelector('.qm-photo'))continue;var im=document.createElement('img');im.className='qm-photo';im.loading='lazy';im.alt='';im.src=it.photo;li.insertBefore(im,li.firstChild)}}}document.addEventListener('DOMContentLoaded',function(){var m=document.getElementById('menu');if(!m)return;apply();new MutationObserver(apply).observe(m,{childList:true,subtree:true})})})();`;

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=15, stale-while-revalidate=300');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const shop = String(req.query.shop || '');
  if (!L.validShop(shop)) return res.status(200).send('/* - */');
  try {
    const doc = await S.getJson(`menu/${shop}.json`);
    if (!doc || !Array.isArray(doc.menu)) return res.status(200).send('/* default */');
    const info = doc.info || {};
    const safe = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(new RegExp('[\\u2028\\u2029]', 'g'), '');
    return res.status(200).send(`window.MENU=${safe(doc.menu)};window.RESTAURANT=Object.assign(window.RESTAURANT||{},${safe(info)});${RUNTIME}`);
  } catch (e) {
    console.error('override 실패', shop, e && e.message);
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=5');
    return res.status(200).send('/* error */');
  }
};
