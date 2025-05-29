/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { CButton, CForm, CFormInput, CFormLabel, CAlert } from '@coreui/react';
import Dashboard from '../../dashboard/Dashboard';

const CreateRole = ({ onRoleCreated }) => {
  const [roleName, setRoleName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:8000';

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/roles-accesos/create-role`, {
        method: 'POST',
        credentials: 'include',
        headers: getHeaders(),
        body: JSON.stringify({ name: roleName })
      });

      const data = await response.json();

      if (response.ok) {
        // Llamar al callback con el nuevo rol
        if (onRoleCreated && data.data) {
          onRoleCreated(data.data);
        }
        setRoleName('');
      } else {
        setError(data.message || 'Error al crear el rol');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CForm onSubmit={handleSubmit}>
      {error && (
        <CAlert color="danger" className="mb-3">
          {error}
        </CAlert>
      )}
      
      <div className="mb-3">
        <CFormLabel htmlFor="roleName">Nombre del Rol</CFormLabel>
        <CFormInput
          type="text"
          id="roleName"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          placeholder="Ingrese el nombre del rol"
          required
        />
      </div>
      
      <CButton 
        type="submit" 
        color="primary"
        disabled={loading || !roleName.trim()}
      >
        {loading ? 'Creando...' : 'Crear Rol'}
      </CButton>
    </CForm>
  );
};

export default CreateRole;