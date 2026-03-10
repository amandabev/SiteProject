/* =============================================
   PROFILE.JS - Pagina de perfil do nutricionista
   ============================================= */

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('profileContent');
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    container.innerHTML = '<p>Perfil nao encontrado.</p>';
    return;
  }

  function getInitials(name) {
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  }

  function modalityLabel(m) {
    return { online: 'Online', presencial: 'Presencial', ambos: 'Online e Presencial' }[m] || m;
  }

  try {
    const n = await API.getNutritionist(id);
    document.title = `${n.name} - NutriAcesso`;

    container.innerHTML = `
      <div class="profile-card">
        <div class="profile-avatar">
          ${n.photo_url ? `<img src="${n.photo_url}" alt="${n.name}" />` : getInitials(n.name)}
        </div>
        <div>
          <h1 class="profile-name">${n.name}</h1>
          <p class="profile-crn">${n.crn} &bull; ${n.city} - ${n.state}</p>
          <div class="profile-tags">
            <span class="tag tag-modality">${modalityLabel(n.modality)}</span>
            ${n.specialties.map(s => `<span class="tag">${s}</span>`).join('')}
          </div>
          ${n.social_price ? `<div class="price-badge">&#128181; ${n.social_price}</div>` : ''}
        </div>

        ${n.bio ? `
        <div class="profile-section">
          <h3>Sobre</h3>
          <p>${n.bio}</p>
        </div>` : ''}

        <div class="profile-section">
          <h3>Contato</h3>
          <div class="contact-buttons">
            ${n.whatsapp ? `<a href="https://wa.me/55${n.whatsapp.replace(/\D/g,'')}" target="_blank" class="btn btn-primary">&#128222; WhatsApp</a>` : ''}
            ${n.email    ? `<a href="mailto:${n.email}" class="btn btn-outline">&#9993; E-mail</a>` : ''}
            ${n.instagram ? `<a href="https://instagram.com/${n.instagram.replace('@','')}" target="_blank" class="btn btn-outline">Instagram</a>` : ''}
          </div>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = '<p>Erro ao carregar perfil. Tente novamente.</p>';
  }
});
