(() => {
  'use strict';
  if (window.__IECG_DASH_PRO_V2__) return;
  window.__IECG_DASH_PRO_V2__ = true;
  const ready = fn => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  ready(() => {
    const main = $('.main');
    if (!main || $('.login, #login, #setup') && !$('#app, .portal')) return;
    const style = document.createElement('style');
    style.textContent = `
      .pdp-hero{display:flex;align-items:center;justify-content:space-between;gap:18px;margin:0 0 18px;padding:20px 22px;border-radius:18px;background:linear-gradient(135deg,#32124f,#5f2688);color:#fff;box-shadow:0 15px 35px rgba(50,18,79,.16)}
      .pdp-hero h1{margin:0;font-size:24px;line-height:1.15;font-weight:900}.pdp-hero p{margin:7px 0 0;color:#eadff0;font-size:13px}.pdp-clock{font-variant-numeric:tabular-nums;text-align:right;font-size:22px;font-weight:900;white-space:nowrap}.pdp-clock small{display:block;font-size:11px;font-weight:700;opacity:.78;margin-top:3px}
      .pdp-breadcrumb{display:flex;align-items:center;gap:7px;margin:-2px 0 10px;font-size:12px;color:#7a7182}.pdp-breadcrumb strong{color:#32124f}.pdp-kbd{display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:22px;padding:0 6px;border:1px solid #ded6e6;border-bottom-width:2px;border-radius:6px;background:#fff;font:800 10px/1 Segoe UI,Arial;color:#5b5063}
      .pdp-status{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border-radius:999px;background:#f3edf7;color:#4b2a6d;font-size:10px;font-weight:900;border:1px solid #e6d9ed}.pdp-dot{width:7px;height:7px;border-radius:50%;background:#31a56b}
      @media(max-width:700px){.pdp-hero{display:block;padding:18px}.pdp-clock{text-align:left;margin-top:12px;font-size:19px}.pdp-breadcrumb{display:none}.pdp-status{width:100%;justify-content:center;margin-top:6px}}
    `;
    document.head.appendChild(style);

    if (!$('.pdp-hero')) {
      const h=document.createElement('section'); h.className='pdp-hero';
      h.innerHTML='<div><h1>Central administrativa</h1><p>Gestão do Instituto Educacional Canoa Grande de Educação e Formação</p></div><div class="pdp-clock" aria-live="polite">--:--:--<small>Horário local</small></div>';
      const top = $('.topbar,.top', main); if (top) top.insertAdjacentElement('afterend', h); else main.prepend(h);
    }
    if (!$('.pdp-breadcrumb')) {
      const top = $('.topbar,.top', main);
      if (top) {
        const b=document.createElement('div'); b.className='pdp-breadcrumb';
        const title=$('h2', top)?.textContent?.trim() || 'Painel';
        b.innerHTML=`<span>Portal administrativo</span><span>›</span><strong>${title.replace(/[<>&\"']/g,'')}</strong><span class="pdp-kbd">Esc</span>`;
        top.prepend(b);
      }
    }
    if (!$('.pdp-status')) {
      const topActions=$('.top-actions', main);
      if(topActions){const s=document.createElement('span');s.className='pdp-status';s.innerHTML='<span class="pdp-dot"></span> Ambiente protegido';topActions.prepend(s);}
    }
    const clock=$('.pdp-clock');
    const updateClock=()=>{if(clock)clock.firstChild.textContent=new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date());};
    updateClock(); setInterval(updateClock,1000);
  });
})();
