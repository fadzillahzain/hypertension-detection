import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import WidgetsDropdownMember from '../widgets/WidgetsDropdownMember'

const Dashboard = () => {

  return (
    <>
      {/* <WidgetsDropdown className="mb-4" /> */}
      <WidgetsDropdownMember className="mb-4" />
      <CCard className="mb-4">
        <CCardHeader>
          Aktivitas Terkini
        </CCardHeader>
        <CCardBody>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>
                  
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>user1</CTableDataCell>
                <CTableDataCell>mendaftarkan diri</CTableDataCell>
                <CTableDataCell className='text-end'>rabu, 12 Agustus 2024 19:21</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
