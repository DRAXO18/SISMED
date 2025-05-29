import React from 'react'
import CIcon from '@coreui/icons-react'
import { usePermissions } from './contexts/PermissionContext'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
  cilCalendar,
  cilMedicalCross,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const filterNavItems = (items, permissions) => {
  return items
    .map((item) => {
      if (item.items) {
        const filteredChildren = filterNavItems(item.items, permissions)
        if (filteredChildren.length > 0) {
          return { ...item, items: filteredChildren }
        }
        return null
      }

      // Si el ítem tiene un permiso, validamos
      if (item.permission) {
        return permissions.includes(item.permission) ? item : null
      }

      // Si no tiene permiso asociado, se muestra por defecto
      return item
    })
    .filter(Boolean)
}

const _nav = [
  {
    component: CNavItem,
    name: 'Inicio',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
    permission: 'vista_dashboard',
  },
  {
    component: CNavTitle,
    name: 'Extras/Menu',
  },
  {
    component: CNavGroup,
    name: 'Usuarios',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Usuarios',
        to: '/usuarios',
        permission: 'vista usuarios', // este es el permiso exacto que viene del backend
      },
      {
        component: CNavItem,
        name: 'Roles-Accesos',
        to: '/roles-accesos',
        permission: 'vista roles/accesos',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Citas y sesiones',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Citas',
        to: '/citas',
        permission: 'vista_citas', // este es el permiso exacto que viene del backend
      },
      {
        component: CNavItem,
        name: 'Sesiones',
        to: '/sesiones',
        permission: 'vista_sesiones',
      },
      {
        component: CNavItem,
        name: 'Pagos',
        to: '/pagos',
        permission: 'vista_pagos', // este es el permiso exacto que viene del backend
      },
      {
        component: CNavItem,
        name: 'Reportes',
        to: '/reportes',
        permission: 'vista_reportes',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Tratamientos',
    icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Gestión de Tratamientos',
        to: '/tratamientos',
        permission: 'vista_tratamientos',
      },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
