import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '../api'

const AuthContext = createContext(null)

const STORAGE_KEYS = {
  token: 'skillswap_token',
  refresh: 'skillswap_refresh',
  user: 'skillswap_user',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.user)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  const persistSession = useCallback((data) => {
    localStorage.setItem(STORAGE_KEYS.token, data.token)
    localStorage.setItem(STORAGE_KEYS.refresh, data.refreshToken)
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role,
      skills: data.skills,
      trustScore: data.trustScore,
    }
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData))
    setUser(userData)
    return userData
  }, [])

  const clearSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.token)
    localStorage.removeItem(STORAGE_KEYS.refresh)
    localStorage.removeItem(STORAGE_KEYS.user)
    setUser(null)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.token)
    if (!token) {
      setLoading(false)
      return
    }

    authApi
      .me()
      .then(({ data }) => {
        if (data.user) {
          const userData = {
            _id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            skills: data.user.skills,
            trustScore: data.user.trustScore,
          }
          localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(userData))
          setUser(userData)
        }
      })
      .catch(() => clearSession())
      .finally(() => setLoading(false))
  }, [clearSession])

  const login = async (email, password) => {
    const { data } = await authApi.login(email, password)
    if (!data.success) throw new Error(data.message || 'Login failed')
    return persistSession(data)
  }

  const register = async (payload) => {
    const { data } = await authApi.register(payload)
    if (!data.success && !data._id) throw new Error(data.message || 'Registration failed')
    return persistSession(data)
  }

  const logout = () => clearSession()

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
