(() => {
  'use strict';
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn, { once: true }) : fn();
  const project = location.pathname.startsWith('/Portal-Administrativo');
  const base = project ? '/Portal-Administrativo/' : '/';
  const asset = name => `${base}public/${name}`;
  const portalHref = project ? `${base}portal/` : '/portal';
  ready(() => {
    if (!document.querySelector('.hero') || !document.querySelector('.courses')) return;
    document.documentElement.classList.add('instituto-pro');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = asset('instituto-pro.css?v=3');
    document.head.appendChild(link);
    const nav = document.querySelector('.nav');
    if (nav && !document.querySelector('.iecg-access-strip')) {
      const strip = document.createElement('div');
      strip.className = 'iecg-access-strip';
      strip.innerHTML = `<div class="iecg-access-inner"><span><b>Instituto</b> · Site público para conhecer as formações</span><a href="${portalHref}" aria-label="Abrir Portal Administrativo">Acessar Portal Administrativo ↗</a></div>`;
      nav.insertAdjacentElement('afterend', strip);
    }
    const hero = document.querySelector('.hero .actions');
    if (hero && !hero.querySelector('[data-instituto-whatsapp]')) {
      const a = document.createElement('a');
      a.className = 'btn w';
      a.dataset.institutoWhatsapp = '1';
      a.href = 'https://wa.me/5544997239673?text=' + encodeURIComponent('Olá! Quero conhecer as formações do Instituto Educacional Canoa Grande de Educação e Formação.');
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Falar com o Instituto';
      hero.appendChild(a);
    }
    const courses = Array.from(document.querySelectorAll('.course-item'));
    if (courses.length && !document.querySelector('.iecg-course-tools-pro')) {
      const target = document.querySelector('.course-tools') || document.querySelector('.courses .container');
      if (target) {
        const tools = document.createElement('div');
        tools.className = 'iecg-course-tools-pro';
        tools.innerHTML = '<label class="iecg-course-search"><span>Pesquisar formação</span><input type="search" placeholder="Digite o nome de um curso..." aria-label="Pesquisar formação"></label><div class="iecg-course-count" aria-live="polite"></div>';
        target.insertAdjacentElement('afterend', tools);
        const input = tools.querySelector('input');
        const count = tools.querySelector('.iecg-course-count');
        const refresh = () => {
          const q = input.value.trim().toLocaleLowerCase('pt-BR');
          let visible = 0;
          courses.forEach(card => { const show = !q || card.textContent.toLocaleLowerCase('pt-BR').includes(q); card.hidden = !show; if (show) visible++; });
          count.textContent = `${visible} formação${visible === 1 ? '' : 'ões'} exibida${visible === 1 ? '' : 's'}`;
        };
        input.addEventListener('input', refresh);
        refresh();
      }
    }
    if (!document.querySelector('.iecg-floating-whatsapp')) {
      const wa = document.createElement('a');
      wa.className = 'iecg-floating-whatsapp';
      wa.href = 'https://wa.me/5544997239673?text=' + encodeURIComponent('Olá! Quero informações sobre os cursos do Instituto Educacional Canoa Grande de Educação e Formação.');
      wa.target = '_blank';
      wa.rel = 'noopener noreferrer';
      wa.setAttribute('aria-label', 'Falar com o Instituto pelo WhatsApp');
      wa.innerHTML = '<span class="dot"></span><span><b>Fale com o Instituto</b><small>WhatsApp · 44 99723-9673</small></span>';
      document.body.appendChild(wa);
    }
    document.querySelectorAll('.links a').forEach(a => { const text = (a.textContent || '').trim().toLocaleLowerCase('pt-BR'); if (text.includes('área de acesso') || text.includes('acesso')) a.setAttribute('href', portalHref); });
    const mobile = document.querySelector('.menu-toggle'), links = document.querySelector('.links');
    if (mobile && links && !mobile.dataset.proBound) {
      mobile.dataset.proBound = '1';
      mobile.addEventListener('click', () => { const open = mobile.classList.toggle('active'); links.classList.toggle('open', open); mobile.setAttribute('aria-expanded', String(open)); });
      links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { mobile.classList.remove('active'); links.classList.remove('open'); mobile.setAttribute('aria-expanded', 'false'); }));
    }
  });
})();
