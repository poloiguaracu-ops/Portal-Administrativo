(() => {
  'use strict';
  const root = document.documentElement;
  root.classList.add('portal-pro');

  const css = document.createElement('style');
  css.textContent = `
    :root.portal-pro{--pp-orange:#f47a18;--pp-purple:#32105a;--pp-ink:#1d1730;--pp-muted:#716a7d;--pp-bg:#f5f3f8;--pp-card:#fff}
    .portal-pro body{background:var(--pp-bg)!important;color:var(--pp-ink)}
    .portal-pro button,.portal-pro a,.portal-pro input,.portal-pro select,.portal-pro textarea{transition:all .18s ease}
    .portal-pro button:focus-visible,.portal-pro a:focus-visible,.portal-pro input:focus-visible,.portal-pro select:focus-visible,.portal-pro textarea:focus-visible{outline:3px solid #f47a1880;outline-offset:2px}
    .portal-pro .card,.portal-pro .panel,.portal-pro .box,.portal-pro .stat,.portal-pro .table-wrap{border:1px solid #e9e4ef!important;box-shadow:0 8px 30px #32105a12!important;border-radius:18px!important}
    .portal-pro .stat:hover,.portal-pro .card:hover{transform:translateY(-2px);box-shadow:0 14px 36px #32105a18!important}
    .portal-pro table{border-collapse:separate!important;border-spacing:0!important;overflow:hidden;border-radius:14px}
    .portal-pro th{background:#f0edf5!important;color:#4b4058!important;font-size:12px;text-transform:uppercase;letter-spacing:.04em}
    .portal-pro td,.portal-pro th{padding:13px 14px!important;border-bottom:1px solid #eeeaf2!important}
    .portal-pro input,.portal-pro select,.portal-pro textarea{border:1px solid #ddd7e7!important;background:#fff!important;border-radius:11px!important;padding:11px 12px!important}
    .portal-pro input:focus,.portal-pro select:focus,.portal-pro textarea:focus{border-color:var(--pp-orange)!important;box-shadow:0 0 0 4px #f47a1820!important}
    .portal-pro button[type=submit],.portal-pro .primary,.portal-pro .btn-primary{background:linear-gradient(135deg,var(--pp-orange),#ff9c46)!important;color:#fff!important;border:0!important;border-radius:11px!important;font-weight:800!important;box-shadow:0 8px 20px #f47a1830!important}
    .portal-pro button[type=submit]:hover,.portal-pro .primary:hover,.portal-pro .btn-primary:hover{transform:translateY(-1px);filter:saturate(1.08)}
    .portal-pro .sidebar,.portal-pro aside{box-shadow:8px 0 30px #32105a14!important}
    .portal-pro .empty-state{padding:40px 20px!important;text-align:center;color:var(--pp-muted)}
    .portal-pro .badge{display:inline-flex;align-items:center;gap:5px;padding:5px 9px;border-radius:999px;font-size:11px;font-weight:800;background:#eee9f5;color:#4a2a70}
    .portal-pro .topbar,.portal-pro header{backdrop-filter:blur(12px)}
    @media(max-width:760px){.portal-pro .card,.portal-pro .panel,.portal-pro .box,.portal-pro .stat{border-radius:15px!important}.portal-pro table{font-size:13px}.portal-pro td,.portal-pro th{padding:10px!important}}
  `;
  document.head.appendChild(css);

  const toast = (message, type='info') => {
    let el = document.querySelector('.portal-pro-toast');
    if (!el) { el=document.createElement('div'); el.className='portal-pro-toast'; document.body.appendChild(el); }
    el.textContent=message;
    el.dataset.type=type;
    Object.assign(el.style,{position:'fixed',right:'20px',bottom:'20px',zIndex:'99999',padding:'13px 16px',borderRadius:'12px',background:'#211530',color:'#fff',fontWeight:'700',fontSize:'14px',boxShadow:'0 12px 30px #0003',maxWidth:'360px'});
    clearTimeout(el._timer); el._timer=setTimeout(()=>el.remove(),3200);
  };
  window.portalToast = toast;

  // Impede links vazios de recarregarem a aplicação.
  document.addEventListener('click', e => {
    const a=e.target.closest('a[href="#"]');
    if(a){e.preventDefault();}
  });

  // Marca botões que realmente estão processando uma ação.
  document.addEventListener('submit', e => {
    const btn=e.target.querySelector('button[type="submit"]');
    if(btn && !btn.dataset.busy){btn.dataset.busy='1';btn.dataset.originalText=btn.textContent;btn.textContent='Processando…';setTimeout(()=>{btn.dataset.busy='';btn.textContent=btn.dataset.originalText||'Salvar'},2500)}
  }, true);

  // Se o painel ainda estiver sem conteúdo, evita uma tela visualmente quebrada.
  const observer=new MutationObserver(()=>{
    document.querySelectorAll('.portal-pro-toast').forEach(x=>{if(!x.textContent.trim())x.remove()});
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();
