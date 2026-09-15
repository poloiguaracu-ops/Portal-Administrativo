(() => {
  'use strict';
  if (window.__IECG_D1_V2__) return;
  window.__IECG_D1_V2__ = true;

  const ready = fn => document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', fn, { once: true })
    : fn();
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = v => new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(Number(v) || 0);
  const dateBR = v => {
    if (!v) return '-';
    const d = new Date(`${v}T00:00:00`);
    return Number.isNaN(d.getTime()) ? esc(v) : d.toLocaleDateString('pt-BR');
  };
  const toast = (message, kind = 'info') => {
    if (window.iecgToast) return window.iecgToast(message, kind === 'error' ? 'Atenção' : kind === 'ok' ? 'Tudo certo' : 'Portal Administrativo');
    alert(message);
  };
  const api = async (path, options = {}) => {
    const r = await fetch(path, {
      credentials: 'same-origin',
      ...options,
      headers: {'Content-Type':'application/json', ...(options.headers || {})}
    });
    let d = null;
    try { d = await r.json(); } catch (_) {}
    if (!r.ok) throw new Error(d?.error || `Falha HTTP ${r.status}`);
    return d;
  };
  const getMe = () => api('/api/auth/me').catch(() => null);
  const field = (label, id, type = 'text', placeholder = '', value = '') =>
    `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type}" placeholder="${placeholder}" value="${esc(value)}"></div>`;
  const select = (label, id, options, selected = '') =>
    `<div class="field"><label for="${id}">${label}</label><select id="${id}">${options.map(o => `<option value="${esc(o.value)}" ${String(o.value) === String(selected) ? 'selected' : ''}>${esc(o.label)}</option>`).join('')}</select></div>`;
  const openModal = (title, body, save, saveLabel = 'Salvar') => {
    if (typeof window.abrirModal !== 'function') return toast('A janela de cadastro não está disponível nesta tela.', 'error');
    window.abrirModal(title, body + `<div class="modal-foot"><button type="button" class="btn secondary" id="d1Cancel">Cancelar</button><button type="button" class="btn primary" id="d1Save">${saveLabel}</button></div>`);
    document.getElementById('d1Cancel')?.addEventListener('click', () => window.fecharModal?.());
    document.getElementById('d1Save')?.addEventListener('click', save);
  };
  const table = (heads, rows, colspanMessage = 'Nenhum registro encontrado') => rows.length
    ? `<div class="table-wrap"><table class="table"><thead><tr>${heads.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`
    : `<div class="empty"><b>${colspanMessage}</b><span>Use o botão de adicionar para começar.</span></div>`;
  const badge = (status, map = {}) => {
    const key = String(status || '').toLowerCase();
    const kind = map[key] || (['ativo','ativa','pago','concluida','concluído'].includes(key) ? 'ok' : ['atrasado','cancelado','inativo'].includes(key) ? 'danger' : 'warn');
    return `<span class="badge ${kind}">${esc(status || '-')}</span>`;
  };
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  const currentRole = () => window.__IECG_ROLE__ || 'administrador';

  function setHeader(user, connected = true) {
    document.querySelectorAll('#usuarioAtual,.user-chip,.user').forEach(el => el.textContent = user?.full_name || user?.name || 'Acesso');
    document.querySelectorAll('#sideUser').forEach(el => el.textContent = user?.full_name || user?.name || 'Acesso');
    document.querySelectorAll('#sideRole,#configRole').forEach(el => el.textContent = user?.role || 'Perfil');
    document.querySelectorAll('.live,.status').forEach(el => {
      el.textContent = connected ? '● Banco D1 conectado' : '● Sistema disponível';
      el.title = connected ? 'Dados sincronizados com o banco D1.' : 'Banco indisponível no momento.';
    });
  }

  function buildRoleNav(user) {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const role = user?.role || 'administrador';
    window.__IECG_ROLE__ = role;
    const common = [['dashboard','🏠','Dashboard']];
    const admin = [
      ['alunos','👨‍🎓','Alunos'], ['matriculas','📋','Matrículas'], ['financeiro','💰','Financeiro'],
      ['funcionarios','👥','Funcionários'], ['professores','👩‍🏫','Professores'], ['cursos','📚','Cursos livres'],
      ['usuarios','🔐','Usuários'], ['config','⚙️','Configurações']
    ];
    const restricted = role === 'administrador' ? admin : role === 'professor'
      ? [['profArea','👩‍🏫','Minha área'], ['cursos','📚','Cursos']]
      : [['alunoArea','🎓','Minha área']];
    nav.innerHTML = [...common, ...restricted].map(([id, icon, label]) =>
      `<button type="button" data-page="${id}" title="${esc(label)}"><span class="ic">${icon}</span>${esc(label)}</button>`
    ).join('');
    nav.querySelectorAll('button').forEach(b => b.addEventListener('click', () => window.abrirPagina?.(b.dataset.page)));
    if (!document.getElementById('profArea')) {
      const s = document.createElement('section'); s.id = 'profArea'; s.className = 'page';
      s.innerHTML = `<div class="panel"><div class="panel-head"><div><h3>Minha área</h3><p>Área do professor.</p></div></div><div class="empty"><b>Turmas e aulas</b><span>Use esta área para acompanhar cursos vinculados, turmas e conteúdos.</span></div></div>`;
      document.querySelector('main')?.appendChild(s);
    }
    if (!document.getElementById('alunoArea')) {
      const s = document.createElement('section'); s.id = 'alunoArea'; s.className = 'page';
      s.innerHTML = `<div class="grid3"><div class="panel"><div class="panel-head"><h3>Minha matrícula</h3></div><div class="section-note">Consulte curso e situação da sua matrícula.</div></div><div class="panel"><div class="panel-head"><h3>Meu financeiro</h3></div><div class="section-note">Acompanhe mensalidades e pagamentos.</div></div><div class="panel"><div class="panel-head"><h3>Meus dados</h3></div><div class="section-note">Consulte seus dados cadastrados.</div></div></div>`;
      document.querySelector('main')?.appendChild(s);
    }
  }

  async function loadAdminData() {
    const d = await api('/api/dashboard');
    const students = await api('/api/students');
    const enrollments = await api('/api/enrollments');
    const financial = await api('/api/financial');
    const employees = await api('/api/employees');
    const teachers = await api('/api/teachers');
    const courses = await api('/api/courses');
    set('mAlunos', d.counts.students);
    set('mMatriculas', d.counts.enrollments);
    set('mFinanceiro', money(d.counts.revenue));
    set('mFuncionarios', d.counts.employees);
    const fList = financial.results || [];
    const total = fList.reduce((sum, x) => sum + Number(x.final_amount || 0), 0);
    const paid = fList.reduce((sum, x) => sum + Number(x.paid_amount || 0), 0);
    const pending = fList.filter(x => !['pago','cancelado'].includes(x.status)).reduce((sum, x) => sum + Math.max(0, Number(x.final_amount || 0) - Number(x.paid_amount || 0)), 0);
    if (document.getElementById('kpiLancado')) document.getElementById('kpiLancado').textContent = money(total);
    if (document.getElementById('kpiPago')) document.getElementById('kpiPago').textContent = money(paid);
    if (document.getElementById('kpiPendente')) document.getElementById('kpiPendente').textContent = money(pending);
    renderStudents(students.results || []);
    renderEnrollments(enrollments.results || []);
    renderFinancial(fList);
    renderEmployees(employees.results || []);
    renderTeachers(teachers.results || []);
    renderCourses(courses.results || []);
    const role = currentRole();
    if (role === 'administrador') {
      try { const users = await api('/api/users'); renderUsers(users.results || []); } catch (e) { console.warn('Usuários:', e); }
    }
  }

  function renderStudents(rows) {
    set('alunosTable', table(['Nome','CPF','Telefone','Status','Ações'], rows.map(a => `<tr><td><b>${esc(a.full_name)}</b></td><td>${esc(a.cpf || '-')}</td><td>${esc(a.phone || '-')}</td><td>${badge(a.status)}</td><td><div class="actions"><button class="btn ghost" data-edit="students" data-id="${a.id}">Editar</button><button class="btn secondary" data-del="students" data-id="${a.id}">Excluir</button></div></td></tr>`)));
  }
  function renderEnrollments(rows) {
    set('matriculasTable', table(['Aluno','Curso','Matrícula','Mensalidade','Parcelas','Total','Status','Ações'], rows.map(a => `<tr><td>${esc(a.student_name)}</td><td>${esc(a.course_name)}</td><td>${esc(a.enrollment_number || '-')}</td><td>${a.monthly_amount == null ? '-' : money(a.monthly_amount)}</td><td>${esc(a.installment_count || '-')}</td><td>${a.total_course_amount == null ? '-' : money(a.total_course_amount)}</td><td>${badge(a.status)}</td><td><button class="btn secondary" data-del="enrollments" data-id="${a.id}">Excluir</button></td></tr>`)));
  }
  function renderFinancial(rows) {
    set('financeiroTable', table(['Aluno','Descrição','Valor final','Pago','Vencimento','Status','Ações'], rows.map(a => `<tr><td>${esc(a.student_name || '-')}</td><td>${esc(a.description)}</td><td>${money(a.final_amount)}</td><td>${money(a.paid_amount)}</td><td>${dateBR(a.due_date)}</td><td>${badge(a.status)}</td><td><div class="actions"><button class="btn ghost" data-edit="financial" data-id="${a.id}">Editar</button><button class="btn secondary" data-del="financial" data-id="${a.id}">Excluir</button></div></td></tr>`)));
  }
  function renderEmployees(rows) {
    set('funcionariosTable', table(['Nome','CPF','Função','Telefone','Status','Ações'], rows.map(a => `<tr><td><b>${esc(a.full_name)}</b></td><td>${esc(a.cpf || '-')}</td><td>${esc(a.job_title || '-')}</td><td>${esc(a.phone || '-')}</td><td>${badge(a.status)}</td><td><div class="actions"><button class="btn ghost" data-edit="employees" data-id="${a.id}">Editar</button><button class="btn secondary" data-del="employees" data-id="${a.id}">Excluir</button></div></td></tr>`)));
  }
  function renderTeachers(rows) {
    set('professoresTable', table(['Nome','Registro','Telefone','Status','Ações'], rows.map(a => `<tr><td><b>${esc(a.full_name)}</b></td><td>${esc(a.professional_registration || '-')}</td><td>${esc(a.phone || '-')}</td><td>${badge(a.status)}</td><td><div class="actions"><button class="btn ghost" data-edit="teachers" data-id="${a.id}">Editar</button><button class="btn secondary" data-del="teachers" data-id="${a.id}">Excluir</button></div></td></tr>`)));
  }
  function renderCourses(rows) {
    set('cursosTable', table(['Curso','Modalidade','Duração','Status','Ações'], rows.map(a => `<tr><td><b>${esc(a.name)}</b></td><td>${esc(a.modality || '-')}</td><td>${esc(a.duration || '-')}</td><td>${badge(a.status)}</td><td><div class="actions"><button class="btn ghost" data-edit="courses" data-id="${a.id}">Editar</button><button class="btn secondary" data-del="courses" data-id="${a.id}">Excluir</button></div></td></tr>`)));
  }
  function renderUsers(rows) {
    set('usuariosTable', table(['Nome','Login','Perfil','Status','Ações'], rows.map(a => `<tr><td><b>${esc(a.full_name)}</b></td><td>${esc(a.username || a.email || '-')}</td><td>${esc(a.role)}</td><td>${a.active ? badge('Ativo') : badge('Inativo')}</td><td>${a.id === window.__IECG_USER_ID__ ? '<span class="badge ok">Sessão atual</span>' : `<button class="btn secondary" data-toggle-user="${a.id}" data-active="${a.active}">${a.active ? 'Desativar' : 'Ativar'}</button>`}</td></tr>`)));
  }

  async function editEntity(type, id) {
    const endpoint = {students:'students', teachers:'teachers', employees:'employees', courses:'courses', financial:'financial'}[type];
    if (!endpoint) return;
    let rows;
    try { rows = (await api(`/api/${endpoint}`)).results || []; } catch (e) { return toast(e.message, 'error'); }
    const item = rows.find(x => Number(x.id) === Number(id));
    if (!item) return toast('Registro não encontrado.', 'error');
    if (type === 'students') return openStudentForm(item);
    if (type === 'teachers') return openTeacherForm(item);
    if (type === 'employees') return openEmployeeForm(item);
    if (type === 'courses') return openCourseForm(item);
    if (type === 'financial') return openFinancialForm(item);
  }

  function openStudentForm(item = {}) {
    openModal(item.id ? 'Editar aluno' : 'Cadastrar aluno', `<div class="form-grid">${field('Nome completo','fNome','text','Nome do aluno',item.full_name)}${field('CPF','fCpf','text','000.000.000-00',item.cpf)}${field('Telefone','fTel','text','(44) 99999-9999',item.phone)}${field('E-mail','fEmail','email','email@exemplo.com',item.email)}${field('Data de nascimento','fBirth','date','',item.birth_date)}<div class="field full"><label for="fAddress">Endereço</label><input id="fAddress" value="${esc(item.address || '')}"></div>${select('Status','fStatus',[{value:'ativo',label:'Ativo'},{value:'inativo',label:'Inativo'},{value:'trancado',label:'Trancado'},{value:'concluido',label:'Concluído'}],item.status || 'ativo')}<div class="field full"><label for="fNotes">Observações</label><textarea id="fNotes">${esc(item.notes || '')}</textarea></div></div>`, async () => {
      try {
        const payload = {full_name:fNome.value.trim(),cpf:fCpf.value.trim(),phone:fTel.value.trim(),email:fEmail.value.trim(),birth_date:fBirth.value||null,address:fAddress.value.trim(),status:fStatus.value,notes:fNotes.value.trim()};
        if (!payload.full_name) throw new Error('Informe o nome do aluno.');
        await api(item.id ? `/api/students/${item.id}` : '/api/students', {method:item.id?'PATCH':'POST', body:JSON.stringify(payload)});
        fecharModal?.(); toast(item.id ? 'Aluno atualizado.' : 'Aluno cadastrado.', 'ok'); await render();
      } catch (e) { toast(e.message, 'error'); }
    });
  }

  function openTeacherForm(item = {}) {
    openModal(item.id ? 'Editar professor' : 'Cadastrar professor', `<div class="form-grid">${field('Nome completo','proNome','text','Nome do professor',item.full_name)}${field('CPF','proCpf','text','000.000.000-00',item.cpf)}${field('Registro profissional','proReg','text','Registro',item.professional_registration)}${field('Telefone','proTel','text','(44) 99999-9999',item.phone)}${field('E-mail','proEmail','email','email@exemplo.com',item.email)}${select('Status','proStatus',[{value:'ativo',label:'Ativo'},{value:'inativo',label:'Inativo'}],item.status||'ativo')}<div class="field full"><label for="proNotes">Observações</label><textarea id="proNotes">${esc(item.notes || '')}</textarea></div></div>`, async () => {
      try { const payload={full_name:proNome.value.trim(),cpf:proCpf.value.trim(),professional_registration:proReg.value.trim(),phone:proTel.value.trim(),email:proEmail.value.trim(),status:proStatus.value,notes:proNotes.value.trim()}; if(!payload.full_name) throw new Error('Informe o nome.'); await api(item.id?`/api/teachers/${item.id}`:'/api/teachers',{method:item.id?'PATCH':'POST',body:JSON.stringify(payload)}); fecharModal?.(); toast(item.id?'Professor atualizado.':'Professor cadastrado.','ok'); await render(); } catch(e){toast(e.message,'error');}
    });
  }

  function openEmployeeForm(item = {}) {
    openModal(item.id ? 'Editar funcionário' : 'Cadastrar funcionário', `<div class="form-grid">${field('Nome completo','funNome','text','Nome do funcionário',item.full_name)}${field('CPF','funCpf','text','000.000.000-00',item.cpf)}${field('Data de nascimento','funBirth','date','',item.birth_date)}${field('Telefone','funTel','text','(44) 99999-9999',item.phone)}${field('E-mail','funEmail','email','email@exemplo.com',item.email)}${field('Função','funJob','text','Função',item.job_title)}${field('Data de admissão','funHire','date','',item.hire_date)}${field('Salário','funSalary','number','0,00',item.salary)}<div class="field"><label for="funPayment">Forma de pagamento</label><select id="funPayment"><option value="pix">PIX</option><option value="transferencia">Transferência</option><option value="dinheiro">Dinheiro</option><option value="outro">Outro</option></select></div>${select('Status','funStatus',[{value:'ativo',label:'Ativo'},{value:'inativo',label:'Inativo'},{value:'afastado',label:'Afastado'},{value:'desligado',label:'Desligado'}],item.status||'ativo')}<div class="field full"><label for="funAddress">Endereço</label><input id="funAddress" value="${esc(item.address || '')}"></div><div class="field full"><label for="funNotes">Observações</label><textarea id="funNotes">${esc(item.notes || '')}</textarea></div></div>`, async () => {
      try { const payload={full_name:funNome.value.trim(),cpf:funCpf.value.trim(),birth_date:funBirth.value||null,phone:funTel.value.trim(),email:funEmail.value.trim(),job_title:funJob.value.trim(),hire_date:funHire.value||null,salary:funSalary.value?Number(funSalary.value):null,payment_method:funPayment.value,status:funStatus.value,address:funAddress.value.trim(),notes:funNotes.value.trim()}; if(!payload.full_name) throw new Error('Informe o nome.'); await api(item.id?`/api/employees/${item.id}`:'/api/employees',{method:item.id?'PATCH':'POST',body:JSON.stringify(payload)}); fecharModal?.(); toast(item.id?'Funcionário atualizado.':'Funcionário cadastrado.','ok'); await render(); } catch(e){toast(e.message,'error');}
    });
    const payment = document.getElementById('funPayment'); if (payment && item.payment_method) payment.value=item.payment_method;
  }

  function openCourseForm(item = {}) {
    openModal(item.id ? 'Editar curso' : 'Cadastrar curso', `<div class="form-grid">${field('Nome do curso','curNome','text','Nome do curso',item.name)}<div class="field"><label for="curMod">Modalidade</label><select id="curMod"><option value="Online">Online</option><option value="Semipresencial">Semipresencial</option><option value="Presencial">Presencial</option></select></div>${field('Duração / carga horária','curInfo','text','Ex.: 40 horas',item.duration)}${select('Status','curStatus',[{value:'ativo',label:'Ativo'},{value:'inativo',label:'Inativo'}],item.status||'ativo')}<div class="field full"><label for="curDesc">Descrição</label><textarea id="curDesc">${esc(item.description || '')}</textarea></div></div>`, async () => {
      try { const payload={name:curNome.value.trim(),modality:curMod.value,duration:curInfo.value.trim(),status:curStatus.value,description:curDesc.value.trim()}; if(!payload.name) throw new Error('Informe o nome do curso.'); await api(item.id?`/api/courses/${item.id}`:'/api/courses',{method:item.id?'PATCH':'POST',body:JSON.stringify(payload)}); fecharModal?.(); toast(item.id?'Curso atualizado.':'Curso cadastrado.','ok'); await render(); } catch(e){toast(e.message,'error');}
    });
    const modality=document.getElementById('curMod'); if(modality && item.modality) modality.value=item.modality;
  }

  async function openEnrollmentForm(item = {}) {
    try {
      const [s, c] = await Promise.all([api('/api/students'), api('/api/courses')]);
      if (!(s.results||[]).length) throw new Error('Cadastre um aluno antes da matrícula.');
      if (!(c.results||[]).length) throw new Error('Cadastre um curso antes da matrícula.');
      const body = `<div class="form-grid"><div class="field full"><label for="mAlunoId">Aluno</label><select id="mAlunoId">${s.results.map(x=>`<option value="${x.id}" ${Number(item.student_id)===Number(x.id)?'selected':''}>${esc(x.full_name)}</option>`).join('')}</select></div><div class="field full"><label for="mCursoId">Curso</label><select id="mCursoId">${c.results.map(x=>`<option value="${x.id}" ${Number(item.course_id)===Number(x.id)?'selected':''}>${esc(x.name)}</option>`).join('')}</select></div>${field('Número da matrícula','mNumero','text','Ex.: 2026-001',item.enrollment_number)}${field('Data de início','mInicio','date','',item.start_date)}${field('Data de término','mFim','date','',item.end_date)}${field('Valor da mensalidade','mMensal','number','0,00',item.monthly_amount)}${field('Total do curso','mTotal','number','0,00',item.total_course_amount)}${field('Total de mensalidades','mQtd','number','Ex.: 24',item.installment_count)}${field('Desconto (%)','mDesc','number','0',item.discount_percent)}${select('Status','mStatus',[{value:'pre_cadastro',label:'Pré-cadastro'},{value:'pendente',label:'Pendente'},{value:'ativa',label:'Ativa'},{value:'trancada',label:'Trancada'},{value:'concluida',label:'Concluída'},{value:'cancelada',label:'Cancelada'}],item.status||'ativa')}<div class="field full"><label for="mNotes">Observações</label><textarea id="mNotes">${esc(item.notes || '')}</textarea></div></div>`;
      openModal(item.id ? 'Editar matrícula' : 'Nova matrícula', body, async () => {
        try { const payload={student_id:Number(mAlunoId.value),course_id:Number(mCursoId.value),enrollment_number:mNumero.value.trim()||null,start_date:mInicio.value||null,end_date:mFim.value||null,monthly_amount:mMensal.value?Number(mMensal.value):null,total_course_amount:mTotal.value?Number(mTotal.value):null,installment_count:mQtd.value?Number(mQtd.value):null,discount_percent:mDesc.value?Number(mDesc.value):null,status:mStatus.value,notes:mNotes.value.trim()}; await api(item.id?`/api/enrollments/${item.id}`:'/api/enrollments',{method:item.id?'PATCH':'POST',body:JSON.stringify(payload)}); fecharModal?.(); toast(item.id?'Matrícula atualizada.':'Matrícula cadastrada.','ok'); await render(); } catch(e){toast(e.message,'error');}
      });
    } catch(e) { toast(e.message,'error'); }
  }

  async function openFinancialForm(item = {}) {
    try {
      const [s, e] = await Promise.all([api('/api/students'), api('/api/enrollments')]);
      if (!(s.results||[]).length) throw new Error('Cadastre um aluno antes do financeiro.');
      const body = `<div class="form-grid"><div class="field"><label for="finAluno">Aluno</label><select id="finAluno">${s.results.map(x=>`<option value="${x.id}" ${Number(item.student_id)===Number(x.id)?'selected':''}>${esc(x.full_name)}</option>`).join('')}</select></div><div class="field"><label for="finEnroll">Matrícula</label><select id="finEnroll"><option value="">Sem vínculo</option>${(e.results||[]).map(x=>`<option value="${x.id}" ${Number(item.enrollment_id)===Number(x.id)?'selected':''}>${esc(x.enrollment_number||('#'+x.id))} — ${esc(x.course_name)}</option>`).join('')}</select></div>${field('Referência','finRef','text','Ex.: 09/2026',item.reference)}${field('Descrição','finDesc','text','Mensalidade, matrícula...',item.description)}${field('Valor','finAmount','number','0,00',item.amount)}${field('Desconto','finDiscount','number','0,00',item.discount)}${field('Valor pago','finPaid','number','0,00',item.paid_amount)}${field('Vencimento','finDue','date','',item.due_date)}${select('Status','finStat',[{value:'pendente',label:'Pendente'},{value:'parcial',label:'Parcial'},{value:'pago',label:'Pago'},{value:'atrasado',label:'Atrasado'},{value:'cancelado',label:'Cancelado'}],item.status||'pendente')}<div class="field full"><label for="finNotes">Observações</label><textarea id="finNotes">${esc(item.notes || '')}</textarea></div></div>`;
      openModal(item.id?'Editar lançamento financeiro':'Lançamento financeiro',body,async()=>{
        try { const amount=Math.max(0,Number(finAmount.value||0)),discount=Math.max(0,Number(finDiscount.value||0)),paid=Math.max(0,Number(finPaid.value||0)); const payload={student_id:finAluno.value?Number(finAluno.value):null,enrollment_id:finEnroll.value?Number(finEnroll.value):null,reference:finRef.value.trim()||null,description:finDesc.value.trim(),amount,discount,paid_amount:paid,due_date:finDue.value||null,status:finStat.value,paid_at:finStat.value==='pago'?new Date().toISOString():null,notes:finNotes.value.trim()}; if(!payload.description) throw new Error('Informe a descrição.'); await api(item.id?`/api/financial/${item.id}`:'/api/financial',{method:item.id?'PATCH':'POST',body:JSON.stringify(payload)}); fecharModal?.(); toast(item.id?'Lançamento atualizado.':'Lançamento criado.','ok'); await render(); } catch(e){toast(e.message,'error');}
      });
    } catch(e){toast(e.message,'error');}
  }

  function openUserForm() {
    openModal('Criar usuário', `<div class="form-grid">${field('Nome completo','nuNome','text','Nome completo')}${field('Usuário','nuLogin','text','usuario')}${field('E-mail','nuEmail','email','email@exemplo.com')}${field('Senha inicial','nuPass','password','Mínimo de 8 caracteres')}${select('Perfil','nuRole',[{value:'administrador',label:'Administrador'},{value:'professor',label:'Professor'},{value:'aluno',label:'Aluno'}],'aluno')}</div>`, async () => {
      try { const payload={full_name:nuNome.value.trim(),username:nuLogin.value.trim(),email:nuEmail.value.trim()||null,password:nuPass.value,role:nuRole.value}; if(!payload.full_name||!payload.username||payload.password.length<8) throw new Error('Preencha nome, usuário e uma senha de pelo menos 8 caracteres.'); await api('/api/users',{method:'POST',body:JSON.stringify(payload)}); fecharModal?.(); toast('Usuário criado com sucesso.','ok'); await render(); } catch(e){toast(e.message,'error');}
    });
  }

  async function render() {
    const me = await getMe();
    if (!me?.user) return;
    window.__IECG_USER_ID__ = me.user.id;
    setHeader(me.user, true);
    buildRoleNav(me.user);
    if (me.user.role !== 'administrador') {
      document.querySelectorAll('[data-page="usuarios"],[data-page="financeiro"],[data-page="alunos"],[data-page="matriculas"],[data-page="funcionarios"]')?.forEach(() => {});
    }
    try { await loadAdminData(); } catch (e) { console.error(e); toast(e.message, 'error'); }
  }

  async function boot() {
    try {
      const health = await api('/api/health');
      if (health?.database === 'connected') document.documentElement.classList.add('iecg-d1-ready');
      const me = await getMe();
      if (!me?.user) return;
      if (typeof window.showApp === 'function') window.showApp();
      await render();
    } catch (e) { console.warn('D1 indisponível:', e); }
  }

  ready(() => {
    window.criarPrimeiroAdmin = async () => {
      try { await api('/api/auth/setup',{method:'POST',body:JSON.stringify({full_name:document.getElementById('setupName')?.value.trim(),username:document.getElementById('setupUser')?.value.trim(),password:document.getElementById('setupPass')?.value,password_confirmation:document.getElementById('setupPass2')?.value})}); toast('Administrador criado. Faça o login.','ok'); location.reload(); } catch(e){toast(e.message,'error');}
    };
    window.entrar = async () => {
      try { const login=document.getElementById('loginUser')?.value.trim(), password=document.getElementById('loginPass')?.value||''; if(!login||!password) throw new Error('Informe usuário e senha.'); const result=await api('/api/auth/login',{method:'POST',body:JSON.stringify({login,password})}); window.__IECG_USER_ID__=result.user?.id; if(typeof window.showApp==='function') window.showApp(); await render(); toast('Login realizado com sucesso.','ok'); } catch(e){toast(e.message,'error');}
    };
    window.sair = async () => { try { await api('/api/auth/logout',{method:'POST',body:'{}'}); } catch(_) {} location.reload(); };
    window.abrirAluno = () => openStudentForm();
    window.abrirProfessor = () => openTeacherForm();
    window.abrirFuncionario = () => openEmployeeForm();
    window.abrirCurso = () => openCourseForm();
    window.abrirMatricula = () => openEnrollmentForm();
    window.abrirFinanceiro = () => openFinancialForm();
    window.abrirUsuario = () => { if(currentRole()!=='administrador') return toast('Somente o administrador pode criar usuários.','error'); openUserForm(); };
    document.addEventListener('click', async e => {
      const edit = e.target.closest('[data-edit]');
      if (edit) return editEntity(edit.dataset.edit, edit.dataset.id);
      const del = e.target.closest('[data-del]');
      if (del) {
        if (!confirm('Excluir este registro?')) return;
        try { await api(`/api/${del.dataset.del}/${del.dataset.id}`,{method:'DELETE'}); toast('Registro excluído.','ok'); await render(); } catch(err){toast(err.message,'error');}
      }
      const toggle = e.target.closest('[data-toggle-user]');
      if (toggle) {
        try { await api(`/api/users/${toggle.dataset.toggleUser}`,{method:'PATCH',body:JSON.stringify({active:Number(toggle.dataset.active)?0:1})}); toast('Status do usuário atualizado.','ok'); await render(); } catch(err){toast(err.message,'error');}
      }
    });
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.querySelector('input[type="search"], input[placeholder*="Pesquisar" i]')?.focus();
      }
    });
    window.addEventListener('focus', () => { if(document.documentElement.classList.contains('iecg-d1-ready')) render(); });
    boot();
  });
})();
