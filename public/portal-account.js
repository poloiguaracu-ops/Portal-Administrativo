(() => {
  'use strict';
  if (window.__IECG_ACCOUNT_V1__) return;
  window.__IECG_ACCOUNT_V1__ = true;
  const ready = fn => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn, {once:true}) : fn();
  const api = async (path, options={}) => { const r=await fetch(path,{credentials:'same-origin',...options,headers:{'Content-Type':'application/json',...(options.headers||{})}}); let d=null; try{d=await r.json()}catch(_){} if(!r.ok)throw new Error(d?.error||`Falha HTTP ${r.status}`); return d; };
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const toast=(m,k='info')=>window.iecgToast?window.iecgToast(m,k==='error'?'Atenção':k==='ok'?'Tudo certo':'Portal Administrativo'):alert(m);
  const field=(label,id,type='password',placeholder='')=>`<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type}" placeholder="${placeholder}" autocomplete="${type==='password'?'new-password':'off'}"></div>`;
  ready(()=>{
    const app=document.querySelector('#app,.portal'); if(!app)return;
    const addButton=()=>{
      const panel=[...document.querySelectorAll('.panel')].find(p=>/Segurança/i.test(p.textContent||''));
      if(panel&&!panel.querySelector('[data-change-password]')){
        const b=document.createElement('button');b.type='button';b.className='btn ghost';b.dataset.changePassword='1';b.textContent='Alterar minha senha';b.style.marginTop='12px';panel.appendChild(b);
      }
      const topActions=document.querySelector('.top-actions');
      if(topActions&&!topActions.querySelector('[data-refresh-d1]')){
        const b=document.createElement('button');b.type='button';b.className='btn ghost';b.dataset.refreshD1='1';b.textContent='Atualizar';b.title='Atualizar dados do banco';topActions.insertBefore(b,topActions.firstChild);
      }
    };
    const open=()=>{
      if(typeof window.abrirModal!=='function')return toast('Janela indisponível nesta tela.','error');
      window.abrirModal('Alterar minha senha',`${field('Senha atual','accCurrent','password','Digite sua senha atual')}${field('Nova senha','accNew','password','Mínimo de 8 caracteres')}${field('Confirmar nova senha','accConfirm','password','Repita a nova senha')}<div class="section-note"><strong>Dica:</strong> use uma senha exclusiva para o portal administrativo.</div><div class="modal-foot"><button type="button" class="btn secondary" id="accCancel">Cancelar</button><button type="button" class="btn primary" id="accSave">Atualizar senha</button></div>`);
      document.getElementById('accCancel')?.addEventListener('click',()=>window.fecharModal?.());
      document.getElementById('accSave')?.addEventListener('click',async()=>{const a=document.getElementById('accCurrent')?.value||'',n=document.getElementById('accNew')?.value||'',c=document.getElementById('accConfirm')?.value||'';if(n.length<8)return toast('A nova senha precisa ter pelo menos 8 caracteres.','error');if(n!==c)return toast('As novas senhas não coincidem.','error');try{await api('/api/auth/change-password',{method:'POST',body:JSON.stringify({current_password:a,new_password:n})});window.fecharModal?.();toast('Senha alterada com sucesso.','ok');}catch(e){toast(e.message,'error');}});
    };
    document.addEventListener('click',e=>{if(e.target.closest('[data-change-password]'))open();if(e.target.closest('[data-refresh-d1]'))window.__IECG_D1_REFRESH__?.();});
    window.__IECG_D1_REFRESH__=async()=>{try{if(typeof window.__IECG_D1_RENDER__==='function')await window.__IECG_D1_RENDER__();else location.reload();toast('Dados atualizados.','ok');}catch(e){toast(e.message,'error');}};
    addButton();
    new MutationObserver(addButton).observe(document.body,{childList:true,subtree:true});
  });
})();
