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
        return Response.json(
          { ok: false, error: String(error?.message || error) },
          { status: 500 }
        );
      }
    }

    if (url.pathname.startsWith('/api/')) {
      return Response.json({ error: 'Rota ainda não implementada.' }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
