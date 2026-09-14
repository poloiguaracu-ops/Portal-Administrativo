(() => {
  'use strict';
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn, { once:true }) : fn();
  ready(() => {
    if (!document.querySelector('.portal, .sidebar, .main')) return;
    document.documentElement.classList.add('portal-pro');
    const css = document.createElement('link'); css.rel='stylesheet'; css.href='/portal-pro.css?v=1'; document.head.appendChild(css);

    const main = document.querySelector('.main');
    if (main && !document.querySelector('.portal-pro-identity')) {
      const bar = document.createElement('div');
      bar.className='portal-pro-identity';
      bar.innerHTML='<div><strong>Portal Administrativo</strong><span>Gestão acadêmica, financeira, equipe e atendimento</span></div><div class="portal-pro-url"><b>Ambiente:</b> /portal</div>';
      const top = main.querySelector('.top');
      if (top) top.insertAdjacentElement('beforebegin', bar); else main.prepend(bar);
    }

    if (main && !document.querySelector('.portal-pro-footer')) {
      const footer=document.createElement('div'); footer.className='portal-pro-footer';
      footer.innerHTML='<b>Portal Administrativo</b> · Instituto Educacional Canoa Grande de Educação e Formação';
      main.appendChild(footer);
    }
  });
})();
