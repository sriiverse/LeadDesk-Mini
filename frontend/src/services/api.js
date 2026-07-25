import axios from 'axios'

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Render free tier can take 30–60s to wake from sleep
  timeout: 60000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('leaddesk_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthRoute = error.config?.url?.includes('/api/login')
      if (!isAuthRoute) {
        localStorage.removeItem('leaddesk_token')
        localStorage.removeItem('leaddesk_user')
        if (window.location.pathname.startsWith('/admin')) {
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(error)
  },
)

export const authApi = {
  login: (payload) => api.post('/api/login', payload),
  me: () => api.get('/api/me'),
}

export const leadsApi = {
  create: (payload) => api.post('/api/leads', payload),
  list: (params) => api.get('/api/leads', { params }),
  updateStatus: (id, status) => api.patch(`/api/leads/${id}`, { status }),
  stats: () => api.get('/api/leads/stats'),
}

export default api
