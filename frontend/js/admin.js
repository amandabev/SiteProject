/* =============================================
   ADMIN.JS - Painel administrativo
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('loginScreen');
  const adminPanel  = document.getElementById('adminPanel');

  // --- LOGIN ---
  document.getElementById('btnLogin').addEventListener('click', async () => {
    const u = document.getElementById('adminUser').value;
    const p = document.getElementById('adminPass').value;
    const errEl = document.getElementById('loginError');
    try {
      await API.adminLogin(u, p);
      loginScreen.style.display = 'none';
      adminPanel.style.display  = 'block';
      loadPending();
    } catch (err) {
      errEl.textContent = err.message;
      errEl.style.display = 'block';
    }
  });

  document.getElementById('btnLogout').addEventListener('click', async () => {
    await API.adminLogout();
    location.reload();
  });

  // --- TABS ---
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
      const tab = btn.dataset.tab;
      document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1)).style.display = 'block';
      if (tab === 'all') loadAll();
    });
  });

  // --- PENDING ---
  async function loadPending() {
    const list = document.getElementById('pendingList');
    list.innerHTML = '<div class="loading">Carregando...</div>';
    try {
      const data = await API.getPending();
      document.getElementById('pendingCount').textContent = data.length;
      if (data.length === 0) { list.innerHTML = '<div class="empty">Nenhum cadastro pendente.</div>'; return; }
      list.innerHTML = data.map(n => adminCard(n, true)).join('');
      attachActions(list);
    } catch { list.innerHTML = '<div class="empty">Erro ao carregar.</div>'; }
  }

  // --- ALL ---
  async function loadAll() {
    const list = document.getElementById('allList');
    list.innerHTML = '<div class="loading">Carregando...</div>';
    try {
      const data = await API.getAll();
      if (data.length === 0) { list.innerHTML = '<div class="empty">Nenhum cadastro encontrado.</div>'; return; }
      list.innerHTML = data.map(n => adminCard(n, false)).join('');
      attachActions(list);
    } catch { list.innerHTML = '<div class="empty">Erro ao carregar.</div>'; }
  }

  function adminCard(n, showActions) {
    const statusMap = { approved: 'Aprovado', pending: 'Pendente', rejected: 'Recusado' };
    return `
      <div class="admin-card" data-id="${n.id}">
        <div class="admin-card-info">
          <strong>${n.name}</strong>
          <span>${n.crn} &bull; ${n.email} &bull; ${n.city}/${n.state}</span>
        </div>
        <div class="admin-card-actions">
          <span class="status-badge status-${n.status}">${statusMap[n.status] || n.status}</span>
          ${showActions && n.status === 'pending' ? `
            <button class="btn btn-primary btn-approve" data-id="${n.id}">Aprovar</button>
            <button class="btn btn-danger btn-reject"  data-id="${n.id}">Recusar</button>
          ` : ''}
          <button class="btn btn-outline btn-delete" data-id="${n.id}">Remover</button>
        </div>
      </div>
    `;
  }

  function attachActions(container) {
    container.querySelectorAll('.btn-approve').forEach(btn => {
      btn.addEventListener('click', async () => {
        await API.approve(btn.dataset.id);
        loadPending();
      });
    });
    container.querySelectorAll('.btn-reject').forEach(btn => {
      btn.addEventListener('click', async () => {
        await API.reject(btn.dataset.id);
        loadPending();
      });
    });
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async () => {
        if (confirm('Remover este profissional?')) {
          await API.deleteN(btn.dataset.id);
          loadPending();
          loadAll();
        }
      });
    });
  }
});
