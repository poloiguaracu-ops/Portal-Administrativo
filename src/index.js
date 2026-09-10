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

    if (url.pathname === '/' || url.pathname === '') {
      const page = await env.ASSETS.fetch(
        new Request(new URL('/landing.html', request.url), request)
      );
      return new HTMLRewriter()
        .on('body', {
          element(el) {
            el.append(`
<section style="background:#f8f5fb;padding:80px 22px;border-top:1px solid #e7e9ef" id="inscricao">
  <div style="max-width:900px;margin:0 auto;background:#fff;border:1px solid #e7e9ef;border-radius:20px;padding:36px;box-shadow:0 15px 40px #0000000d">
    <div style="text-align:center;max-width:720px;margin:0 auto 30px">
      <div style="color:#f57c18;font-weight:900;font-size:12px;letter-spacing:1px;text-transform:uppercase">Inscrições</div>
      <h2 style="font-size:36px;line-height:1.15;color:#4f1d78;margin:8px 0 12px">Quer se inscrever?</h2>
      <p style="margin:0;color:#687083;font-size:16px">Preencha seus dados e indique a formação de seu interesse. Ao enviar, seu aplicativo de e-mail será aberto com a mensagem pronta para o Instituto.</p>
    </div>
    <form action="mailto:institutoeducacionalcg@institutocg.com.br" method="post" enctype="text/plain" style="display:grid;gap:16px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div><label for="nome" style="display:block;font-size:13px;font-weight:800;margin-bottom:6px;color:#252936">Nome completo</label><input id="nome" name="Nome completo" required type="text" placeholder="Digite seu nome completo" style="width:100%;padding:13px;border:1px solid #e0e3ea;border-radius:9px;font:inherit"></div>
        <div><label for="telefone" style="display:block;font-size:13px;font-weight:800;margin-bottom:6px;color:#252936">Telefone</label><input id="telefone" name="Telefone" required type="tel" placeholder="(00) 00000-0000" style="width:100%;padding:13px;border:1px solid #e0e3ea;border-radius:9px;font:inherit"></div>
      </div>
      <div><label for="email" style="display:block;font-size:13px;font-weight:800;margin-bottom:6px;color:#252936">E-mail</label><input id="email" name="E-mail" required type="email" placeholder="seuemail@exemplo.com" style="width:100%;padding:13px;border:1px solid #e0e3ea;border-radius:9px;font:inherit"></div>
      <div><label for="curso" style="display:block;font-size:13px;font-weight:800;margin-bottom:6px;color:#252936">Curso desejado</label><select id="curso" name="Curso desejado" required style="width:100%;padding:13px;border:1px solid #e0e3ea;border-radius:9px;background:#fff;font:inherit">
        <option value="">Selecione uma opção</option>
        <optgroup label="Cursos Técnicos">
          <option>Técnico em Administração</option><option>Técnico em Recursos Humanos</option><option>Técnico em Logística</option><option>Técnico em Desenvolvimento de Sistemas</option><option>Técnico em Informática</option><option>Técnico em Contabilidade</option><option>Técnico em Marketing</option><option>Técnico em Segurança do Trabalho</option><option>Técnico em Serviços Jurídicos</option><option>Técnico em Edificações</option><option>Técnico em Qualidade</option>
        </optgroup>
        <optgroup label="Cursos Livres">
          <option>Informática Básica</option><option>Excel</option><option>Auxiliar de Educação Infantil</option><option>Educação Especial</option><option>Alfabetização e Letramento</option><option>Contação de História</option><option>Recreação e Ludicidade</option><option>Práticas Pedagógicas</option><option>Neuroeducação</option><option>Cuidador de Idosos</option><option>Oratória</option><option>Cuidador Infantil</option><option>Desenvolvimento Infantil</option><option>Relações Humanas</option><option>Departamento Pessoal</option><option>Técnicas de Vendas</option><option>Gestão Empresarial</option><option>Saúde e Qualidade</option><option>Monitor Infantil</option><option>Literatura Infantil</option><option>Ética Profissional</option><option>Saúde Mental no Ambiente de Trabalho</option><option>Cuidador de Pessoas com Deficiência</option><option>Sustentabilidade</option><option>Educação Ambiental</option><option>Maquiagem</option><option>Cuidados com a Pele</option><option>Manicure e Pedicure</option><option>Robótica Educacional</option><option>ChatGPT para o Mercado de Trabalho</option><option>Pensamento Computacional</option><option>Beleza</option><option>Agronegócio</option>
        </optgroup>
        <option>Formação para Magistério</option>
      </select></div>
      <button type="submit" style="border:0;border-radius:10px;padding:14px 20px;background:#f57c18;color:#fff;font:inherit;font-weight:900;cursor:pointer">Enviar interesse</button>
      <p style="margin:0;text-align:center;color:#687083;font-size:12px">Ao enviar, será aberto o aplicativo de e-mail configurado no seu dispositivo para encaminhar a solicitação ao Instituto.</p>
    </form>
  </div>
</section>`, { html: true });
          },
        })
        .transform(page);
    }

    if (url.pathname === '/login') {
      return env.ASSETS.fetch(new Request(new URL('/index.html', request.url), request));
    }

    if (url.pathname.startsWith('/api/')) {
      return Response.json({ error: 'Rota ainda não implementada.' }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
