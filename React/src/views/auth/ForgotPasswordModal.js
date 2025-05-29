/* eslint-disable prettier/prettier */

import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CForm,
} from '@coreui/react'
import Swal from 'sweetalert2'

const ForgotPasswordModal = ({ visible, onClose }) => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/api/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error en la solicitud')
      }

      // Cierra el modal ANTES de mostrar SweetAlert
      if (typeof onClose === 'function') {
        onClose() // ← Esto cierra el modal
      }

      Swal.fire({
        icon: 'success',
        title: 'Enlace enviado',
        text: data.message,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      })
      console.error('Error completo:', error)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Recuperar Contraseña</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleSubmit}>
        <CModalBody>
          <p>Ingresa tu correo electrónico para recibir un enlace de recuperación.</p>
          <CFormInput
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </CModalBody>
        <CModalFooter>
          
          <CButton color="primary" type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar Enlace'}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default ForgotPasswordModal
