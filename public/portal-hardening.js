(() => {
  'use strict';
  if (window.__IECG_HARDENING_V2__) return;
  window.__IECG_HARDENING_V2__ = true;
  const ready = fn => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();
  ready(() => {
    if (!document.querySelector('#app,.portal,.sidebar,.auth-card')) return;

    const style = document.createElement('style');
    style.textContent = `
      .iecg-systembar{display:flex;align-items:center;gap:9px;flex-wrap:wrap;margin:0 0 14px;padding:9px 12px;border:1px solid #e8deee;border-radius:12px;background:linear-gradient(180deg,#fff,#fbf8fd);color:#6f6176;font:700 11px/1.35 Inter,Segoe UI,Arial,sans-serif}.iecg-systembar strong{color:#4d176e}.iecg-systembar .sys-dot{width:8px;height:8px;border-radius:50%;background:#f56a13;box-shadow:0 0 0 4px rgba(245,106,19,.1)}
      .iecg-saving{opacity:.78!important;pointer-events:none!important}
      .iecg-data-ok{border-color:#cfead6!important;background:#effaf2!important;color:#176b38!important}
      .iecg-data-warn{border-color:#f0d7a4!important;background:#fff8e8!important;color:#845d0c!important}
      .iecg-kbd{display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:22px;padding:0 6px;border:1px solid #ddd4e5;border-bottom-width:2px;border-radius:6px;background:#fff;font:800 10px/1 Segoe UI,Arial,sans-serif;color:#665a6d}
      @media(max-width:700px){.iecg-systembar{font-size:10px}.iecg-systembar span:last-child{width:100%}}
    `;
    document.head.appendChild(style);

    if (!document.querySelector('.iecg-systembar')) {
      const main = document.querySelector('.main');
      if (main) {
        const bar=document.createElement('div'); bar.className='iecg-systembar';
        bar.innerHTML='<span class="sys-dot" aria-hidden="true"></span><strong>Portal Administrativo</strong><span>Controle operacional</span><span>•</span><span>Instituto Educacional Canoa Grande</span><span class="iecg-kbd">Ctrl K</span>';
        main.prepend(bar);
      }
    }

    document.addEventListener('click', event => {
      const btn = event.target.closest('button,a');
      if (!btn) return;
      if (btn.matches('.close,[data-close],button[aria-label*="Fechar" i]')) return;
      if (btn.closest('.modal') && btn.type === 'button') return;
      const text=(btn.textContent||'').trim().toLocaleLowerCase('pt-BR');
      const action=/^(salvar|entrar|criar|adicionar|cadastrar|nova|gerar|emitir|excluir|editar|concluir|enviar|ativar|desativar)/.test(text);
      if(!action || btn.dataset.saving==='1') return;
      btn.dataset.saving='1'; btn.classList.add('iecg-saving');
      setTimeout(()=>{btn.dataset.saving='0';btn.classList.remove('iecg-saving');},1400);
    }, false);

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape') return;
      const modal=document.querySelector('.modal.show,.modal[open],dialog[open]');
      if(modal){
        if(typeof window.fecharModal==='function') window.fecharModal();
        else if(typeof window.fecharUsuario==='function' && modal.id==='userModal') window.fecharUsuario();
        else modal.classList.remove('show');
      }
    });

    document.addEventListener('click', event => {
      const modal=event.target.closest('.modal.show');
      if(modal && event.target===modal) {
        if(typeof window.fecharModal==='function') window.fecharModal(); else modal.classList.remove('show');
      }
    });

    document.querySelectorAll('.nav button').forEach(button=>{
      if(button.title) return;
      const label=(button.textContent||'').replace(/\s+/g,' ').trim(); if(label) button.title=label;
    });

    const markStatus = () => {
      document.querySelectorAll('.live').forEach(el=>{
        if(document.documentElement.classList.contains('iecg-d1-ready')) {
          el.textContent='● Banco D1 conectado'; el.classList.add('iecg-data-ok'); el.classList.remove('iecg-data-warn');
        } else {
          el.textContent='● Verificando banco'; el.classList.add('iecg-data-warn'); el.classList.remove('iecg-data-ok');
        }
      });
    };
    markStatus();
    new MutationObserver(markStatus).observe(document.documentElement,{attributes:true,attributeFilter:['class']});

    document.addEventListener('submit', event => {
      const form=event.target;
      const submit=form.querySelector('button[type="submit"],input[type="submit"]');
      if(!submit || submit.dataset.submitGuard==='1') return;
      submit.dataset.submitGuard='1'; submit.classList.add('iecg-saving');
      if(submit.tagName==='BUTTON'){
        submit.dataset.originalText=submit.textContent; submit.textContent='Processando…';
      }
      setTimeout(()=>{submit.dataset.submitGuard='0';submit.classList.remove('iecg-saving');if(submit.tagName==='BUTTON'&&submit.dataset.originalText)submit.textContent=submit.dataset.originalText;},2500);
    },false);
  });
})();
