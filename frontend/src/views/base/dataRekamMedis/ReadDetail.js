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
import moment from 'moment'
import { useRekamMedisById } from '../../../hooks/queries'

const RekamMedis = () => {
    const { id } = useParams()
    const {isPending, isError, data: theDatas, error, isFetching} = useRekamMedisById(id)
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
            
          {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              
            <>
              <CTable align='middle' caption="top">
                <CTableBody>
                        <CTableRow>
                            <CTableDataCell>Dettail</CTableDataCell>
                            <CTableDataCell>{theDatas}</CTableDataCell>
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

export default RekamMedis
