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
import { cilPencil, cilTrash, cilStorage, cilZoom, cilReload, cilPlus } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useRekamMedisPages } from '../../../hooks/queries'
import { useDeleteRekamMedis } from '../../../hooks/mutation'

const RekamMedis = () => {
    const [filter, setFilter] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [fieldFilter, setFieldFilter] = useState('');
    const navigate = useNavigate()
    
    const handleFilterField = (e) => {
      setFieldFilter(e.target.value)
    }
    const handleLimit = (e) => {
      setPage(1)
      setLimit(e.target.value)
    }

    const handleFilter = (filter) => {
      // console.log("materi ========> page " +page+" limit : "+limit+" filter : "+filter);
      setFilter(filter);
    }
    const { isPending, isError, data: theDatas, error, isFetching } = useRekamMedisPages(limit,page,filter)
    const deleteMutation = useDeleteRekamMedis()

    if (isError) return `Error: ${error.message}`

    const handleDelete = (id) => {
      deleteMutation.mutate(id)
      setPage(1)
      navigate('/rekam/medis')
    }
    const handleEdit = (id) => navigate(`/rekam/medis/edit${id}`)
    const handleDetail = (id) => navigate(`/rekam/medis/detail/${id}`)
    const handleAdd = () => navigate(`/rekam/medis/add`)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{display:'flex'}} className='mt-2'>
              <h3>Daftar Rekam Medis</h3>
              <div style={{marginLeft:'auto'}}>
                <CInputGroup className="mb-3" >
                  <CFormSelect onChange={handleLimit} size='sm'>
                    <option disabled>Item/Page</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </CFormSelect>
                  <CInputGroupText id="basic-addon1" style={{backgroundColor:'#249542'}}>
                    <CButton className='p-0' onClick={handleAdd} style={{color:'white'}}>
                      Tambah Data <CIcon icon={cilPlus} size='lg'></CIcon>
                    </CButton>
                  </CInputGroupText>
                  <CFormInput aria-label="Username" type='text' name='search' placeholder='Cari : judul' onChange={handleFilterField}/>
                  <CInputGroupText id="basic-addon2">
                    <CButton className='p-0' onClick={() => {handleFilter(fieldFilter,page,limit)}}>
                      <CIcon icon={cilZoom}></CIcon>
                    </CButton>
                  </CInputGroupText>
                  <CInputGroupText id="basic-addon3">
                    <CButton className='p-0' onClick={() => {handleFilter("",page,limit)}}>
                      <CIcon icon={cilReload}></CIcon>
                    </CButton>
                  </CInputGroupText>
                </CInputGroup>
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
                    <CTableHeaderCell scope="col">Pembuat</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Judul</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Keterangan</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {theDatas.data?.map((data, index)=>(
                        <CTableRow key={data.uuid}>
                            <CTableHeaderCell scope="row">{(index+1)+materi.offset}</CTableHeaderCell>
                            <CTableDataCell>{data.user.name}</CTableDataCell>
                            <CTableDataCell>{data.name}</CTableDataCell>
                            <CTableDataCell width={'40%'}>
                              <ShowMoreText
                                  lines={3}
                                  more='Tampilkan Detail'
                                  less='Kecilkan'
                                  anchorClass=''
                                  className=''
                                  expanded={false}
                                  truncatedEndingComponent={"..... "}
                              >
                                {data.about}
                              </ShowMoreText>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton color="primary" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleDetail(data.uuid)}>
                                    <CIcon icon={cilStorage} />
                                </CButton>
                                <CButton color="warning" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleEdit(data.uuid)}>
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton color="danger" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleDelete(data.uuid)}>
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
                <CPagination align="end" style={{marginRight:"40px",marginTop:"2ren",marginLeft:'auto'}}>
                <ResponsivePagination
                  total={theDatas.total_pages ? theDatas.total_pages :1}
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

export default RekamMedis
