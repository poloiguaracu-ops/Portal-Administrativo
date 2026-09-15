(() => {
  'use strict';
  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();
  const asset = (name) => {
    const root = location.pathname.startsWith('/Portal-Administrativo') ? '/Portal-Administrativo/public/' : '/public/';
    return new URL(root + name, location.origin).href;
  };
  ready(() => {
    const isPortal = !!document.querySelector('.portal, .sidebar, .main, .login, .setup-card, .app');
    const isInstituto = !!document.querySelector('.hero, .courses, .signup');
    document.documentElement.classList.add('iecg-ready');
    if (isPortal) {
      const visual = document.createElement('link'); visual.rel='stylesheet'; visual.href=asset('portal-visual-v4.css?v=4'); document.head.appendChild(visual);
      const extra = document.createElement('link'); extra.rel='stylesheet'; extra.href=asset('portal-super-polish.css?v=1'); document.head.appendChild(extra);
      ['portal-ui-v5.js?v=5','portal-v6.js?v=6','portal-pro.js?v=1'].forEach(src => { const s=document.createElement('script'); s.src=asset(src); s.defer=true; document.body.appendChild(s); });
    }
    if (isInstituto) {
      const s=document.createElement('script'); s.src=asset('instituto-pro.js?v=3'); s.defer=true; document.body.appendChild(s);
      document.querySelectorAll('.course-item strong').forEach(el => { if (!el.textContent.trim()) el.textContent='Formação'; });
      document.querySelectorAll('.chip').forEach(el => { if (el.textContent.includes('44 formações')) el.textContent=el.textContent.replace('44 formações','45 formações'); });
    }
    const style=document.createElement('style'); style.textContent=`:focus-visible{outline:3px solid rgba(255,116,0,.42)!important;outline-offset:2px}button,a,input,select,textarea{transition:box-shadow .18s ease,border-color .18s ease,transform .18s ease}button:disabled{cursor:not-allowed!important;opacity:.6}.iecg-toast{position:fixed;right:22px;bottom:22px;z-index:99999;max-width:min(420px,calc(100vw - 44px));padding:14px 17px;border-radius:14px;background:#21122b;color:#fff;box-shadow:0 18px 45px rgba(0,0,0,.22);font:600 13px/1.45 Inter,Segoe UI,Arial,sans-serif}@keyframes iecgIn{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}`;
    document.head.appendChild(style);
    window.iecgToast=(message,title='Instituto Canoa Grande')=>{document.querySelectorAll('.iecg-toast').forEach(x=>x.remove());const t=document.createElement('div');t.className='iecg-toast';t.style.animation='iecgIn .18s ease both';const s=document.createElement('strong');s.textContent=title;const p=document.createElement('span');p.style.display='block';p.textContent=message;t.append(s,p);document.body.appendChild(t);setTimeout(()=>t.remove(),4200)};
    document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));
    document.querySelectorAll('a[href*="wa.me/5544997239673"]').forEach(a=>{if(!a.href.includes('text='))a.href='https://wa.me/5544997239673?text='+encodeURIComponent('Olá! Gostaria de saber mais sobre o Instituto Educacional Canoa Grande de Educação e Formação.');a.target='_blank';a.rel='noopener noreferrer';});
  });
})();
