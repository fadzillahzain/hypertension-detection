import React, { useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilStorage } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useRiwayatDiagnosaPages } from '../../../hooks/queries'

const RiwayatDiagnosa = () => {
    const [page, setPage] = useState(1);
    const navigate = useNavigate()
    const { isPending, isError, data: theDatas, error, isFetching } = useRiwayatDiagnosaPages(page)

    if (isError) return `Error: ${error.message}`

    const handleDetail = (id) => navigate(`/rekam/medis/det/${id}`)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{display:'flex'}} className='mt-2'>
              <h3>Riwayat Rekam Medis User</h3>
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
              <CTable color="" hover align='middle' responsive caption="top">
                {/* <CTableCaption>Daftar data materi</CTableCaption> */}
                
                <CTableHead color=''>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">User</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Gejala</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Penyakit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {theDatas.data?.map((data, index)=>(
                        <CTableRow key={data.id}>
                            <CTableHeaderCell scope="row">{(index+1)+((page-1)*5)}</CTableHeaderCell>
                            <CTableDataCell>{data.user.name}</CTableDataCell>
                            <CTableDataCell>{data.gejala}</CTableDataCell>
                            <CTableDataCell>{data.penyakit}</CTableDataCell>
                            <CTableDataCell>{data.aksi}</CTableDataCell>
                            <CTableDataCell>
                                <CButton color="primary" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleDetail(data.id)}>
                                    <CIcon icon={cilStorage} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
                <CPagination align="end" style={{marginRight:"40px",marginTop:"2ren",marginLeft:'auto'}}>
                <ResponsivePagination
                  total={theDatas?.data.last_page ? theDatas.data.last_page :1}
                  current={page}
                  onPageChange={(page) => setPage(page)}
                />
              </CPagination>
            </>       
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default RiwayatDiagnosa
