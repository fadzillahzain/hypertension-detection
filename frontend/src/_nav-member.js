import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilAccountLogout,
  cilApps,
  cilFolder,
  cilSettings,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Dashboard',
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Konsultasi',
  },
  {
    component: CNavItem,
    name: 'Diagnosa',
    to: '/diagnosa',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Data',
  },
  {
    component: CNavItem,
    name: 'Riwayat Diagnosa',
    to: '/riwayat/diagnosa',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Data',
    to: '/data',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Akun',
  },
  {
    component: CNavItem,
    name: 'Pengaturan',
    to: '/user/me',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Keluar',
    to: '/logout',
    classnames:'text-danger',
    icon: <CIcon icon={cilAccountLogout} customClassName="nav-icon text-danger" />,
  },
  
]

export default _nav
