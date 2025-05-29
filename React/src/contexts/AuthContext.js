/* eslint-disable prettier/prettier */

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/user', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include', // importante si usas cookies
      })

      if (!res.ok) {
        setUser(null)
        return
      }

      const data = await res.json()
      setUser(data.user || null)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, fetchUser }}>
      {children}
    </AuthContext.Provider>
  )
}
