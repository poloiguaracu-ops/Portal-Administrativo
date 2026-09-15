(() => {
  'use strict';
  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  ready(() => {
    if (!document.querySelector('.app, .portal, #login, #setup')) return;

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
