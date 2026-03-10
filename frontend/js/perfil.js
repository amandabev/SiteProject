const API = 'http://localhost:5000/api';

async function carregarPerfil() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) { window.location = 'profissionais.html'; return; }

  try {
    const res = await fetch(`${API}/profissionais/${id}`);
    if (!res.ok) throw new Error();
    const p = await res.json();
    renderPerfil(p);
  } catch {
    document.getElementById('perfil-conteudo').innerHTML = '<p>Profissional não encontrado.</p>';
  }
}

function renderPerfil(p) {
  const el = document.getElementById('perfil-conteudo');
  el.innerHTML = `
    <h1>${p.nome}</h1>
    <div class="crn">${p.crn}</div>
    <div class="card__tags" style="margin: 12px 0">
      ${p.especialidades.map(e => `<span class="tag">${e.trim()}</span>`).join('')}
      <span class="tag">${modalidadeLabel(p.modalidade)}</span>
    </div>
    <p style="color:var(--text-mid)">📍 ${p.cidade} — ${p.estado}</p>
    ${p.valor_social ? `<p style="color:var(--green-primary);font-weight:600;margin-top:8px">💚 Valor social: ${p.valor_social}</p>` : ''}
    ${p.descricao ? `<p class="descricao">${p.descricao}</p>` : ''}
    <div class="contact-buttons">
      ${p.contato_whatsapp ? `<a href="https://wa.me/55${p.contato_whatsapp.replace(/\D/g,'')}" target="_blank" class="btn btn--primary">💬 WhatsApp</a>` : ''}
      ${p.contato_email ? `<a href="mailto:${p.contato_email}" class="btn btn--secondary">📧 E-mail</a>` : ''}
      ${p.contato_instagram ? `<a href="https://instagram.com/${p.contato_instagram.replace('@','')}" target="_blank" class="btn btn--secondary">📷 Instagram</a>` : ''}
    </div>
  `;
  document.title = `${p.nome} | NutriAcesso`;
}

function modalidadeLabel(m) {
  return { online: '🖥️ Online', presencial: '🏥 Presencial', ambos: '🌐 Presencial/Online' }[m] || m;
}

carregarPerfil();
