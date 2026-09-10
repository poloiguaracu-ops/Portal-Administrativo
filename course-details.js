const SEED_URL = 'https://www.educacao.pr.gov.br/instrucoes';

const courseData = {
  'Técnico em Administração': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Processos administrativos, organização, documentos, atendimento, gestão de pessoas, materiais, finanças básicas, planejamento e uso de sistemas de informação.',
    jobs: 'Apoio administrativo, atendimento, compras, estoque, almoxarifado, rotinas financeiras e suporte a processos de gestão, conforme a formação e as exigências da função.',
    subjects: ['Processos administrativos', 'Gestão de pessoas', 'Gestão de materiais', 'Documentação e arquivos', 'Finanças básicas', 'Planejamento e gestão', 'Sistemas de informação'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },
  'Técnico em Recursos Humanos': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Recrutamento e seleção, departamento pessoal, integração, treinamento, desenvolvimento, avaliação de desempenho, cargos, salários, benefícios e rotinas trabalhistas.',
    jobs: 'Apoio em RH e departamento pessoal, recrutamento e seleção, treinamento, desenvolvimento e rotinas administrativas de pessoal.',
    subjects: ['Recrutamento e seleção', 'Departamento pessoal', 'Treinamento e desenvolvimento', 'Cargos e salários', 'Benefícios', 'Legislação trabalhista', 'Gestão de pessoas'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },
  'Técnico em Logística': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Compras, recebimento, armazenagem, movimentação, estoques, transporte, distribuição, expedição, custos e processos logísticos.',
    jobs: 'Almoxarifado, estoque, compras, transporte, recebimento, expedição, distribuição e apoio às operações logísticas.',
    subjects: ['Introdução à logística', 'Gestão de estoques', 'Armazenagem', 'Transportes', 'Compras', 'Distribuição e expedição', 'Processos e sistemas logísticos', 'Segurança e saúde ocupacional'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },
  'Técnico em Desenvolvimento de Sistemas': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Lógica de programação, desenvolvimento de aplicações, bancos de dados, análise e projeto de sistemas, desenvolvimento web, testes, documentação e segurança.',
    jobs: 'Desenvolvimento e manutenção de software, aplicações web, banco de dados, testes, suporte e atividades relacionadas a sistemas de informação.',
    subjects: ['Lógica de programação', 'Programação', 'Banco de dados', 'Desenvolvimento web', 'Análise e projeto de sistemas', 'Engenharia de software', 'Segurança da informação'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },
  'Técnico em Informática': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Hardware, software, sistemas operacionais, redes, internet, manutenção, configuração, suporte e segurança da informação.',
    jobs: 'Suporte técnico, manutenção de computadores, redes, infraestrutura, help desk e apoio em tecnologia da informação.',
    subjects: ['Hardware', 'Software', 'Sistemas operacionais', 'Redes de computadores', 'Manutenção', 'Internet', 'Segurança da informação'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },
  'Técnico em Contabilidade': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Fundamentos contábeis, patrimônio, escrituração, documentos, rotinas fiscais, informações financeiras e organização de registros.',
    jobs: 'Apoio em escritórios contábeis, departamentos contábeis, fiscais e financeiros e rotinas administrativas relacionadas à contabilidade.',
    subjects: ['Fundamentos de contabilidade', 'Escrituração', 'Patrimônio', 'Rotinas fiscais', 'Documentação contábil', 'Informações financeiras', 'Rotinas administrativas'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },
  'Técnico em Marketing': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Fundamentos de marketing, comportamento do consumidor, comunicação, planejamento, vendas, promoção, relacionamento e estratégias digitais.',
    jobs: 'Marketing, comunicação, atendimento, vendas, promoção, mídias e apoio comercial.',
    subjects: ['Fundamentos de marketing', 'Comportamento do consumidor', 'Comunicação', 'Vendas', 'Planejamento', 'Marketing digital', 'Relacionamento com clientes'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },
  'Técnico em Segurança do Trabalho': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Prevenção de acidentes, identificação e controle de riscos, higiene ocupacional, ergonomia, normas, equipamentos de proteção e ações educativas.',
    jobs: 'Atividades de prevenção e apoio à segurança do trabalho em organizações, conforme atribuições legais e requisitos da função.',
    subjects: ['Prevenção de riscos', 'Segurança ocupacional', 'Higiene do trabalho', 'Ergonomia', 'Legislação e normas', 'EPI', 'Ações educativas'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },
  'Técnico em Serviços Jurídicos': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Rotinas administrativas e documentais do ambiente jurídico, organização de processos, atendimento, pesquisa e noções de legislação.',
    jobs: 'Apoio administrativo em escritórios, departamentos jurídicos, cartórios e organizações que mantenham rotinas documentais jurídicas, dentro das atribuições permitidas.',
    subjects: ['Documentação jurídica', 'Organização de processos', 'Rotinas jurídicas', 'Atendimento', 'Noções de legislação', 'Ética profissional', 'Pesquisa e organização'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },
  'Técnico em Edificações': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Desenho técnico e arquitetônico, materiais, processos construtivos, instalações, orçamento, planejamento, topografia e acompanhamento de obras.',
    jobs: 'Apoio técnico em construtoras, escritórios, obras, orçamento, planejamento, projetos e acompanhamento de execução, conforme atribuições profissionais.',
    subjects: ['Desenho técnico', 'Desenho arquitetônico', 'Materiais de construção', 'Tecnologia da construção', 'Instalações prediais', 'Orçamentos', 'Topografia'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },
  'Técnico em Qualidade': {
    type: 'Curso Técnico',
    hours: 'Carga horária conforme a matriz curricular vigente da oferta',
    study: 'Gestão da qualidade, padronização, processos, indicadores, documentação, controle, análise de resultados e melhoria contínua.',
    jobs: 'Qualidade, processos, produção, documentação, controle, auditoria interna e apoio à melhoria contínua.',
    subjects: ['Gestão da qualidade', 'Processos', 'Indicadores', 'Padronização', 'Controle da qualidade', 'Documentação', 'Melhoria contínua'],
    source: 'Referência curricular: SEED-PR. A matriz exata depende da modalidade e da oferta vigente.'
  },

  'Informática Básica': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Uso do computador, arquivos e pastas, internet, editores de texto, recursos digitais e noções de segurança.', jobs:'Apoio em rotinas administrativas e uso cotidiano de tecnologia.', subjects:['Computador','Sistema operacional','Internet','Editor de texto','Arquivos e pastas','Segurança digital'] },
  'Excel': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Planilhas, fórmulas, funções, organização de dados, gráficos e recursos de controle e análise.', jobs:'Rotinas administrativas, financeiras, comerciais, estoque e análise de informações.', subjects:['Planilhas','Fórmulas','Funções','Gráficos','Organização de dados','Relatórios'] },
  'Auxiliar de Educação Infantil': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Rotinas de cuidado, desenvolvimento infantil, organização de atividades, ludicidade, higiene e apoio pedagógico.', jobs:'Apoio em escolas, centros de educação infantil e espaços de atendimento à infância, conforme requisitos da função.', subjects:['Desenvolvimento infantil','Cuidados','Ludicidade','Rotinas','Higiene','Apoio pedagógico'] },
  'Educação Especial': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Educação inclusiva, acessibilidade, barreiras à aprendizagem, estratégias pedagógicas e recursos de apoio.', jobs:'Apoio educacional e atuação complementar em contextos inclusivos, conforme formação e legislação aplicável.', subjects:['Inclusão','Acessibilidade','Estratégias pedagógicas','Desenvolvimento','Tecnologia assistiva','Práticas inclusivas'] },
  'Alfabetização e Letramento': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Processos de alfabetização, leitura e escrita, consciência fonológica, letramento e estratégias pedagógicas.', jobs:'Apoio pedagógico e atividades educacionais relacionadas à alfabetização, conforme habilitação profissional.', subjects:['Alfabetização','Letramento','Leitura','Escrita','Consciência fonológica','Práticas pedagógicas'] },
  'Contação de História': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Técnicas de narração, expressão, seleção de histórias e uso de recursos para estimular imaginação e leitura.', jobs:'Projetos educativos, bibliotecas, recreação, atividades culturais e apoio em práticas pedagógicas.', subjects:['Narração','Expressão','Literatura infantil','Recursos','Leitura','Dramatização'] },
  'Recreação e Ludicidade': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Brincadeiras, jogos, atividades recreativas, ludicidade e planejamento de experiências.', jobs:'Escolas, recreação, projetos educativos, eventos e espaços de atendimento infantil.', subjects:['Jogos','Brincadeiras','Ludicidade','Planejamento','Recreação','Dinâmicas'] },
  'Práticas Pedagógicas': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Planejamento, organização de atividades, metodologias, avaliação e estratégias para contextos educacionais.', jobs:'Apoio e desenvolvimento de práticas educacionais, conforme formação e função exercida.', subjects:['Planejamento','Metodologias','Avaliação','Atividades','Gestão de sala','Práticas educativas'] },
  'Neuroeducação': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Relações entre aprendizagem, desenvolvimento, atenção, memória, emoções e estratégias educacionais.', jobs:'Apoio a práticas educacionais e desenvolvimento de estratégias de aprendizagem, conforme habilitação profissional.', subjects:['Aprendizagem','Memória','Atenção','Emoções','Desenvolvimento','Estratégias'] },
  'Cuidador de Idosos': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Rotinas de cuidado, higiene, alimentação, segurança, mobilidade e apoio à autonomia da pessoa idosa.', jobs:'Atendimento domiciliar, instituições e serviços de apoio, conforme requisitos e limites da função.', subjects:['Cuidados básicos','Higiene','Alimentação','Mobilidade','Segurança','Apoio à autonomia'] },
  'Oratória': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Comunicação oral, organização de ideias, postura, voz, apresentação e técnicas para falar em público.', jobs:'Apresentações profissionais, atendimento, vendas, treinamentos e comunicação no trabalho.', subjects:['Comunicação','Voz','Postura','Apresentação','Argumentação','Expressão'] },
  'Cuidador Infantil': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Cuidados, segurança, rotinas, higiene, alimentação e atividades adequadas ao desenvolvimento infantil.', jobs:'Residências, espaços de cuidado infantil e serviços de apoio à infância, conforme requisitos da função.', subjects:['Rotinas','Higiene','Alimentação','Segurança','Brincadeiras','Desenvolvimento'] },
  'Desenvolvimento Infantil': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Desenvolvimento físico, cognitivo, emocional, social e aprendizagem na infância.', jobs:'Apoio a práticas educacionais e de cuidado infantil, conforme formação e função.', subjects:['Desenvolvimento físico','Cognitivo','Emocional','Social','Aprendizagem','Brincar'] },
  'Relações Humanas': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Comunicação interpessoal, convivência, empatia, trabalho em equipe e resolução de conflitos.', jobs:'Aplicação em equipes, atendimento, liderança e ambientes organizacionais.', subjects:['Comunicação','Empatia','Equipe','Conflitos','Convivência','Liderança'] },
  'Departamento Pessoal': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Rotinas de admissão, registros, folha, benefícios, férias, afastamentos e desligamentos.', jobs:'Apoio em departamento pessoal e rotinas administrativas de pessoal.', subjects:['Admissão','Folha','Benefícios','Férias','Afastamentos','Rescisão'] },
  'Técnicas de Vendas': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Abordagem, negociação, atendimento, apresentação de produtos, objeções, fechamento e pós-venda.', jobs:'Vendas, atendimento, comércio, representação e relacionamento com clientes.', subjects:['Abordagem','Atendimento','Negociação','Objeções','Fechamento','Pós-venda'] },
  'Gestão Empresarial': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Noções de planejamento, organização, pessoas, processos, finanças e tomada de decisão.', jobs:'Apoio administrativo, gestão de processos e desenvolvimento de negócios.', subjects:['Planejamento','Processos','Pessoas','Finanças','Indicadores','Decisão'] },
  'Saúde e Qualidade': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Qualidade de vida, prevenção, hábitos saudáveis e organização de práticas de cuidado.', jobs:'Ações educativas e apoio a programas de promoção de saúde, conforme formação e função.', subjects:['Prevenção','Hábitos saudáveis','Qualidade de vida','Bem-estar','Educação em saúde'] },
  'Monitor Infantil': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Acompanhamento de crianças, organização de atividades, segurança, rotina e apoio ao desenvolvimento.', jobs:'Escolas, projetos, espaços de recreação e serviços de apoio infantil, conforme requisitos.', subjects:['Rotinas','Segurança','Atividades','Brincadeiras','Desenvolvimento'] },
  'Literatura Infantil': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Gêneros, obras, leitura, mediação e estratégias para aproximar crianças da literatura.', jobs:'Bibliotecas, projetos de leitura, escolas e atividades culturais, conforme formação.', subjects:['Gêneros','Leitura','Mediação','Autores','Projetos de leitura'] },
  'Ética Profissional': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Princípios éticos, responsabilidade, conduta, relações de trabalho e tomada de decisão responsável.', jobs:'Aplicável a diferentes ambientes profissionais.', subjects:['Ética','Responsabilidade','Conduta','Relacionamento','Decisão'] },
  'Saúde Mental no Ambiente de Trabalho': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Bem-estar, relações de trabalho, organização, comunicação, prevenção e cuidado no ambiente profissional.', jobs:'Aplicação em ambientes de trabalho e ações educativas, sem substituir atendimento especializado.', subjects:['Bem-estar','Relações de trabalho','Comunicação','Organização','Prevenção','Cuidado'] },
  'Cuidador de Pessoas com Deficiência': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Apoio à rotina, autonomia, segurança, comunicação, acessibilidade e participação social da pessoa com deficiência.', jobs:'Apoio domiciliar e institucional, conforme formação, necessidades da pessoa e requisitos da função.', subjects:['Autonomia','Acessibilidade','Comunicação','Segurança','Rotinas','Inclusão'] },
  'Sustentabilidade': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Sustentabilidade, consumo responsável, recursos naturais, resíduos e práticas sustentáveis.', jobs:'Apoio a ações de sustentabilidade e educação ambiental em diferentes organizações.', subjects:['Sustentabilidade','Consumo responsável','Recursos naturais','Resíduos','Boas práticas'] },
  'Educação Ambiental': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Meio ambiente, conservação, impactos ambientais, cidadania e práticas educativas.', jobs:'Projetos educativos, ações comunitárias e apoio a iniciativas ambientais, conforme formação.', subjects:['Meio ambiente','Conservação','Impactos ambientais','Cidadania','Projetos educativos'] },
  'Maquiagem': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Preparação da pele, técnicas básicas de maquiagem, produtos, higiene, atendimento e organização do trabalho.', jobs:'Atendimento em maquiagem, beleza e serviços relacionados, conforme capacitação e regras locais.', subjects:['Preparação da pele','Produtos','Técnicas','Higiene','Atendimento','Organização'] },
  'Cuidados com a Pele': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Rotinas básicas de cuidados com a pele, higiene, tipos de pele, produtos e prevenção.', jobs:'Apoio e orientação em rotinas básicas de cuidado, respeitando os limites da formação e da legislação.', subjects:['Higiene','Tipos de pele','Rotinas','Produtos','Prevenção'] },
  'Manicure e Pedicure': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Higiene, preparação, esmaltação, cuidados básicos, materiais e atendimento.', jobs:'Serviços de manicure e pedicure, conforme capacitação, biossegurança e regras locais.', subjects:['Higiene','Materiais','Preparação','Esmaltação','Cuidados','Atendimento'] },
  'Robótica Educacional': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Lógica, montagem, sensores, programação introdutória, resolução de problemas e projetos educacionais.', jobs:'Projetos educacionais, oficinas, atividades maker e apoio a práticas de tecnologia educacional.', subjects:['Lógica','Montagem','Sensores','Programação','Projetos','Resolução de problemas'] },
  'ChatGPT para o Mercado de Trabalho': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Uso responsável de IA generativa, criação de prompts, revisão de textos, organização de tarefas e produtividade.', jobs:'Aplicação de IA em rotinas administrativas, comunicação, estudos e produtividade, conforme políticas da organização.', subjects:['IA generativa','Prompts','Produtividade','Textos','Organização','Uso responsável'] },
  'Pensamento Computacional': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Decomposição de problemas, reconhecimento de padrões, algoritmos, lógica e resolução estruturada de situações.', jobs:'Aplicação de raciocínio lógico em tecnologia, educação e processos de trabalho.', subjects:['Algoritmos','Lógica','Padrões','Decomposição','Resolução de problemas'] },
  'Beleza': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Fundamentos de cuidados e serviços de beleza, higiene, materiais, atendimento e organização profissional.', jobs:'Apoio e prestação de serviços no segmento de beleza, conforme especialização e regras locais.', subjects:['Higiene','Materiais','Atendimento','Organização','Cuidados de beleza'] },
  'Agronegócio': { type:'Curso Livre', hours:'Definida no plano do curso do Instituto', study:'Noções de produção, gestão, comercialização, sustentabilidade, tecnologia e organização de atividades do agronegócio.', jobs:'Apoio administrativo e operacional em propriedades, empresas, cooperativas e serviços ligados ao agronegócio.', subjects:['Produção','Gestão','Comercialização','Sustentabilidade','Tecnologia','Organização'] },

  'Magistério': {
    type: 'Formação para Magistério',
    hours: 'Conforme a organização curricular e a habilitação vigente',
    study: 'Fundamentos da educação, didática, desenvolvimento e aprendizagem, alfabetização, metodologias, avaliação e práticas de formação.',
    jobs: 'Atuação docente na Educação Infantil e nos anos iniciais do Ensino Fundamental, conforme habilitação e legislação aplicável.',
    subjects: ['Fundamentos da educação', 'Didática', 'Desenvolvimento e aprendizagem', 'Alfabetização', 'Metodologias', 'Avaliação', 'Práticas de formação'],
    source: 'Referência: organização curricular e Plano de Curso. Em documento oficial da SEED-PR de 2026, o curso de Formação de Docentes em nível médio é descrito com duração de 4 anos e componente obrigatório de Prática de Formação, mas a matriz aplicável deve ser a do curso/oferta correspondente.'
  }
};

