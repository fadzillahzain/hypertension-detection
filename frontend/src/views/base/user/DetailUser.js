import React, { useEffect, useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableRow,
} from '@coreui/react'
import useFetchData from './customFetchData'
import moment from 'moment'

const User = () => {
    const {data, loading} = useFetchData('/user')
    console.log(data);
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{display:'flex'}} className='mt-2'>
              <h3>Detail User Admin</h3>
              <div style={{marginLeft:'auto'}}>
                
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            
            {loading && <span>Loading ...</span>}
            {!loading && (
            <>
              <CTable align='middle' caption="top">
                <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Nama</CTableDataCell>
                            <CTableDataCell>{data.name}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Email</CTableDataCell>
                            <CTableDataCell>{data.email}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Jenis Kelamin</CTableDataCell>
                            <CTableDataCell>{data.jenis_kelamin}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Alamat</CTableDataCell>
                            <CTableDataCell>{data.alamat}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>Kontak</CTableDataCell>
                            <CTableDataCell>{data.name}</CTableDataCell>
                        </CTableRow>
                        <CTableRow>
                            <CTableDataCell>TTL</CTableDataCell>
                            <CTableDataCell>{`${data.tempat_lahir}, ${moment(data.tanggal_lahir).format("MM-DD-YYYY")}`}</CTableDataCell>
                        </CTableRow>
                </CTableBody>
              </CTable>
            </>  

            )}   
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
