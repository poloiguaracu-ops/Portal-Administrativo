(() => {
  'use strict';
  if (window.__IECG_APP_POLISH_V3__) return;
  window.__IECG_APP_POLISH_V3__ = true;
  const ready = fn => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();
  const base = location.pathname.startsWith('/Portal-Administrativo') ? '/Portal-Administrativo/public/' : '/public/';
  const asset = name => new URL(base + name, location.origin).href;
  const scriptOnce = (src, key) => {
    if (document.querySelector(`script[data-iecg="${key}"]`)) return;
    const s = document.createElement('script'); s.src = asset(src); s.defer = true; s.dataset.iecg = key; document.body.appendChild(s);
  };
  const cssOnce = (src, key) => {
    if (document.querySelector(`link[data-iecg="${key}"]`)) return;
    const l = document.createElement('link'); l.rel='stylesheet'; l.href=asset(src); l.dataset.iecg=key; document.head.appendChild(l);
  };
  ready(() => {
    const portal = !!document.querySelector('#app,.portal,.sidebar,.auth-card');
    const instituto = !!document.querySelector('.hero,.courses,.signup');
    if (portal) {
      cssOnce('portal-visual-v4.css?v=9','portal-visual');
      cssOnce('portal-extra.css?v=3','portal-extra');
      cssOnce('portal-super-polish.css?v=3','portal-super');
      scriptOnce('portal-quality.js?v=4','portal-quality');
      scriptOnce('portal-d1.js?v=2','portal-d1');
      scriptOnce('portal-hardening.js?v=2','portal-hardening');
    }
    if (instituto) scriptOnce('instituto-pro.js?v=5','instituto-pro');
    if (!document.querySelector('[data-iecg-global-style]')) {
      const style=document.createElement('style'); style.dataset.iecgGlobalStyle='1';
      style.textContent=`
        :root{--iecg-purple:#4d176e;--iecg-orange:#f56a13}
        :focus-visible{outline:3px solid rgba(245,106,19,.35)!important;outline-offset:2px}
        .iecg-toast{display:flex;flex-direction:column;gap:3px;position:fixed;right:20px;bottom:20px;z-index:99999;max-width:min(420px,calc(100vw - 40px));padding:13px 15px;border-radius:14px;background:#21122b;color:#fff;box-shadow:0 18px 45px rgba(0,0,0,.24);font:600 12px/1.45 Inter,Segoe UI,Arial,sans-serif;animation:iecgIn .2s ease}.iecg-toast strong{color:#ffb265}.iecg-toast span{color:#eee5f3}
        .iecg-systembar{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:0 0 13px;padding:9px 12px;border:1px solid #e8deee;border-radius:12px;background:linear-gradient(180deg,#fff,#fbf8fd);color:#6f6176;font:700 11px/1.35 Inter,Segoe UI,Arial,sans-serif}.iecg-systembar strong{color:#4d176e}.iecg-systembar .sys-dot{width:8px;height:8px;border-radius:50%;background:#f56a13;box-shadow:0 0 0 4px rgba(245,106,19,.10)}.iecg-systembar .sys-sep{opacity:.55}
        .iecg-local-mode{display:none!important}
        @keyframes iecgIn{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}
        @media(prefers-reduced-motion:reduce){.iecg-toast{animation:none}*{scroll-behavior:auto!important}}
      `; document.head.appendChild(style);
    }
    window.iecgToast=(message,title='Instituto Canoa Grande')=>{document.querySelectorAll('.iecg-toast').forEach(e=>e.remove());const t=document.createElement('div');t.className='iecg-toast';const b=document.createElement('strong');b.textContent=title;const p=document.createElement('span');p.textContent=message;t.append(b,p);document.body.appendChild(t);setTimeout(()=>t.remove(),4200)};
    document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
    document.querySelectorAll('a[href*="wa.me/5544997239673"]').forEach(a=>{a.href='https://wa.me/5544997239673?text='+encodeURIComponent('Olá! Gostaria de saber mais sobre o Instituto Educacional Canoa Grande de Educação e Formação.');a.target='_blank';a.rel='noopener noreferrer'});
  });
})();
