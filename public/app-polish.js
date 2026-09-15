(() => {
  'use strict';
  if (window.__IECG_APP_POLISH__) return;
  window.__IECG_APP_POLISH__ = true;

  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  const base = location.pathname.startsWith('/Portal-Administrativo') ? '/Portal-Administrativo/public/' : '/public/';
  const asset = (name) => new URL(base + name, location.origin).href;

  const addScriptOnce = (src, key) => {
    if (document.querySelector(`script[data-iecg="${key}"]`)) return;
    const s = document.createElement('script');
    s.src = asset(src);
    s.defer = true;
    s.dataset.iecg = key;
    document.body.appendChild(s);
  };

  const setText = (selector, text) => {
    document.querySelectorAll(selector).forEach((el) => { el.textContent = text; });
  };

  ready(() => {
    const isPortal = !!document.querySelector('#app, .portal, .sidebar, .auth-card');
    const isInstituto = !!document.querySelector('.hero, .courses, .signup');
    document.documentElement.classList.add('iecg-ready');

    if (isPortal) {
      if (!document.querySelector('link[data-iecg="portal-visual"]')) {
        const visual = document.createElement('link');
        visual.rel = 'stylesheet';
        visual.href = asset('portal-visual-v4.css?v=5');
        visual.dataset.iecg = 'portal-visual';
        document.head.appendChild(visual);
      }
      addScriptOnce('portal-ui-v5.js?v=6', 'portal-ui');
      addScriptOnce('portal-v6.js?v=7', 'portal-v6');
      addScriptOnce('portal-pro.js?v=2', 'portal-pro');
      addScriptOnce('portal-super-polish.css?v=1', 'portal-super-polish');

      // Corrige textos que poderiam sugerir uma conexão com D1 que ainda não existe.
      setText('.live', '● Modo local de demonstração');
      setText('.pill', 'ACESSO AO PORTAL');
      document.querySelectorAll('.hint').forEach((el) => {
        if ((el.textContent || '').toLowerCase().includes('perf') && (el.textContent || '').toLowerCase().includes('suport')) {
          el.textContent = 'Perfis disponíveis: Administrador, Professor e Aluno.';
        }
      });

      // Evita modal preso por erro de clique e permite fechar com Esc ou clique no fundo.
      const closeModals = () => {
        document.querySelectorAll('.modal.show').forEach((modal) => {
          modal.classList.remove('show');
          modal.setAttribute('aria-hidden', 'true');
        });
        document.body.classList.remove('lock');
      };
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModals();
      }, { passive: true });
      document.querySelectorAll('.modal').forEach((modal) => {
        modal.setAttribute('aria-hidden', modal.classList.contains('show') ? 'false' : 'true');
        modal.addEventListener('click', (event) => {
          if (event.target === modal) closeModals();
        });
      });

      // Impede submits acidentais em formulários sem ação definida.
      document.querySelectorAll('form').forEach((form) => {
        form.addEventListener('submit', (event) => {
          const action = (form.getAttribute('action') || '').trim();
          if (!action && !form.querySelector('button[type="submit"][data-allow-submit]')) {
            event.preventDefault();
          }
        }, { capture: true });
      });

      // Cria uma pequena faixa de estado, sem fingir que há sincronização em nuvem.
      if (!document.querySelector('.iecg-mode-note')) {
        const note = document.createElement('div');
        note.className = 'iecg-mode-note';
        note.setAttribute('role', 'status');
        note.textContent = 'Dados desta versão ficam neste navegador. A sincronização com D1 será adicionada no backend.';
        const main = document.querySelector('.main');
        if (main) main.prepend(note);
      }
    }

    if (isInstituto) {
      addScriptOnce('instituto-pro.js?v=3', 'instituto-pro');
      if (!document.querySelector('link[data-iecg="instituto-final"]')) {
        const style = document.createElement('style');
        style.dataset.iecg = 'instituto-final';
        style.textContent = `
          .iecg-mode-note{margin:0 0 14px;padding:10px 12px;border:1px solid #eadcf0;border-radius:12px;background:#fbf7fd;color:#6b5874;font:700 11px/1.4 Inter,Segoe UI,Arial,sans-serif}
          .iecg-mode-note:before{content:'ℹ ';color:#f56a13}
          @media(max-width:760px){.iecg-mode-note{font-size:10px}}
        `;
        document.head.appendChild(style);
      }
      document.querySelectorAll('.chip,.tag,.count').forEach((el) => {
        if (el.textContent.includes('44 formações')) el.textContent = el.textContent.replace('44 formações', '45 formações');
      });
    }

    const style = document.createElement('style');
    style.dataset.iecg = 'global-final';
    style.textContent = `
      :focus-visible{outline:3px solid rgba(255,116,0,.42)!important;outline-offset:2px}
      .iecg-mode-note{box-shadow:0 5px 18px rgba(44,15,58,.04)}
      button:disabled{cursor:not-allowed!important;opacity:.65}
      @keyframes iecgIn{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}
      @media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
    `;
    document.head.appendChild(style);

    window.iecgToast = (message, title = 'Instituto Canoa Grande') => {
      document.querySelectorAll('.iecg-toast').forEach((x) => x.remove());
      const t = document.createElement('div');
      t.className = 'iecg-toast';
      const s = document.createElement('strong'); s.textContent = title;
      const p = document.createElement('span'); p.textContent = message;
      t.append(s, p);
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 4200);
    };

    document.querySelectorAll('a[href="#"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    document.querySelectorAll('a[href*="wa.me/5544997239673"]').forEach((a) => {
      if (!a.href.includes('text=')) {
        a.href = 'https://wa.me/5544997239673?text=' + encodeURIComponent('Olá! Gostaria de saber mais sobre o Instituto Educacional Canoa Grande de Educação e Formação.');
      }
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    });
  });
})();
