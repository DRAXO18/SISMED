/* eslint-disable prettier/prettier */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { usePermissions } from '../../contexts/PermissionContext'
import NoAccess from '../../views/pages/NoAccess'

const PermissionRoute = ({ requiredPermission, children }) => {
  const { permissions, loading } = usePermissions()

  if (loading) return null // o un spinner

  if (!permissions.includes(requiredPermission)) {
    return <NoAccess />
  }

  return children
}

export default PermissionRoute
