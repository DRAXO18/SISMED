/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { CButton, CForm, CFormInput, CFormLabel, CAlert } from '@coreui/react';

const CreatePermission = ({ onPermissionCreated }) => {
  const [permissionName, setPermissionName] = useState('');
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
      const response = await fetch(`${API_BASE_URL}/api/roles-accesos/create-permission`, {
        method: 'POST',
        credentials: 'include',
        headers: getHeaders(),
        body: JSON.stringify({ name: permissionName })
      });

      const data = await response.json();

      if (response.ok) {
        // Llamar al callback con el nuevo permiso
        if (onPermissionCreated && data.data) {
          onPermissionCreated(data.data);
        }
        setPermissionName('');
      } else {
        setError(data.message || 'Error al crear el permiso');
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
        <CFormLabel htmlFor="permissionName">Nombre del Permiso</CFormLabel>
        <CFormInput
          type="text"
          id="permissionName"
          value={permissionName}
          onChange={(e) => setPermissionName(e.target.value)}
          placeholder="Ingrese el nombre del permiso"
          required
        />
      </div>
      
      <CButton 
        type="submit" 
        color="success"
        disabled={loading || !permissionName.trim()}
      >
        {loading ? 'Creando...' : 'Crear Permiso'}
      </CButton>
    </CForm>
  );
};

export default CreatePermission;