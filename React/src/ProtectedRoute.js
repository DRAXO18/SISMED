/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

const ProtectedRoute = ({ children }) => {
  const [authChecked, setAuthChecked] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/user', {
          credentials: 'include',
          headers: {
            Accept: 'application/json',
          },
        })

        if (res.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (err) {
        setIsAuthenticated(false)
      } finally {
        setAuthChecked(true)
      }
    }

    checkAuth()
  }, [])

  if (!authChecked) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100px' }}
      >
        <CSpinner color="primary" />
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/" replace />
}

export default ProtectedRoute
