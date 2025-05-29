/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CForm, CFormInput, CButton, CCard, CCardBody, CCardHeader } from '@coreui/react';
import Swal from 'sweetalert2';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== passwordConfirmation) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          email,
          password,
          password_confirmation: passwordConfirmation
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire('Éxito', data.message, 'success');
        navigate('/login');
      } else {
        Swal.fire('Error', data.message || 'Error al restablecer contraseña', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'Error de conexión', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center min-vh-100">
      <CCard className="mx-auto" style={{ width: '400px' }}>
        <CCardHeader className="text-center">
          <h4>Restablecer Contraseña</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3"
              required
            />
            <CFormInput
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-3"
              required
              minLength="8"
            />
            <CFormInput
              type="password"
              placeholder="Confirmar contraseña"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="mb-3"
              required
              minLength="8"
            />
            <CButton color="primary" type="submit" className="w-100" disabled={isLoading}>
              {isLoading ? 'Procesando...' : 'Restablecer Contraseña'}
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default ResetPasswordPage;