function getCourseKey(item) {
  const title = item.querySelector('.course-name, strong')?.textContent?.trim();
  if (title && courseData[title]) return title;
  const text = item.textContent.replace(/Ver detalhes →/g, '').trim();
  return Object.keys(courseData).find((name) => text.includes(name)) || null;
}

function openCourseModal(courseName) {
  const data = courseData[courseName];
  if (!data) return;

  let modal = document.getElementById('course-details-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'course-details-modal';
    modal.className = 'course-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    document.body.appendChild(modal);
  }

  const subjects = (data.subjects || []).map((subject) => `<span class="course-subject">${escapeHtml(subject)}</span>`).join('');
  const source = data.source || (data.type === 'Curso Técnico' ? 'Informações apresentadas como referência temática. A matriz e a carga horária oficiais devem seguir o Plano de Curso e a oferta vigente.' : 'Conteúdo apresentado como referência descritiva. A carga horária será definida no plano do curso do Instituto.');

  modal.innerHTML = `
    <div class="course-dialog">
      <div class="course-header">
        <div>
          <span class="course-badge">${escapeHtml(data.type)}</span>
          <h2>${escapeHtml(courseName)}</h2>
        </div>
        <button class="course-close" type="button" aria-label="Fechar">×</button>
      </div>
      <div class="course-grid">
        <div class="course-panel"><h3>O que você estuda</h3><p>${escapeHtml(data.study)}</p></div>
        <div class="course-panel"><h3>Possibilidades de atuação</h3><p>${escapeHtml(data.jobs)}</p></div>
        <div class="course-panel"><h3>Carga horária</h3><p class="course-hours">${escapeHtml(data.hours)}</p></div>
        <div class="course-panel"><h3>Componentes / áreas de estudo</h3><div class="course-subjects">${subjects}</div></div>
      </div>
      <div class="course-source"><strong>Observação curricular:</strong> ${escapeHtml(source)}<br><br>
        <a href="${SEED_URL}" target="_blank" rel="noopener noreferrer">Consultar instruções e matrizes publicadas pela SEED-PR →</a>
      </div>
    </div>`;

  modal.classList.add('open');
  modal.querySelector('.course-close').focus();
  modal.querySelector('.course-close').addEventListener('click', closeCourseModal);
  modal.addEventListener('click', (event) => { if (event.target === modal) closeCourseModal(); }, { once: true });
}

function closeCourseModal() {
  document.getElementById('course-details-modal')?.classList.remove('open');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeCourseModal();
});

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.course-item').forEach((item) => {
    const courseName = getCourseKey(item);
    if (!courseName || !courseData[courseName]) return;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    if (!item.querySelector('.course-hint')) {
      const hint = document.createElement('span');
      hint.className = 'course-hint';
      hint.textContent = 'Ver detalhes →';
      item.appendChild(hint);
    }
    item.addEventListener('click', () => openCourseModal(courseName));
    item.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCourseModal(courseName);
      }
    });
  });
});
