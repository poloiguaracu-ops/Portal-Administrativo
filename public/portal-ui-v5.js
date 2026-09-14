(() => {
  'use strict';
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();
  ready(() => {
    const root = document.body;
    if (!root) return;
    root.classList.add('portal-ui-v5');
    const style = document.createElement('style');
    style.textContent = `
      .portal-ui-v5 .v5-toolbar{display:flex;align-items:center;gap:10px;margin:0 0 18px;padding:10px 12px;border:1px solid #e7e2eb;border-radius:16px;background:rgba(255,255,255,.82);box-shadow:0 6px 22px rgba(37,17,51,.04);backdrop-filter:blur(8px)}
      .portal-ui-v5 .v5-search{flex:1;min-width:180px;border:1px solid #ddd6e4;border-radius:11px;padding:11px 13px;background:#fff;color:#2b2033;outline:0}
      .portal-ui-v5 .v5-search:focus{border-color:#f97316;box-shadow:0 0 0 4px rgba(249,115,22,.1)}
      .portal-ui-v5 .v5-chip{display:inline-flex;align-items:center;gap:7px;padding:8px 10px;border-radius:999px;background:#f3edf7;color:#4f1d78;font-size:12px;font-weight:900;white-space:nowrap}
      .portal-ui-v5 .v5-dot{width:8px;height:8px;border-radius:50%;background:#21a366;box-shadow:0 0 0 4px rgba(33,163,102,.12)}
      .portal-ui-v5 .v5-quick{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:0 0 20px}
      .portal-ui-v5 .v5-quick button{min-height:72px;border:1px solid #e8e0ee;border-radius:16px;background:#fff;text-align:left;padding:13px 14px;cursor:pointer;box-shadow:0 6px 20px rgba(37,17,51,.04);transition:.18s}
      .portal-ui-v5 .v5-quick button:hover{transform:translateY(-2px);border-color:#f0c19f;box-shadow:0 12px 28px rgba(37,17,51,.09)}
      .portal-ui-v5 .v5-quick b{display:block;color:#2f2138;font-size:13px}.portal-ui-v5 .v5-quick span{display:block;color:#8a7e91;font-size:11px;margin-top:4px}
      .portal-ui-v5 .v5-empty{display:flex;align-items:center;justify-content:center;min-height:180px;border:1px dashed #d7cddb;border-radius:16px;background:linear-gradient(180deg,#fff,#fbf9fc);padding:20px;text-align:center;color:#776b80}
      .portal-ui-v5 .v5-empty strong{display:block;color:#4f1d78;font-size:18px;margin-bottom:6px}
      .portal-ui-v5 .v5-mobile-toggle{display:none}
      @media(max-width:900px){.portal-ui-v5 .v5-quick{grid-template-columns:repeat(2,minmax(0,1fr))}.portal-ui-v5 .v5-toolbar{flex-wrap:wrap}}
      @media(max-width:560px){.portal-ui-v5 .v5-quick{grid-template-columns:1fr}.portal-ui-v5 .v5-chip{display:none}.portal-ui-v5 .v5-search{min-width:0}.portal-ui-v5 .top{gap:8px}.portal-ui-v5 .v5-mobile-toggle{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;border:1px solid #ddd6e4;border-radius:11px;background:#fff;color:#4f1d78;font-size:19px;cursor:pointer}}
    `;
    document.head.appendChild(style);

    const isPortal = !!document.querySelector('.portal, .sidebar, .main');
    if (!isPortal) return;

    const top = document.querySelector('.top');
    if (top && !top.querySelector('.v5-mobile-toggle')) {
      const btn = document.createElement('button'); btn.className='v5-mobile-toggle'; btn.type='button'; btn.setAttribute('aria-label','Abrir menu'); btn.textContent='☰';
      btn.addEventListener('click',()=>document.body.classList.toggle('v5-sidebar-open'));
      top.prepend(btn);
    }
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.addEventListener('click',e=>{if(e.target.closest('button')) document.body.classList.remove('v5-sidebar-open')});
    const mobileStyle=document.createElement('style'); mobileStyle.textContent='@media(max-width:700px){body.v5-sidebar-open .sidebar{transform:translateX(0)!important;box-shadow:18px 0 45px rgba(20,5,30,.28)!important}body.v5-sidebar-open:after{content:"";position:fixed;inset:0;background:rgba(20,5,30,.35);z-index:20}body.v5-sidebar-open .sidebar{z-index:21}.sidebar{transform:translateX(-100%);transition:transform .22s ease}}'; document.head.appendChild(mobileStyle);

    const main = document.querySelector('.main');
    if (main && !main.querySelector('.v5-toolbar')) {
      const bar=document.createElement('div'); bar.className='v5-toolbar';
      const search=document.createElement('input'); search.className='v5-search'; search.type='search'; search.placeholder='Pesquisar no módulo atual…'; search.setAttribute('aria-label','Pesquisar no módulo atual');
      const chip=document.createElement('div'); chip.className='v5-chip'; chip.innerHTML='<i class="v5-dot"></i><span>Sistema operacional</span>';
      bar.append(search,chip);
      const topEl=main.querySelector('.top'); if(topEl) topEl.insertAdjacentElement('afterend',bar); else main.prepend(bar);
      search.addEventListener('input',()=>{
        const q=search.value.trim().toLowerCase();
        main.querySelectorAll('.panel table tbody tr,.module,.card').forEach(el=>{
          if(!q){el.hidden=false;return;} el.hidden=!el.textContent.toLowerCase().includes(q);
        });
      });
    }

    const quickTexts=[
      ['Cadastrar aluno','Novo cadastro','cadastrar aluno'],
      ['Nova matrícula','Criar matrícula','nova matrícula'],
      ['Lançamento financeiro','Registrar movimento','lançamento financeiro'],
      ['Novo funcionário','Adicionar equipe','funcionário']
    ];
    if(main && !main.querySelector('.v5-quick')){
      const q=document.createElement('div'); q.className='v5-quick';
      quickTexts.forEach(([title,sub,needle])=>{
        const b=document.createElement('button'); b.type='button'; b.innerHTML='<b>＋ '+title+'</b><span>'+sub+'</span>';
        b.addEventListener('click',()=>{
          const all=[...document.querySelectorAll('button,a')]; const target=all.find(x=>x.textContent.trim().toLowerCase().includes(needle));
          if(target && target!==b){target.click();return;}
          if(window.iecgToast) window.iecgToast('A tela de "'+title+'" será conectada ao banco de dados nesta etapa.');
        }); q.appendChild(b);
      });
      const bar=main.querySelector('.v5-toolbar'); if(bar) bar.insertAdjacentElement('afterend',q); else main.prepend(q);
    }

    // Melhora mensagens de estado vazias sem apagar conteúdo existente.
    main.querySelectorAll('.placeholder').forEach(el=>{
      const text=el.textContent.trim();
      if(text && !el.querySelector('.v5-empty')){
        const wrap=document.createElement('div'); wrap.className='v5-empty';
        wrap.innerHTML='<div><strong>Área pronta para uso</strong><span>'+text.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</span></div>';
        el.replaceChildren(wrap);
      }
    });
  });
})();
