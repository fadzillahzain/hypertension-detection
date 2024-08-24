import React, { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import ShowMoreText from "react-show-more-text";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilStorage, cilZoom, cilReload, cilPlus, cilAperture } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'

const Diagnosa = () => {
    const [inputs, setinputs] = useState();
    const navigate = useNavigate()
    
    const HandleChange = (e) => {
    }
    // const { isPending, isError, data: theDatas, error, isFetching } = useAturanPages()
    // if (isError) return `Error: ${error.message}`
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className='mt-2'>
              <h3>Diagnosa Penyakit</h3>
              <p>Pilih semua gejala yang dialami sesuai dengan kondisi anda. Tekan tombol 'Diagnosa' jika sudah yakin dengan pilihan.</p>
            </div>
          </CCardHeader>
          <CCardBody>
            
            {/* {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : ( */}
              
            <>
            <CButton color="secondary" className="mb-3 text-light mt-1 px-3 mx-1" onClick={() => navigate('/diagnosa/hasil')}>
                <CIcon icon={cilAperture} /> {' '} Diagnosa
            </CButton>
              <CTable color="" hover align='middle' responsive caption="top">
                {/* <CTableCaption>Daftar data materi</CTableCaption> */}
                
                <CTableHead color=''>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Kode</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Gejala</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Pilih Kondisi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                        <CTableRow key={1}>
                            <CTableHeaderCell scope="row">1</CTableHeaderCell>
                            <CTableDataCell>G01</CTableDataCell>
                            <CTableDataCell>Linu</CTableDataCell>
                            <CTableDataCell width={'40%'}>
                              <CFormSelect defaultValue={'tidak'}>
                                <option value={'yakin'}>Yakin</option>
                                <option value={'kurangYakin'}>Kurang Yakin</option>
                                <option value={'tidak'}>Tidak</option>
                              </CFormSelect>
                            </CTableDataCell>
                        </CTableRow>
                </CTableBody>
              </CTable>
            </>       
          {/* )}
          {isFetching ? <span> Loading...</span> : null}{' '} */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Diagnosa
