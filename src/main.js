import legacyWorker from './index.js';

function security(response) {
  const headers = new Headers(response.headers);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function assetPage(request, env, path, mode) {
  const assetRequest = new Request(new URL(path, request.url), request);
  const asset = await env.ASSETS.fetch(assetRequest);
  if (!asset.ok) {
    return security(new Response('Página não encontrada.', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    }));
  }

  const rewritten = new HTMLRewriter()
    .on('body', {
      element(element) {
        element.append('<script src="/app-polish.js" defer></script>', { html: true });
        if (mode === 'portal') {
          element.append('<script src="/portal-dashboard-pro.js" defer></script>', { html: true });
        }
      },
    })
    .transform(asset);

  return security(rewritten);
}

function normalizedPath(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname || '/';
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const path = normalizedPath(url.pathname);

    // The canonical public entry point never redirects. It serves landing.html directly.
    const publicPaths = new Set(['/', '/site-publico', '/site', '/instituto', '/home', '/landing']);
    const adminPaths = new Set(['/portal-administrativo', '/portal', '/admin', '/administrativo', '/login']);

    if (!path.startsWith('/api/')) {
      if (publicPaths.has(path)) {
        return assetPage(request, env, '/landing.html', 'landing');
      }

      if (adminPaths.has(path)) {
        return assetPage(request, env, '/index.html', 'portal');
      }

      // Explicit legacy HTML aliases are served directly to prevent redirect chains.
      if (path === '/landing.html' || path === '/instituto-oficial.html') {
        return assetPage(request, env, '/landing.html', 'landing');
      }

      if (path === '/portal-administrativo.html') {
        return assetPage(request, env, '/index.html', 'portal');
      }
    }

    // All API and non-canonical asset requests continue through the mature Worker router.
    try {
      return await legacyWorker.fetch(request, env, ctx);
    } catch (error) {
      console.error('Unhandled Worker error', error);
      return security(Response.json({
        error: 'Erro interno no servidor.',
        request_id: crypto.randomUUID(),
      }, { status: 500, headers: { 'Cache-Control': 'no-store, max-age=0' } }));
    }
  },
};
