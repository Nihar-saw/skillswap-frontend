import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillswap_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let refreshQueue = []

const processQueue = (error, token = null) => {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  refreshQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    if (error.response?.status === 401 && !original._retry) {
      const refreshToken = localStorage.getItem('skillswap_refresh')
      if (!refreshToken) {
        localStorage.removeItem('skillswap_token')
        localStorage.removeItem('skillswap_refresh')
        localStorage.removeItem('skillswap_user')
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject })
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`
          return api(original)
        })
      }

      original._retry = true
      isRefreshing = true

      try {
        const { data } = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken })
        localStorage.setItem('skillswap_token', data.token)
        localStorage.setItem('skillswap_refresh', data.refreshToken)
        processQueue(null, data.token)
        original.headers.Authorization = `Bearer ${data.token}`
        return api(original)
      } catch (refreshError) {
        processQueue(refreshError, null)
        localStorage.removeItem('skillswap_token')
        localStorage.removeItem('skillswap_refresh')
        localStorage.removeItem('skillswap_user')
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
