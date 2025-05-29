/* eslint-disable prettier/prettier */

// import React from 'react'
import { CButton, CCard, CCardBody, CContainer } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const NoAccess = () => {
  const navigate = useNavigate()

  return (
    <CContainer
      className="d-flex justify-content-center align-items-start mt-5"
      style={{ minHeight: '70vh' }}
    >
      <CCard className="shadow-lg border-0" style={{ maxWidth: '480px', width: '100%' }}>
        <CCardBody className="text-center p-5">
          <CIcon icon={cilLockLocked} size="4xl" className="mb-4 text-danger" />
          <h1 className="display-5 fw-bold mb-3">Acceso Denegado</h1>
          <p className="lead text-muted mb-4">
            Lo sentimos, no tienes los permisos necesarios para acceder a esta página. Puede volver
            a <Link to="/">Login</Link>
          </p>
          <CButton
            color="secondary"
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="px-4"
          >
            Volver al Inicio
          </CButton>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default NoAccess
