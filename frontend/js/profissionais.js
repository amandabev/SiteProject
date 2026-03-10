const API = 'http://localhost:5000/api';

async function buscar() {
  const estado = document.getElementById('filtro-estado').value;
  const modalidade = document.getElementById('filtro-modalidade').value;
  const especialidade = document.getElementById('filtro-especialidade').value;

  let url = `${API}/profissionais?`;
  if (estado) url += `estado=${estado}&`;
  if (modalidade) url += `modalidade=${modalidade}&`;
  if (especialidade) url += `especialidade=${especialidade}&`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    renderCards(data);
  } catch (e) {
    document.getElementById('resultado').innerHTML = '<p>Erro ao carregar profissionais.</p>';
  }
}

function renderCards(profissionais) {
  const container = document.getElementById('resultado');
  const semResultado = document.getElementById('sem-resultado');

  if (!profissionais.length) {
    container.innerHTML = '';
    semResultado.style.display = 'block';
    return;
  }
  semResultado.style.display = 'none';

  container.innerHTML = profissionais.map(p => `
    <div class="card">
      <div class="card__name">${p.nome}</div>
      <div class="card__crn">${p.crn}</div>
      <div class="card__tags">
        ${p.especialidades.map(e => `<span class="tag">${e.trim()}</span>`).join('')}
        <span class="tag">${modalidadeLabel(p.modalidade)}</span>
      </div>
      <div class="card__location">📍 ${p.cidade} — ${p.estado}</div>
      ${p.valor_social ? `<div class="card__location">💚 ${p.valor_social}</div>` : ''}
      <a href="perfil.html?id=${p.id}" class="btn btn--secondary" style="width:100%;text-align:center;margin-top:8px">Ver perfil</a>
    </div>
  `).join('');
}

function modalidadeLabel(m) {
  return { online: '🖥️ Online', presencial: '🏥 Presencial', ambos: '🌐 Presencial/Online' }[m] || m;
}

buscar();
