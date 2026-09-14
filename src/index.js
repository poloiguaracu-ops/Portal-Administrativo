export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') {
      try {
        const result = await env.DB.prepare(
          "SELECT name FROM sqlite_master WHERE type = ? AND name NOT LIKE 'sqlite_%' ORDER BY name"
        ).bind('table').all();
        return Response.json({
          ok: true,
          database: 'connected',
          tables: result.results.map((r) => r.name),
        });
      } catch (error) {
        return Response.json({ ok: false, error: String(error?.message || error) }, { status: 500 });
      }
    }

    if (url.pathname === '/login') {
      return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
    }

    if (url.pathname === '/' || url.pathname === '') {
      const page = await env.ASSETS.fetch(new Request(new URL('/landing.html', request.url), request));
      return new HTMLRewriter()
        .on('#courseModal', { element(el) { el.remove(); } })
        .on('.links a.purple', { element(el) { el.setAttribute('href', '/login'); } })
        .on('body', {
          element(el) {
            el.append(`
<style>
/* Correções de compatibilidade: course-details.js não deve alterar o layout da landing. */
.nav{background:rgba(255,255,255,.97)!important;border-bottom:1px solid rgba(42,11,73,.09)!important;box-shadow:none!important}
.navin{min-height:78px!important;padding:0!important}
.links{display:flex!important;align-items:center!important;gap:4px!important}
.links a{color:#45374e!important;padding:10px 12px!important;border-radius:11px!important}
.links .orange{background:#ff7400!important;color:#fff!important}
.links .purple{background:#2a0b49!important;color:#fff!important}
.hero{background:radial-gradient(circle at 85% 15%,rgba(255,171,82,.23),transparent 22%),radial-gradient(circle at 8% 88%,rgba(130,55,190,.3),transparent 25%),linear-gradient(135deg,#150421,#2a0b49 45%,#64209a)!important}
.hero-in{min-height:620px!important;padding:70px 0!important;gap:55px!important}
.section{padding:88px 0!important}
.value{padding:27px!important;border-radius:20px!important}
.course-list{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:13px!important}
.course-item{min-height:82px!important;padding:17px 17px 15px 19px!important;border-radius:16px!important}
.signup{padding:88px 0!important}
footer{background:#150622!important}
@media(max-width:980px){.course-list{grid-template-columns:repeat(2,minmax(0,1fr))!important}.hero-in{grid-template-columns:1fr!important;min-height:auto!important;padding:62px 0 75px!important}.section{padding:72px 0!important}}
@media(max-width:700px){.links{position:fixed!important;left:12px!important;right:12px!important;top:76px!important;display:none!important;flex-direction:column!important;align-items:stretch!important;gap:7px!important;padding:12px!important;background:rgba(25,6,41,.98)!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:18px!important}.links.open{display:flex!important}.links a{color:#fff!important;text-align:center!important;padding:13px 12px!important}.hero-in{padding:44px 0 55px!important}.section{padding:62px 0!important}.course-list{grid-template-columns:1fr!important}.value{padding:21px!important}.signup{padding:62px 0!important}}
.course-price-box{margin-top:18px;padding:20px;border-radius:16px;background:linear-gradient(135deg,#4f1d78,#6b2a94);color:#fff;text-align:center;box-shadow:0 14px 35px #4f1d7830}
.course-price-box strong{display:block;font-size:12px;font-weight:900;letter-spacing:1px;text-transform:uppercase;opacity:.9}
.course-price-box .price-call{font-size:28px;font-weight:900;margin:5px 0 6px}
.course-price-box .price-text{font-size:15px;opacity:.95}
.course-price-box a{display:inline-block;margin-top:14px;padding:11px 18px;border-radius:10px;background:#f57c18;color:#fff;text-decoration:none;font-weight:900}
@media(max-width:700px){.course-price-box{padding:16px}.course-price-box .price-call{font-size:24px}.course-price-box .price-text{font-size:13px}.course-price-box a{width:100%}}
</style>
<script>
(() => {
  const fixAccessLink = () => {
    document.querySelectorAll('.links a').forEach((a) => {
      if (a.textContent.trim().toLowerCase().includes('área de acesso')) a.setAttribute('href','/login');
    });
  };
  const addPriceBox = () => {
    document.querySelectorAll('.course-dialog').forEach((dialog) => {
      if (dialog.querySelector('.course-price-box')) return;
      const grid = dialog.querySelector('.course-grid');
      if (!grid) return;
      const box = document.createElement('div');
      box.className = 'course-price-box';
      box.innerHTML = '<strong>Valores do curso</strong><div class="price-call">Venha conferir!</div><div class="price-text">Consulte valores, condições de pagamento e informações da turma.</div><a href="https://wa.me/5544997239673" target="_blank" rel="noopener noreferrer">WhatsApp: 44 99723-9673</a>';
      grid.insertAdjacentElement('afterend', box);
    });
  };
  fixAccessLink();
  addPriceBox();
  new MutationObserver(() => { fixAccessLink(); addPriceBox(); }).observe(document.body, { childList:true, subtree:true });
})();
</script>`, { html: true });
          },
        })
        .transform(page);
    }

    if (url.pathname.startsWith('/api/')) {
      return Response.json({ error: 'Rota ainda não implementada.' }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
