/* eslint-disable prettier/prettier */

import React from 'react'
import { useState, useEffect } from 'react'

import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user', {
          method: 'GET',
          credentials: 'include', // 👈 Importante para enviar cookies
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })

        if (response.ok) {
          const data = await response.json()
          setUserData(data)
        } else {
          console.warn('Usuario no autenticado')
          setUserData(null)
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleLogOut = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        credentials: 'include', // 👈 Enviar cookie al backend
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        // Si tu backend borra la cookie, solo rediriges
        window.location.href = '/'
        Swal.fire('Sesión cerrada', 'Saliste correctamente', 'success')
      } else {
        const data = await response.json()
        console.error('Error en logout:', data)
      }
    } catch (error) {
      console.error('Error de conexión al cerrar sesión:', error)
    }
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* Sección de información del usuario */}
        <CDropdownHeader className="bg-body-secondary fw-semibold py-2">
          {userData ? (
            <div className="text-center">
              <div className="fw-bold">
                {userData.nombre} {userData.apellido_paterno} {userData.apellido_materno}
              </div>
              <div className="small text-muted">{userData.email}</div>
            </div>
          ) : (
            'Cuenta'
          )}
        </CDropdownHeader>

        {/* Sección de notificaciones */}
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Notificaciones
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>

        <CDropdownDivider />

        {/* Sección de configuración */}
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">
          Configuración
        </CDropdownHeader>

        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Perfil
        </CDropdownItem>

        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Ajustes
        </CDropdownItem>

        <CDropdownDivider />

        {/* Opciones de seguridad */}
        <CDropdownItem href="#">
          <CIcon icon={cilLockLocked} className="me-2" />
          Bloquear Pantalla
        </CDropdownItem>

        <CDropdownItem onClick={handleLogOut} style={{ cursor: 'pointer' }}>
          <CIcon icon={cilAccountLogout} className="me-2 text-danger" />
          <span className="text-danger">Cerrar Sesión</span>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
