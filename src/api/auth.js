const API_BASE = (import.meta.env.VITE_API_URL || '/api/v1').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}/auth${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(payload.message || 'The request could not be completed.');
    error.status = response.status;
    error.details = payload.details;
    throw error;
  }

  return payload;
}

function post(path, data) {
  return request(path, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export const registerTraveler = (data) => post('/register/traveler', data);
export const registerGuide = (data) => post('/register/guide', data);
export const login = (data) => post('/login', data);
export const getCurrentUser = () => request('/me');
export const getGuides = () => request('/guides');
export const logout = () => post('/logout', {});
