import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

const TOKEN_KEY = 'leaddesk_token'
const USER_KEY = 'leaddesk_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [loading, setLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)))

  const persist = useCallback((nextToken, nextUser) => {
    setToken(nextToken)
    setUser(nextUser)
    if (nextToken) localStorage.setItem(TOKEN_KEY, nextToken)
    else localStorage.removeItem(TOKEN_KEY)
    if (nextUser) localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
    else localStorage.removeItem(USER_KEY)
  }, [])

  const logout = useCallback(() => {
    persist(null, null)
  }, [persist])

  const login = useCallback(
    async (email, password) => {
      const { data } = await authApi.login({ email, password })
      persist(data.access_token, data.user)
      return data
    },
    [persist],
  )

  useEffect(() => {
    let active = true

    async function bootstrap() {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const { data } = await authApi.me()
        if (active) {
          setUser(data.user)
          localStorage.setItem(USER_KEY, JSON.stringify(data.user))
        }
      } catch {
        if (active) persist(null, null)
      } finally {
        if (active) setLoading(false)
      }
    }

    bootstrap()
    return () => {
      active = false
    }
  }, [token, persist])

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
    }),
    [user, token, loading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
