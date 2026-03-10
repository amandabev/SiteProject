/* =============================================
   API.JS - Comunicacao com o backend Flask
   ============================================= */

const API_BASE = 'http://localhost:5000/api';

async function apiFetch(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    ...options
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro na requisicao');
  return data;
}

const API = {
  // Publico
  getNutritionists: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch('/nutritionists/?' + qs);
  },
  getNutritionist: (id) => apiFetch(`/nutritionists/${id}`),
  register: (data) => apiFetch('/nutritionists/register', { method: 'POST', body: JSON.stringify(data) }),

  // Admin
  adminLogin:   (u, p) => apiFetch('/admin/login',  { method: 'POST', body: JSON.stringify({ username: u, password: p }) }),
  adminLogout:  ()     => apiFetch('/admin/logout', { method: 'POST' }),
  getPending:   ()     => apiFetch('/admin/pending'),
  getAll:       ()     => apiFetch('/admin/all'),
  approve:      (id)   => apiFetch(`/admin/approve/${id}`, { method: 'POST' }),
  reject:       (id)   => apiFetch(`/admin/reject/${id}`,  { method: 'POST' }),
  deleteN:      (id)   => apiFetch(`/admin/delete/${id}`,  { method: 'DELETE' }),
};
