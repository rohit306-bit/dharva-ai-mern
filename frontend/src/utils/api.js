import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('dharva_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// ═══════════ API ENDPOINTS ═══════════

export const productAPI = {
  getAll: () => API.get('/products'),
  getBySlug: (slug) => API.get(`/products/${slug}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
};

export const launchAPI = {
  getAll: () => API.get('/launches'),
  getById: (id) => API.get(`/launches/${id}`),
  create: (data) => API.post('/launches', data),
  update: (id, data) => API.put(`/launches/${id}`, data),
  delete: (id) => API.delete(`/launches/${id}`),
};

export const docAPI = {
  getAll: (category) => API.get(`/docs${category ? `?category=${category}` : ''}`),
  getById: (id) => API.get(`/docs/${id}`),
};

export const pricingAPI = {
  getAll: () => API.get('/pricing'),
};

export const contactAPI = {
  submit: (data) => API.post('/contact', data),
  joinWaitlist: (data) => API.post('/contact/waitlist', data),
  newsletter: (email) => API.post('/contact/newsletter', { email }),
};

export const healthAPI = {
  check: () => API.get('/health'),
};

// ═══════════ SAAS PLATFORM APIs ═══════════

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (email, password) => API.post('/auth/login', { email, password }),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
};

export const aiSystemAPI = {
  getAll: (params) => API.get('/ai-systems', { params }),
  getById: (id) => API.get(`/ai-systems/${id}`),
  create: (data) => API.post('/ai-systems', data),
  update: (id, data) => API.put(`/ai-systems/${id}`, data),
  delete: (id) => API.delete(`/ai-systems/${id}`),
};

export const impactAPI = {
  calculate: (data) => API.post('/impact/calculate', data),
  getReports: (params) => API.get('/impact/reports', { params }),
  getDashboard: () => API.get('/impact/dashboard'),
};

export const complianceAPI = {
  generate: (data) => API.post('/compliance/generate', data),
  getDocuments: (params) => API.get('/compliance/documents', { params }),
  updateStatus: (id, status) => API.patch(`/compliance/documents/${id}/status`, { status }),
};

export const auditAPI = {
  getLogs: (params) => API.get('/audit/logs', { params }),
  getStats: () => API.get('/audit/stats'),
  verifyIntegrity: (id) => API.get(`/audit/verify/${id}`),
};

export const regulatoryAPI = {
  getFrameworks: (params) => API.get('/regulatory', { params }),
};

export default API;
