import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/'

const api = axios.create({
  baseURL: API_URL,
})

// Attach the login token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// If the token expired, get a new one with the refresh token and retry once
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const refresh = localStorage.getItem('refresh')
    const isTokenCall = original.url.includes('token/')

    if (error.response?.status === 401 && !original._retry && refresh && !isTokenCall) {
      original._retry = true
      try {
        const res = await axios.post(`${API_URL}token/refresh/`, { refresh })
        localStorage.setItem('access', res.data.access)
        original.headers.Authorization = `Bearer ${res.data.access}`
        return api(original)
      } catch {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
      }
    }
    return Promise.reject(error)
  },
)

export default api