(() => {
  'use strict';
  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  ready(() => {
    if (!document.querySelector('.app, .portal, #login, #setup')) return;

    const style = document.createElement('style');
    style.textContent = `
      .iecg-local-mode{display:flex;align-items:center;gap:8px;margin:0 0 16px;padding:10px 13px;border:1px solid #eadcf0;border-radius:13px;background:linear-gradient(180deg,#fff,#fbf8fd);color:#66546f;font:700 11px/1.4 Inter,Segoe UI,Arial,sans-serif;box-shadow:0 5px 18px rgba(44,15,58,.04)}
      .iecg-local-mode span:first-child{color:#b45309;font-size:10px}.iecg-local-mode b{color:#4d176e}.iecg-quality-toast{position:fixed;right:18px;bottom:18px;z-index:99999;max-width:min(420px,calc(100vw - 36px));padding:13px 15px;border-radius:13px;background:#24152d;color:#fff;box-shadow:0 18px 45px rgba(0,0,0,.24);font:600 12px/1.45 Inter,Segoe UI,Arial,sans-serif}
      @media(max-width:760px){.iecg-local-mode{align-items:flex-start;flex-wrap:wrap;font-size:10px}}
    `;
    document.head.appendChild(style);

    const toast = (message, kind = 'info') => {
      if (typeof window.iecgToast === 'function') {
        window.iecgToast(message, kind === 'error' ? 'Atenção' : kind === 'ok' ? 'Tudo certo' : 'Portal Administrativo');
        return;
      }
      document.querySelectorAll('.iecg-quality-toast').forEach((el) => el.remove());
      const el = document.createElement('div');
      el.className = 'iecg-quality-toast';
      el.setAttribute('role', 'status');
      el.textContent = message;
      document.body.appendChild(el);
      window.setTimeout(() => el.remove(), 4000);
    };

    const normalizeCpf = (value) => value.replace(/\D/g, '').slice(0, 11);
    const maskCpf = (value) => {
      const v = normalizeCpf(value);
      return v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };
    const maskPhone = (value) => {
      const v = value.replace(/\D/g, '').slice(0, 11);
      if (v.length <= 2) return v.length ? `(${v}` : '';
      if (v.length <= 7) return `(${v.slice(0,2)}) ${v.slice(2)}`;
      if (v.length <= 10) return `(${v.slice(0,2)}) ${v.slice(2,6)}-${v.slice(6)}`;
      return `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    };

    document.querySelectorAll('input').forEach((input) => {
      const label = (input.previousElementSibling?.textContent || '').toLocaleLowerCase('pt-BR');
      const placeholder = (input.getAttribute('placeholder') || '').toLocaleLowerCase('pt-BR');
      const hint = `${label} ${placeholder}`;
      if (hint.includes('cpf')) {
        input.setAttribute('inputmode', 'numeric');
        input.maxLength = 14;
        input.addEventListener('input', () => { input.value = maskCpf(input.value); });
      } else if (hint.includes('telefone') || hint.includes('celular') || hint.includes('whatsapp')) {
        input.setAttribute('inputmode', 'tel');
        input.maxLength = 15;
        input.addEventListener('input', () => { input.value = maskPhone(input.value); });
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      document.querySelectorAll('.modal.show, .modal[open], dialog[open]').forEach((modal) => {
        if (typeof window.fecharModal === 'function') window.fecharModal();
        else if (typeof window.fecharUsuario === 'function' && modal.id === 'userModal') window.fecharUsuario();
        else modal.classList.remove('show');
      });
      document.querySelectorAll('.links.open').forEach((links) => {
        links.classList.remove('open');
        const menu = document.querySelector('#menu, .menu-toggle');
        menu?.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (event) => {
      const modal = event.target.closest('.modal.show');
      if (modal && event.target === modal) {
        if (typeof window.fecharModal === 'function') window.fecharModal();
        else if (typeof window.fecharUsuario === 'function' && modal.id === 'userModal') window.fecharUsuario();
        else modal.classList.remove('show');
      }
    });

    document.querySelectorAll('form').forEach((form) => {
      form.addEventListener('submit', () => {
        const submit = form.querySelector('button[type="submit"], input[type="submit"]');
        if (!submit || submit.dataset.qualityGuard === '1') return;
        submit.dataset.qualityGuard = '1';
        const original = submit.textContent;
        submit.dataset.originalText = original;
        submit.disabled = true;
        if (submit.tagName === 'BUTTON') submit.textContent = 'Processando…';
        window.setTimeout(() => {
          submit.disabled = false;
          submit.dataset.qualityGuard = '0';
          if (submit.tagName === 'BUTTON' && submit.dataset.originalText) submit.textContent = submit.dataset.originalText;
        }, 2500);
      });
    });

    document.querySelectorAll('button').forEach((button) => {
      if (!button.getAttribute('type') && button.closest('form')) button.type = 'button';
    });

    const app = document.querySelector('#app, .app, .portal');
    if (app && !document.querySelector('.iecg-local-mode')) {
      const local = document.createElement('div');
      local.className = 'iecg-local-mode';
      local.innerHTML = '<span aria-hidden="true">●</span><b>Modo local</b><span>Os dados ainda estão armazenados neste navegador.</span>';
      app.prepend(local);
    }

    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        return await originalFetch(...args);
      } catch (error) {
        toast('Não foi possível concluir a comunicação com o servidor.', 'error');
        throw error;
      }
    };
  });
})();
