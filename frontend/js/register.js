/* =============================================
   REGISTER.JS - Formulario de cadastro
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('registerForm');
  const successMsg = document.getElementById('successMsg');
  const errorMsg   = document.getElementById('errorMsg');
  const submitBtn  = document.getElementById('submitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    const specialties = [...form.querySelectorAll('input[name="specialties"]:checked')].map(cb => cb.value);

    const payload = {
      name:         form.name.value.trim(),
      crn:          form.crn.value.trim(),
      email:        form.email.value.trim(),
      whatsapp:     form.whatsapp.value.trim(),
      instagram:    form.instagram.value.trim(),
      state:        form.state.value,
      city:         form.city.value.trim(),
      modality:     form.modality.value,
      specialties,
      social_price: form.social_price.value.trim(),
      bio:          form.bio.value.trim(),
    };

    try {
      await API.register(payload);
      successMsg.style.display = 'block';
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      errorMsg.textContent = err.message;
      errorMsg.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar cadastro';
    }
  });
});
