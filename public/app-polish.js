(() => {
  'use strict';
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn, { once:true }) : fn();
  ready(() => {
    document.documentElement.classList.add('iecg-ready');
    const visual=document.createElement('link'); visual.rel='stylesheet'; visual.href='/portal-visual-v4.css?v=4'; document.head.appendChild(visual);
    const v5=document.createElement('script'); v5.src='/portal-ui-v5.js?v=5'; v5.defer=true; document.body.appendChild(v5);
    const v6=document.createElement('script'); v6.src='/portal-v6.js?v=6'; v6.defer=true; document.body.appendChild(v6);
    const style = document.createElement('style');
    style.textContent = `
      :root{--iecg-purple:#2a0b49;--iecg-purple-2:#6b2a94;--iecg-orange:#ff7400;--iecg-bg:#f7f5f9}
      body{background:var(--iecg-bg)!important}
      :focus-visible{outline:3px solid rgba(255,116,0,.42)!important;outline-offset:2px}
      button,a,input,select,textarea{transition:box-shadow .18s ease,border-color .18s ease,transform .18s ease}
      button:disabled{cursor:not-allowed!important;opacity:.6}
      .iecg-toast{position:fixed;right:22px;bottom:22px;z-index:99999;max-width:min(420px,calc(100vw - 44px));padding:14px 17px;border-radius:14px;background:#21122b;color:#fff;box-shadow:0 18px 45px rgba(0,0,0,.22);font:600 13px/1.45 Inter,Segoe UI,Arial,sans-serif;animation:iecgIn .2s ease}
      .iecg-toast strong{display:block;color:#ffad52;margin-bottom:2px}
      @keyframes iecgIn{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}
      .iecg-loading{position:relative;pointer-events:none}.iecg-loading:after{content:'';position:absolute;inset:0;background:rgba(255,255,255,.55);border-radius:inherit}
      @media(max-width:700px){.iecg-toast{right:12px;bottom:12px;max-width:calc(100vw - 24px)}}
    `;
    document.head.appendChild(style);

    window.iecgToast = (message, title='Instituto Canoa Grande') => {
      document.querySelectorAll('.iecg-toast').forEach(x=>x.remove());
      const t=document.createElement('div'); t.className='iecg-toast';
      const s=document.createElement('strong'); s.textContent=title;
      const p=document.createElement('span'); p.textContent=message;
      t.append(s,p); document.body.appendChild(t);
      setTimeout(()=>t.remove(),4200);
    };

    document.querySelectorAll('a[href="#"]').forEach(a=>a.addEventListener('click',e=>e.preventDefault()));

    document.querySelectorAll('a[href*="wa.me/5544997239673"]').forEach(a=>{
      if(!a.href.includes('text=')) a.href='https://wa.me/5544997239673?text='+encodeURIComponent('Olá! Gostaria de saber mais sobre o Instituto Educacional Canoa Grande de Educação e Formação.');
      a.target='_blank'; a.rel='noopener noreferrer';
    });

    document.querySelectorAll('form').forEach(form=>{
      if(form.dataset.iecgEnhanced) return;
      const action=(form.getAttribute('action')||'').trim();
      if(action==='' || action==='#'){
        form.dataset.iecgEnhanced='1';
        form.addEventListener('submit',e=>{
          e.preventDefault();
          const data=new FormData(form);
          const parts=[];
          for(const [key,value] of data.entries()) if(String(value).trim()) parts.push(`${key}: ${value}`);
          const msg='Olá! Quero informações sobre as formações do Instituto Canoa Grande.\n'+parts.join('\n');
          window.open('https://wa.me/5544997239673?text='+encodeURIComponent(msg),'_blank','noopener');
          window.iecgToast('Sua solicitação foi preparada para o WhatsApp.');
        });
      }
    });
  });
})();
