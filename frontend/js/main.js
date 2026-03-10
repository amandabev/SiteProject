/* =============================================
   MAIN.JS - Comportamentos globais
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Menu mobile toggle
  const toggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  }
});
