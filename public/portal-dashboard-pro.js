(() => {
  'use strict';
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  function loadOnce(src){
    if(document.querySelector(`script[src="${src}"]`)) return;
    const s=document.createElement('script'); s.src=src; s.defer=true; document.head.appendChild(s);
  }

  const style = document.createElement('style');
  style.textContent = `
    .pdp-wrap{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin:0 0 22px}
    .pdp-card{position:relative;overflow:hidden;padding:20px;border:1px solid #e9e4ef;border-radius:18px;background:#fff;box-shadow:0 8px 28px #32105a10}
    .pdp-card:after{content:'';position:absolute;right:-25px;top:-30px;width:90px;height:90px;border-radius:50%;background:#f47a1812}
    .pdp-label{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#766d82}
    .pdp-number{font-size:30px;font-weight:900;color:#32105a;margin-top:6px}
    .pdp-sub{font-size:12px;color:#8b8395;margin-top:4px}
    .pdp-quick{display:flex;flex-wrap:wrap;gap:9px;margin:0 0 22px}
    .pdp-quick button{border:1px solid #e4ddea;background:#fff;color:#32105a;border-radius:11px;padding:10px 13px;font-weight:800;cursor:pointer}
    .pdp-quick button:hover{border-color:#f47a18;color:#f47a18;transform:translateY(-1px)}
    .pdp-status{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:800;padding:5px 9px;border-radius:999px;background:#f1edf5;color:#4b2a6d}
    .pdp-dot{width:7px;height:7px;border-radius:50%;background:#31a56b}
    .pdp-hero{display:flex;align-items:center;justify-content:space-between;gap:18px;margin:0 0 18px;padding:20px 22px;border-radius:18px;background:linear-gradient(135deg,#32124f,#5f2688);color:#fff;box-shadow:0 15px 35px rgba(50,18,79,.18)}
    .pdp-hero h1{margin:0;font-size:24px;line-height:1.15;font-weight:900}
    .pdp-hero p{margin:7px 0 0;color:#eadff0;font-size:13px}
    .pdp-clock{font-variant-numeric:tabular-nums;text-align:right;font-size:22px;font-weight:900;white-space:nowrap}
    .pdp-clock small{display:block;font-size:11px;font-weight:700;opacity:.78;margin-top:3px}
    .pdp-breadcrumb{display:flex;align-items:center;gap:7px;margin:-4px 0 14px;font-size:12px;color:#7a7182}
    .pdp-breadcrumb strong{color:#32124f}
    .pdp-kbd{display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:22px;padding:0 6px;border:1px solid #ded6e6;border-bottom-width:2px;border-radius:6px;background:#fff;font:800 11px/1 Segoe UI,Arial;color:#5b5063}
    @media(max-width:1000px){.pdp-wrap{grid-template-columns:repeat(2,minmax(0,1fr))}.pdp-hero{align-items:flex-start}.pdp-clock{font-size:19px}}
    @media(max-width:560px){.pdp-wrap{grid-template-columns:1fr}.pdp-card{padding:17px}.pdp-number{font-size:27px}.pdp-hero{display:block;padding:18px}.pdp-clock{text-align:left;margin-top:12px}.pdp-breadcrumb{display:none}}
  `;
  document.head.appendChild(style);

  function findTarget(text){
    return $$('button,a,[role="button"]').find(el => (el.textContent||'').trim().toLowerCase() === text.toLowerCase());
  }

  function addHero(){
    if($('.pdp-hero')) return;
    const host = $('.main,.content,.main-content,main,.dashboard,.page') || document.body;
    if(!host) return;
    const h=document.createElement('section');
    h.className='pdp-hero';
    h.innerHTML='<div><h1>Central administrativa</h1><p>Gestão do Instituto Educacional Canoa Grande de Educação e Formação</p></div><div class="pdp-clock" aria-live="polite">--:--:--<small>Horário local</small></div>';
    host.prepend(h);
  }

  function updateClock(){
    const c=$('.pdp-clock'); if(!c) return;
    const now=new Date();
    const time=new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(now);
    c.firstChild.textContent=time;
  }

  function addBreadcrumb(){
    if($('.pdp-breadcrumb')) return;
    const host=$('.top,.topbar,.header'); if(!host) return;
    const h=$('h2',host);
    const b=document.createElement('div'); b.className='pdp-breadcrumb';
    b.innerHTML='<span>Portal administrativo</span><span>›</span><strong></strong><span class="pdp-kbd">Esc</span>';
    b.querySelector('strong').textContent=(h?.textContent||'Painel').trim();
    host.prepend(b);
  }

  function addQuickActions(){
    if($('.pdp-quick')) return;
    const host = $('.content,.main-content,main,.dashboard,.page') || document.body;
    if(!host) return;
    const box=document.createElement('div'); box.className='pdp-quick';
    const actions=[['+ Cadastrar aluno','cadastrar aluno'],['+ Nova matrícula','nova matrícula'],['+ Lançamento financeiro','lançamento financeiro'],['+ Funcionário','cadastrar funcionário']];
    actions.forEach(([label,target])=>{
      const b=document.createElement('button'); b.type='button'; b.textContent=label;
      b.addEventListener('click',()=>{const t=findTarget(target)||findTarget(label.replace(/^\+ /,'')); if(t)t.click(); else window.portalToast?.('A função ainda não está disponível nesta tela.','info')});
      box.appendChild(b);
    });
    host.insertBefore(box, host.children[1] || null);
  }

  function addStatus(){
    if($('.pdp-status')) return;
    const header=$('.topbar,header,.header'); if(!header) return;
    const s=document.createElement('span'); s.className='pdp-status'; s.innerHTML='<span class="pdp-dot"></span> Sistema operacional';
    header.appendChild(s);
  }

  function keyboard(){
    if(window.__pdpKeyboard) return;
    window.__pdpKeyboard=true;
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'){
        const close=$('.modal .close,.modal [aria-label="Fechar"],.modal button.close');
        if(close) close.click();
      }
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){
        e.preventDefault();
        const search=$('input[type="search"],.search input,input[placeholder*="Buscar" i],input[placeholder*="Pesquisar" i]');
        search?.focus();
      }
    });
  }

  function observe(){
    addHero(); addQuickActions(); addStatus(); addBreadcrumb(); updateClock(); keyboard();
    loadOnce('/portal-ui-v5.js?v=5');
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',observe); else observe();
  new MutationObserver(observe).observe(document.documentElement,{childList:true,subtree:true});
  setInterval(updateClock,1000);
})();
