/* =============================================
   DIRECTORY.JS - Listagem de nutricionistas
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const grid       = document.getElementById('cardsGrid');
  const loadingMsg = document.getElementById('loadingMsg');
  const emptyMsg   = document.getElementById('emptyMsg');
  const btnFilter  = document.getElementById('btnFilter');
  const btnClear   = document.getElementById('btnClear');

  function getInitials(name) {
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  }

  function modalityLabel(m) {
    return { online: 'Online', presencial: 'Presencial', ambos: 'Online e Presencial' }[m] || m;
  }

  function renderCards(list) {
    grid.innerHTML = '';
    loadingMsg.style.display = 'none';

    if (list.length === 0) {
      emptyMsg.style.display = 'block';
      return;
    }
    emptyMsg.style.display = 'none';

    list.forEach(n => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-header">
          <div class="card-avatar">
            ${n.photo_url ? `<img src="${n.photo_url}" alt="${n.name}" />` : getInitials(n.name)}
          </div>
          <div>
            <div class="card-name">${n.name}</div>
            <div class="card-crn">${n.crn}</div>
          </div>
        </div>
        <div class="card-location">&#128205; ${n.city} - ${n.state}</div>
        <div class="card-tags">
          <span class="tag tag-modality">${modalityLabel(n.modality)}</span>
          ${n.specialties.slice(0,2).map(s => `<span class="tag">${s}</span>`).join('')}
        </div>
        ${n.social_price ? `<div class="card-price">&#128181; ${n.social_price}</div>` : ''}
        <div class="card-cta">
          <a href="profile.html?id=${n.id}" class="btn btn-primary" style="width:100%">Ver perfil</a>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  async function loadNutritionists(params = {}) {
    loadingMsg.style.display = 'block';
    emptyMsg.style.display = 'none';
    grid.innerHTML = '';
    try {
      const data = await API.getNutritionists(params);
      renderCards(data);
    } catch (err) {
      loadingMsg.textContent = 'Erro ao carregar profissionais. Verifique se o servidor está rodando.';
    }
  }

  btnFilter.addEventListener('click', () => {
    const params = {};
    const state     = document.getElementById('filterState').value;
    const modality  = document.getElementById('filterModality').value;
    const specialty = document.getElementById('filterSpecialty').value;
    if (state)     params.state     = state;
    if (modality)  params.modality  = modality;
    if (specialty) params.specialty = specialty;
    loadNutritionists(params);
  });

  btnClear.addEventListener('click', () => {
    document.getElementById('filterState').value     = '';
    document.getElementById('filterModality').value  = '';
    document.getElementById('filterSpecialty').value = '';
    loadNutritionists();
  });

  loadNutritionists();
});
