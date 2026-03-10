const API = 'http://localhost:5000/api';

document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const msg = document.getElementById('form-msg');

  const data = {
    nome: form.nome.value,
    crn: form.crn.value,
    estado: form.estado.value,
    cidade: form.cidade.value,
    especialidades: form.especialidades.value,
    modalidade: form.modalidade.value,
    valor_social: form.valor_social.value,
    contato_whatsapp: form.contato_whatsapp.value,
    contato_email: form.contato_email.value,
    contato_instagram: form.contato_instagram.value,
    descricao: form.descricao.value
  };

  try {
    const res = await fetch(`${API}/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();

    if (res.ok) {
      msg.textContent = '✅ ' + result.mensagem;
      msg.className = 'form-msg success';
      msg.style.display = 'block';
      form.reset();
    } else {
      msg.textContent = '❌ ' + (result.erro || 'Erro ao enviar.');
      msg.className = 'form-msg error';
      msg.style.display = 'block';
    }
  } catch {
    msg.textContent = '❌ Erro de conexão com o servidor.';
    msg.className = 'form-msg error';
    msg.style.display = 'block';
  }
});
