import { Link } from 'react-router-dom'
import { usePermissions } from '../../contexts/PermissionContext'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ForgotPasswordModal from './ForgotPasswordModal'

import fondoLogin from 'src/assets/images/fondoLogin2.jpg'
import logoDevilopers from 'src/assets/images/deviloperslogo.webp'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const [email, setEmail] = useState('')
  const { fetchPermissions } = usePermissions()
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)
  const [loginError, setLoginError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError('')

    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    setValidated(true)

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include', // ⬅️ Importante: incluye cookies en la petición
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        // Ya NO usamos localStorage ni el token manualmente
        await fetchPermissions()
        Swal.fire('Bienvenido', 'Has iniciado sesión correctamente', 'success')
        navigate('/dashboard')
      } else {
        if (data.blocked) {
          Swal.fire({
            icon: 'error',
            title: 'Cuenta bloqueada',
            text: data.message,
          })
        } else {
          setLoginError(data.message)

          if (data.attempts_left === 1) {
            Swal.fire({
              icon: 'warning',
              title: 'Atención',
              text: data.message,
              confirmButtonText: 'Entendido',
            })
          }
        }
      }
    } catch (error) {
      setLoginError('Error de conexión. Intente nuevamente.')
      console.error('Error:', error)
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url(${fondoLogin})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-vh-100 d-flex flex-row align-items-center"
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4" style={{ backgroundColor: '#4d161699' }}>
                <CCardBody>
                  <CForm
                    className="needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <h1>Iniciar Sesión</h1>
                    <p className="text-body-secondary">Ingrese sus credenciales</p>

                    {loginError && (
                      <div className="alert alert-danger" role="alert">
                        {loginError}
                      </div>
                    )}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                        // feedbackInvalid="Por favor ingrese un correo electrónico válido"
                      />
                      <CFormFeedback invalid>
                        Por favor ingrese un correo electrónico válido
                      </CFormFeedback>
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        // feedbackInvalid="Por favor ingrese su contraseña"
                      />
                      <CFormFeedback invalid>Por favor ingrese su contraseña</CFormFeedback>
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="dark" type="submit" className="px-4">
                          Ingresar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <CButton className="px-0" onClick={() => setShowForgotPasswordModal(true)}>
                          ¿Olvidó su contraseña?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg py-5"
                style={{ width: '44%', backgroundColor: '#00000099' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <img
                      src={logoDevilopers}
                      height={65}
                      alt="Logo"
                      style={{ paddingBottom: '5px' }}
                    />
                    <p>SISMED: Sistema dedicado al sector de salud y belleza.</p>
                    <Link to="https://devilopers.org.pe/" target="_blank">
                      <CButton color="dark" className="mt-3" active tabIndex={-1}>
                        ¡Visítanos!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ForgotPasswordModal
        visible={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />
    </div>
  )
}

export default Login
