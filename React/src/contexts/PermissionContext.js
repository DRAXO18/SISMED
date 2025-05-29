/* eslint-disable prettier/prettier */

import { createContext, useContext, useEffect, useState } from 'react'
const PermissionContext = createContext()


export const usePermissions = () => useContext(PermissionContext)

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  const fetchPermissions = async () => {
    
    setLoading(true)
    try {
      const res = await fetch('http://localhost:8000/api/user-permissions', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        credentials: 'include', // ⬅️ Importante para enviar la cookie
      })

      if (!res.ok) {
        if (res.status === 401) {
          // Silenciosamente ignoramos si no está autenticado
          setError(null)
          return
        }
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()

      if (data.permissions && Array.isArray(data.permissions)) {
        setPermissions(data.permissions)
      } else {
        console.warn('Unexpected response format:', data)
      }
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.debug('Error fetching permissions:', err.message)
      }
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPermissions()
  }, [])

  // Ya no usamos useEffect aquí directamente

  return (
    <PermissionContext.Provider value={{ permissions, loading, error, fetchPermissions }}>
      {children}
    </PermissionContext.Provider>
  )
}
