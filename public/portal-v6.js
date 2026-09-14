(() => {
  'use strict';
  const ready=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
  ready(()=>{
    const portal=!!document.querySelector('.portal,.sidebar,.main');
    if(!portal) return;
    const root=document.body; root.classList.add('portal-v6');
    if(document.querySelector('.v6-float')) return;

    const style=document.createElement('style');
    style.textContent=`
      .portal-v6{--v6-purple:#35115a;--v6-purple2:#5d2385;--v6-orange:#f97316;--v6-orange2:#ffad63;--v6-bg:#f6f5f8}
      .portal-v6 .v6-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin:0 0 18px;padding:18px 20px;border-radius:20px;background:linear-gradient(135deg,#35115a,#5d2385);color:#fff;box-shadow:0 16px 35px rgba(53,17,90,.18)}
      .portal-v6 .v6-head-title{font-size:20px;font-weight:900;letter-spacing:-.02em}.portal-v6 .v6-head-sub{font-size:12px;opacity:.8;margin-top:4px}
      .portal-v6 .v6-clock{font-weight:900;font-size:14px;white-space:nowrap;padding:9px 12px;border-radius:12px;background:rgba(255,255,255,.12)}
      .portal-v6 .v6-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:20px}
      .portal-v6 .v6-tile{display:flex;align-items:center;gap:12px;padding:15px;border:1px solid #e6e0eb;border-radius:16px;background:#fff;box-shadow:0 7px 20px rgba(35,15,50,.05);cursor:pointer;text-align:left;transition:.18s}
      .portal-v6 .v6-tile:hover{transform:translateY(-2px);border-color:#f3c5a1;box-shadow:0 14px 28px rgba(35,15,50,.09)}
      .portal-v6 .v6-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:12px;background:#f3edf7;color:var(--v6-purple);font-size:20px;font-weight:900}.portal-v6 .v6-tile b{display:block;color:#2e2435;font-size:13px}.portal-v6 .v6-tile span{display:block;color:#887d90;font-size:11px;margin-top:3px}
      .portal-v6 .v6-float{position:fixed;right:18px;bottom:18px;z-index:9999}.portal-v6 .v6-float button{border:0;border-radius:14px;padding:12px 15px;background:linear-gradient(135deg,var(--v6-orange),var(--v6-orange2));color:#fff;font-weight:900;box-shadow:0 13px 30px rgba(249,115,22,.28);cursor:pointer}
      .portal-v6 .v6-panel{margin-top:10px;padding:16px;border:1px solid #e5dfeb;border-radius:16px;background:#fff}.portal-v6 .v6-panel h4{margin:0 0 8px;color:var(--v6-purple);font-size:14px}.portal-v6 .v6-panel p{margin:0;color:#7b7182;font-size:12px;line-height:1.6}
      .portal-v6 .v6-status{display:inline-flex;align-items:center;gap:7px;padding:7px 10px;border-radius:999px;background:#f2edf5;color:var(--v6-purple);font-size:11px;font-weight:900}.portal-v6 .v6-dot{width:8px;height:8px;border-radius:50%;background:#2da66f;box-shadow:0 0 0 4px rgba(45,166,111,.12)}
      @media(max-width:900px){.portal-v6 .v6-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.portal-v6 .v6-head{align-items:flex-start;flex-direction:column}}
      @media(max-width:560px){.portal-v6 .v6-grid{grid-template-columns:1fr}.portal-v6 .v6-head-title{font-size:17px}.portal-v6 .v6-clock{font-size:12px}.portal-v6 .v6-float{right:12px;bottom:12px}}
    `;
    document.head.appendChild(style);

    const main=document.querySelector('.main');
    if(!main) return;
    const head=document.createElement('section'); head.className='v6-head';
    const title=document.createElement('div'); title.innerHTML='<div class="v6-head-title">Portal Administrativo</div><div class="v6-head-sub">Instituto Educacional Canoa Grande de Educação e Formação</div>';
    const clock=document.createElement('div'); clock.className='v6-clock';
    const tick=()=>{const d=new Date();clock.textContent=d.toLocaleDateString('pt-BR')+' · '+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});}; tick(); setInterval(tick,1000);
    head.append(title,clock);
    const top=main.querySelector('.top'); if(top) top.insertAdjacentElement('afterend',head); else main.prepend(head);

    const grid=document.createElement('section'); grid.className='v6-grid';
    const actions=[['👤','Alunos','Cadastrar e localizar alunos','aluno'],['▣','Matrículas','Gerenciar matrículas','matrícula'],['R$','Financeiro','Lançamentos e acompanhamento','financeiro'],['👥','Funcionários','Equipe e documentação','funcionário']];
    const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const clickExisting=needle=>{const n=norm(needle);const el=[...document.querySelectorAll('button,a')].find(x=>norm((x.textContent||'').trim()).includes(n)&&!x.closest('.v6-grid'));if(el){el.click();return true}return false};
    actions.forEach(([icon,name,desc,needle])=>{const b=document.createElement('button');b.className='v6-tile';b.type='button';b.innerHTML='<span class="v6-icon">'+icon+'</span><span><b>'+name+'</b><span>'+desc+'</span></span>';b.addEventListener('click',()=>{if(!clickExisting(needle)) window.iecgToast?.('A área de '+name+' está pronta para receber a integração com o banco de dados.','Portal');});grid.appendChild(b)});
    head.insertAdjacentElement('afterend',grid);

    const status=document.createElement('div');status.className='v6-status';status.innerHTML='<span class="v6-dot"></span> Portal preparado · interface V6 ativa';
    main.appendChild(status);

    const float=document.createElement('div');float.className='v6-float';
    const btn=document.createElement('button');btn.type='button';btn.textContent='⌘ Ações rápidas';
    btn.addEventListener('click',()=>document.querySelector('.v6-grid')?.scrollIntoView({behavior:'smooth',block:'center'}));
    float.appendChild(btn);document.body.appendChild(float);
  });
})();
