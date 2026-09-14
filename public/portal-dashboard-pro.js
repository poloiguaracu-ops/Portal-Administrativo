(() => {
  'use strict';
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

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
    @media(max-width:1000px){.pdp-wrap{grid-template-columns:repeat(2,minmax(0,1fr))}}
    @media(max-width:560px){.pdp-wrap{grid-template-columns:1fr}.pdp-card{padding:17px}.pdp-number{font-size:27px}}
  `;
  document.head.appendChild(style);

  function findTarget(text){
    return $$('button,a,[role="button"]').find(el => (el.textContent||'').trim().toLowerCase() === text.toLowerCase());
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
    host.prepend(box);
  }

  function addStatus(){
    if($('.pdp-status')) return;
    const header=$('.topbar,header,.header');
    if(!header) return;
    const s=document.createElement('span'); s.className='pdp-status'; s.innerHTML='<span class="pdp-dot"></span> Sistema operacional';
    header.appendChild(s);
  }

  function observe(){
    addQuickActions(); addStatus();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',observe); else observe();
  new MutationObserver(observe).observe(document.documentElement,{childList:true,subtree:true});
})();
