(() => {
  'use strict';
  if (window.__IECG_HARDENING__) return;
  window.__IECG_HARDENING__ = true;

  const ready = (fn) => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();

  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  ready(() => {
    if (!document.querySelector('#app, .app, .portal, #login, #setup')) return;

    // Prevent repeated clicks while an action is being processed.
    document.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button || button.disabled) return;
      if (button.dataset.busy === '1') {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const label = (button.textContent || '').trim().toLowerCase();
      if (/^(salvar|entrar|criar|adicionar|nova|gerar|emitir|excluir|editar|concluir|enviar)/.test(label)) {
        button.dataset.busy = '1';
        button.dataset.originalText = button.textContent;
        window.setTimeout(() => {
          button.dataset.busy = '0';
          if (button.dataset.originalText) button.textContent = button.dataset.originalText;
        }, 1800);
      }
    }, true);

    // Mark the real current mode consistently in the interface.
    document.querySelectorAll('.live').forEach((el) => {
      el.textContent = '● Modo local';
      el.title = 'Esta versão ainda usa armazenamento local do navegador.';
    });

    // Improve empty states: make them informative rather than looking broken.
    document.querySelectorAll('.placeholder,.empty').forEach((el) => {
      const text = (el.textContent || '').trim();
      if (!text) {
        el.innerHTML = '<b>Nenhum registro encontrado</b><span>Quando houver dados cadastrados, eles aparecerão aqui.</span>';
      }
    });

    // Add a lightweight page status bar without claiming backend connectivity.
    if (!document.querySelector('.iecg-systembar')) {
      const bar = document.createElement('div');
      bar.className = 'iecg-systembar';
      bar.innerHTML = `<span class="sys-dot" aria-hidden="true"></span><strong>Portal Administrativo</strong><span>Operação local</span><span class="sys-sep">•</span><span>Instituto Educacional Canoa Grande</span>`;
      const main = document.querySelector('.main');
      if (main) main.prepend(bar);
    }

    // Basic navigation fallback: avoid dead nav buttons when section IDs exist.
    document.querySelectorAll('.nav button').forEach((button) => {
      if (button.dataset.hardeningBound) return;
      button.dataset.hardeningBound = '1';
      button.addEventListener('click', () => {
        const target = button.dataset.page || button.getAttribute('data-target');
        if (!target) return;
        const id = target.replace(/^#/, '');
        const section = document.getElementById(id);
        if (!section) return;
        document.querySelectorAll('.page').forEach((p) => p.classList.remove('active'));
        section.classList.add('active');
        document.querySelectorAll('.nav button').forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
      });
    });

    // Give dynamically created tables a clear visual empty state.
    document.querySelectorAll('tbody').forEach((tbody) => {
      if (tbody.dataset.emptyGuard) return;
      tbody.dataset.emptyGuard = '1';
      const observer = new MutationObserver(() => {
        if (tbody.children.length) return;
        const table = tbody.closest('table');
        if (!table || table.querySelector('.iecg-empty-row')) return;
        const cols = table.querySelectorAll('thead th').length || 1;
        const row = document.createElement('tr');
        row.className = 'iecg-empty-row';
        row.innerHTML = `<td colspan="${cols}" style="text-align:center;padding:26px;color:#8a7e91">Nenhum registro encontrado.</td>`;
        tbody.appendChild(row);
      });
      observer.observe(tbody, { childList: true });
    });

    // Warn before leaving with an open modal, preventing accidental loss of entered data.
    window.addEventListener('beforeunload', (event) => {
      const modal = document.querySelector('.modal.show');
      if (!modal) return;
      event.preventDefault();
      event.returnValue = '';
    });

    // Standardize tooltip/title text for icon-only sidebar controls.
    document.querySelectorAll('.nav button').forEach((button) => {
      if (button.title) return;
      const txt = (button.textContent || '').replace(/\s+/g, ' ').trim();
      if (txt) button.title = txt;
    });
  });
})();
