import React from 'react'
import { Link } from 'react-router-dom'
import fondoLogin from 'src/assets/images/fondoLogin.jpg'

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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logoDevilopers from 'src/assets/images/deviloperslogo.webp'


const Login = () => {
  return (
    <div style={{ backgroundImage: `url(${fondoLogin})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="min-vh-100 d-flex flex-row align-items-center"> 
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4 " style={{ backgroundColor: '#4d161699' }}>
                <CCardBody>
                  <CForm>
                    <h1>Iniciar Sesión</h1>
                    <p className="text-body-secondary">Ingrese sus credenciales</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="dark" className="px-4">
                          Ingresar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          ¿Olvidó su contraseña?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg py-5"  style={{ width: '44%' }, {backgroundColor: '#00000099'}}>
                <CCardBody className="text-center">
                  <div>
                    <img className="flex items-center justify-center" src={logoDevilopers} height={65} style={{ 'paddingBottom': "5px" }} />
                    <p>
                      SISMED: Sistema dedicado al sector de salud y belleza.
                    </p>
                    <Link to="https://devilopers.org.pe/" target='_blank'>
                      <CButton color="dark" className="mt-3" active tabIndex={-1}>
                        Visitanos!!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
