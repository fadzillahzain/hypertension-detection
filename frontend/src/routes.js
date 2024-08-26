import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const RekamMedis = React.lazy(() => import('./views/base/dataRekamMedis/ReadAll'))
const RekamMedisDetail = React.lazy(() => import('./views/base/dataRekamMedis/ReadDetail'))
const RekamMedisAdd = React.lazy(() => import('./views/base/dataRekamMedis/AddForm'))
const RekamMedisEdit = React.lazy(() => import('./views/base/dataRekamMedis/EditForm'))
const Penyakit = React.lazy(() => import('./views/base/penyakit/ReadAll'))
const PenyakitAdd = React.lazy(() => import('./views/base/penyakit/AddForm'))
const PenyakitEdit = React.lazy(() => import('./views/base/penyakit/EditPage'))
const Gejala = React.lazy(() => import('./views/base/gejala/ReadAll'))
const GejalaAdd = React.lazy(() => import('./views/base/gejala/AddForm'))
const GejalaEdit = React.lazy(() => import('./views/base/gejala/EditPage'))
const Aturan = React.lazy(() => import('./views/base/aturan/ReadAll'))
const AturanAdd = React.lazy(() => import('./views/base/aturan/AddForm'))
const AturanEdit = React.lazy(() => import('./views/base/aturan/EditForm'))
const UserSuper = React.lazy(() => import('./views/base/user/ReadAllSuper'))
const UserDet = React.lazy(() => import('./views/base/user/DetailUser'))
const UserAdd = React.lazy(() => import('./views/base/user/AddForm'))
const UserEdit = React.lazy(() => import('./views/base/user/EditForm'))
const MyProfile = React.lazy(() => import('./views/base/user/MyProfile'))
const Diagnosa = React.lazy(() => import('./views/base/diagnosa/ReadAll'))
const Result = React.lazy(() => import('./views/base/diagnosa/Result'))
const RiwayatDiagnosa = React.lazy(() => import('./views/base/riwayatDiagnosa/ReadAll'))
const RiwayatDiagnosaDetail = React.lazy(() => import('./views/base/riwayatDiagnosa/ReadAll'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/diagnosa', name: 'Rekam Medis', element: Diagnosa },
  { path: '/diagnosa/hasil/', name: 'Rekam Medis', element: Result },
  { path: '/riwayat/diagnosa', name: 'Rekam Medis', element: RiwayatDiagnosa },
  { path: '/riwayat/diagnosa/detail/:id', name: 'Rekam Medis', element: RiwayatDiagnosaDetail },
  { path: '/rekam/medis', name: 'Rekam Medis', element: RekamMedis },
  { path: '/rekam/medis/det/:id', name: 'Rekam Medis', element: RekamMedisDetail },
  { path: '/rekam/medis/add', name: 'Tambah Rekam Medis', element: RekamMedisAdd },
  { path: '/rekam/medis/edit/:id', name: 'Edit Rekam Medis', element: RekamMedisEdit },
  { path: '/penyakit', name: 'Penyakit', element: Penyakit },
  { path: '/penyakit/add', name: 'Tambah Penyakit', element: PenyakitAdd },
  { path: '/penyakit/edit/:id', name: 'Edit Penyakit', element: PenyakitEdit },
  { path: '/gejala', name: 'Gejala', element: Gejala },
  { path: '/gejala/add', name: 'Tambah Gejala', element: GejalaAdd },
  { path: '/gejala/edit/:id', name: 'Edit Gejala', element: GejalaEdit },
  { path: '/aturan', name: 'Aturan', element: Aturan },
  { path: '/aturan/add', name: 'Tambah Aturan', element: AturanAdd },
  { path: '/aturan/edit/:id', name: 'Edit Aturan', element: AturanEdit },
  { path: '/user/super', name: 'User', element: UserSuper },
  { path: '/user/det/:id', name: 'User', element: UserDet },
  { path: '/user/add', name: 'Tambah User', element: UserAdd },
  { path: '/user/edit/:id', name: 'Edit User', element: UserEdit },
  { path: '/user/me/', name: 'Edit User', element: MyProfile },
]

export default routes
