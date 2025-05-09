import React, { useState } from 'react'

const Index = () => {
  const [tipoUsuario, setTipoUsuario] = useState('') // proveedor o admin
  const [formData, setFormData] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    email: '',
    password: '',
    telefono: '',
    fecha_nacimiento: '',
    numero_identificacion: '',
    idTipo_identificacion: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleTipoUsuarioChange = (e) => {
    setTipoUsuario(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    // Aquí puedes hacer el fetch o axios para enviar al backend
  }

  return (
    <div className="container mt-4">
      <h2>Registrar nuevo usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tipo de usuario</label>
          <select className="form-select" value={tipoUsuario} onChange={handleTipoUsuarioChange}>
            <option value="">Seleccionar</option>
            <option value="admin">Administrador</option>
            <option value="proveedor">Proveedor</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control border-primary"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Apellido paterno</label>
          <input
            type="text"
            className="form-control border-primary"
            name="apellido_paterno"
            value={formData.apellido_paterno}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Apellido materno</label>
          <input
            type="text"
            className="form-control border-primary"
            name="apellido_materno"
            value={formData.apellido_materno}
            onChange={handleChange}
          />
        </div>

        {tipoUsuario === 'admin' ? (
          <>
            <div className="mb-3">
              <label className="form-label">Tipo de identificación</label>
              <select
                className="form-select border-primary"
                name="idTipo_identificacion"
                value={formData.idTipo_identificacion}
                onChange={handleChange}
              >
                <option value="">Seleccionar tipo</option>
                <option value="1">DNI</option>
                <option value="2">Carnet de Extranjería</option>
                <option value="3">Pasaporte</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Número de identificación</label>
              <input
                type="text"
                className="form-control border-primary"
                name="numero_identificacion"
                value={formData.numero_identificacion}
                onChange={handleChange}
              />
            </div>
          </>
        ) : tipoUsuario === 'proveedor' ? (
          <div className="mb-3">
            <label className="form-label">RUC</label>
            <input
              type="text"
              className="form-control border-primary"
              name="numero_identificacion"
              value={formData.numero_identificacion}
              onChange={handleChange}
            />
          </div>
        ) : null}

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control border-primary"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control border-primary"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control border-primary"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de nacimiento</label>
          <input
            type="date"
            className="form-control border-primary"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <span className="cil-contrast me-2"></span> Registrar
        </button>
      </form>
    </div>
  )
}

export default Index
