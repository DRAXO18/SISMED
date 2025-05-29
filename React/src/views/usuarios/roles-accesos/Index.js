/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import { 
  CButton, 
  CCard, 
  CCardBody, 
  CCardHeader, 
  CCol, 
  CContainer, 
  CRow,
  CForm,
  CFormSelect,
  CListGroup,
  CListGroupItem,
  CBadge,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CAlert
} from '@coreui/react';
import CreateRole from './CreateRole';
import CreatePermission from './CreatePermission';
import Modal from './Modal';

const Index = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  
  // Estados para datos
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [rolesWithPermissions, setRolesWithPermissions] = useState([]);
  
  // Estados para formularios
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);

  // Estados para notificaciones
  const [alert, setAlert] = useState({ show: false, message: '', color: 'success' });

  useEffect(() => {
    loadData();
  }, []);

  const API_BASE_URL = 'http://localhost:8000';

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  // Función para mostrar alertas temporales
  const showAlert = (message, color = 'success') => {
    setAlert({ show: true, message, color });
    setTimeout(() => {
      setAlert({ show: false, message: '', color: 'success' });
    }, 4000);
  };

  const loadData = async () => {
    try {
      const headers = getHeaders();
      const [rolesRes, permissionsRes, usersRes, rolesPermissionsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/roles-accesos/roles`, { 
          headers,
          credentials: 'include'
        }),
        fetch(`${API_BASE_URL}/api/roles-accesos/permissions`, { 
          headers,
          credentials: 'include'
        }),
        fetch(`${API_BASE_URL}/api/roles-accesos/users`, { 
          headers,
          credentials: 'include'
        }),
        fetch(`${API_BASE_URL}/api/roles-accesos/roles-with-permissions`, { 
          headers,
          credentials: 'include'
        })
      ]);

      if (!rolesRes.ok) throw new Error(`Error roles: ${rolesRes.status}`);
      if (!permissionsRes.ok) throw new Error(`Error permisos: ${permissionsRes.status}`);
      if (!usersRes.ok) throw new Error(`Error usuarios: ${usersRes.status}`);
      if (!rolesPermissionsRes.ok) throw new Error(`Error roles con permisos: ${rolesPermissionsRes.status}`);

      setRoles(await rolesRes.json());
      setPermissions(await permissionsRes.json());
      setUsers(await usersRes.json());
      setRolesWithPermissions(await rolesPermissionsRes.json());
    } catch (error) {
      console.error('Error loading data:', error);
      if (error.message.includes('401')) {
        window.location.href = '/login';
      }
    }
  };

  // Función para actualizar roles con permisos localmente
  const updateRolePermissionsLocally = (roleId, newPermissions) => {
    setRolesWithPermissions(prevRoles => 
      prevRoles.map(role => 
        role.id === parseInt(roleId) 
          ? { ...role, permissions: newPermissions }
          : role
      )
    );
  };

  // Función para agregar nuevo rol localmente
  const addRoleLocally = (newRole) => {
    setRoles(prevRoles => [...prevRoles, newRole]);
    setRolesWithPermissions(prevRoles => [...prevRoles, { ...newRole, permissions: [] }]);
  };

  // Función para agregar nuevo permiso localmente
  const addPermissionLocally = (newPermission) => {
    setPermissions(prevPermissions => [...prevPermissions, newPermission]);
  };

  const openModal = (title, content) => {
    setModalTitle(title);
    
    // Pasar función de callback para actualizar datos localmente
    if (title === 'Crear Rol') {
      setModalContent(
        React.cloneElement(content, { 
          onRoleCreated: (newRole) => {
            addRoleLocally(newRole);
            closeModal();
            showAlert('Rol creado exitosamente');
          }
        })
      );
    } else if (title === 'Crear Permiso') {
      setModalContent(
        React.cloneElement(content, { 
          onPermissionCreated: (newPermission) => {
            addPermissionLocally(newPermission);
            closeModal();
            showAlert('Permiso creado exitosamente');
          }
        })
      );
    } else {
      setModalContent(content);
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleAssignPermissionsToRole = async (e) => {
    e.preventDefault();
    
    if (!selectedRole || selectedPermissions.length === 0) {
      showAlert('Debe seleccionar un rol y al menos un permiso', 'warning');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/roles-accesos/assign-permissions-to-role`, {
        method: 'POST',
        credentials: 'include',
        headers: getHeaders(),
        body: JSON.stringify({
          role_id: selectedRole,
          permission_ids: selectedPermissions
        })
      });
      
      if (response.ok) {
        // Actualizar localmente sin recargar
        const selectedPermissionObjects = permissions.filter(p => 
          selectedPermissions.includes(p.id)
        );
        
        updateRolePermissionsLocally(selectedRole, selectedPermissionObjects);
        
        // Limpiar formulario
        setSelectedRole('');
        setSelectedPermissions([]);
        
        showAlert('Permisos asignados exitosamente');
      } else {
        const errorData = await response.json();
        showAlert(errorData.message || 'Error al asignar permisos', 'danger');
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('Error de conexión', 'danger');
    }
  };

  const handleAssignRolesToUser = async (e) => {
    e.preventDefault();
    
    if (!selectedUser || selectedRoles.length === 0) {
      showAlert('Debe seleccionar un usuario y al menos un rol', 'warning');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/roles-accesos/assign-roles-to-user`, {
        method: 'POST',
        credentials: 'include',
        headers: getHeaders(),
        body: JSON.stringify({
          user_id: selectedUser,
          role_ids: selectedRoles
        })
      });
      
      if (response.ok) {
        // Limpiar formulario
        setSelectedUser('');
        setSelectedRoles([]);
        
        showAlert('Roles asignados exitosamente');
      } else {
        const errorData = await response.json();
        showAlert(errorData.message || 'Error al asignar roles', 'danger');
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('Error de conexión', 'danger');
    }
  };

  const handlePermissionChange = (permissionId) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId) 
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleRoleChange = (roleId) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  return (
    <CContainer>
      <CRow>
        <CCol xs={12}>
          <h2>Gestión de Roles y Permisos</h2>
        </CCol>
      </CRow>

      {/* Alerta para notificaciones */}
      {alert.show && (
        <CRow className="mb-3">
          <CCol xs={12}>
            <CAlert color={alert.color} dismissible onClose={() => setAlert({ show: false, message: '', color: 'success' })}>
              {alert.message}
            </CAlert>
          </CCol>
        </CRow>
      )}

      {/* Botones para crear */}
      <CRow className="mb-4">
        <CCol xs={12} md={6}>
          <CButton 
            color="primary" 
            onClick={() => openModal('Crear Rol', <CreateRole />)}
            className="me-2"
          >
            Crear Rol
          </CButton>
          {/* <CButton 
            color="success" 
            onClick={() => openModal('Crear Permiso', <CreatePermission />)}
          >
            Crear Permiso
          </CButton> */}
        </CCol>
      </CRow>

      {/* Asignar permisos a rol */}
      <CRow className="mb-4">
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>Asignar Permisos a Rol</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleAssignPermissionsToRole}>
                <CRow>
                  <CCol md={4}>
                    <CFormSelect 
                      value={selectedRole} 
                      onChange={(e) => setSelectedRole(e.target.value)}
                      required
                    >
                      <option value="">Seleccionar Rol</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                      {permissions.map(permission => (
                        <div key={permission.id} className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            checked={selectedPermissions.includes(permission.id)}
                            onChange={() => handlePermissionChange(permission.id)}
                          />
                          <label className="form-check-label">{permission.name}</label>
                        </div>
                      ))}
                    </div>
                  </CCol>
                  <CCol md={2}>
                    <CButton type="submit" color="primary">Asignar</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Asignar roles a usuario */}
      <CRow className="mb-4">
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>Asignar Roles a Usuario</strong>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleAssignRolesToUser}>
                <CRow>
                  <CCol md={4}>
                    <CFormSelect 
                      value={selectedUser} 
                      onChange={(e) => setSelectedUser(e.target.value)}
                      required
                    >
                      <option value="">Seleccionar Usuario</option>
                      {users.map(user => (
                        <option key={user.id} value={user.id}>
                          {user.nombre} {user.apellido_paterno}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  <CCol md={6}>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                      {roles.map(role => (
                        <div key={role.id} className="form-check">
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            checked={selectedRoles.includes(role.id)}
                            onChange={() => handleRoleChange(role.id)}
                          />
                          <label className="form-check-label">{role.name}</label>
                        </div>
                      ))}
                    </div>
                  </CCol>
                  <CCol md={2}>
                    <CButton type="submit" color="primary">Asignar</CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Mostrar permisos por rol */}
      <CRow>
        <CCol xs={12}>
          <CCard>
            <CCardHeader>
              <strong>Permisos por Rol</strong>
            </CCardHeader>
            <CCardBody>
              <CAccordion>
                {rolesWithPermissions.map(role => (
                  <CAccordionItem key={role.id} itemKey={role.id}>
                    <CAccordionHeader>
                      <strong>{role.name}</strong> 
                      <CBadge color="info" className="ms-2">
                        {role.permissions.length} permisos
                      </CBadge>
                    </CAccordionHeader>
                    <CAccordionBody>
                      {role.permissions.length > 0 ? (
                        <CListGroup>
                          {role.permissions.map(permission => (
                            <CListGroupItem key={permission.id}>
                              {permission.name}
                            </CListGroupItem>
                          ))}
                        </CListGroup>
                      ) : (
                        <p className="text-muted">No hay permisos asignados</p>
                      )}
                    </CAccordionBody>
                  </CAccordionItem>
                ))}
              </CAccordion>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Modal */}
      <Modal 
        show={showModal} 
        onClose={closeModal}
        title={modalTitle}
      >
        {modalContent}
      </Modal>
    </CContainer>
  );
};

export default Index;