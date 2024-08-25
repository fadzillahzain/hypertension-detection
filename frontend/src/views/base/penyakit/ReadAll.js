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
import { usePenyakitPages } from '../../../hooks/queries'
import { useDeletePenyakit } from '../../../hooks/mutation'

const Penyakit = () => {
    const [page, setPage] = useState(1);
    const navigate = useNavigate()
    const { isPending, isError, data: theDatas, error, isFetching } = usePenyakitPages(page)
    /* ilangin bracket dari string trus jadiin array */
      // const formated =(theDatas?.data.data[0].solusi); //the string
      // console.log("formate",eval(formated)); //1st method
      // console.log("formate",(formated.replace(/[\[\]"]+/g,'')).split(',')); //2nd
    let tempSolusi
    const list = (string) =>{
      {tempSolusi = (string.replace(/[\[\]"]+/g,'')).split(',')}
          <div>
            {tempSolusi.map((data)=>{
      {console.log(data)}
              <p>{data}</p>
            })}
          </div>
    }
    const deleteMutation = useDeletePenyakit()

    if (isError) return `Error: ${error.message}`

    const handleDelete = (id) => {
      deleteMutation.mutate(id)
      setPage(1)
      navigate('/penyakit')
    }
    const handleEdit = (id) => navigate(`/penyakit/edit/${id}`)
    const handleAdd = () => navigate(`/penyakit/add`)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{display:'flex'}} className='mt-2'>
              <h3>Daftar Penyakit</h3>
              <div style={{marginLeft:'auto'}}>
                
                <CButton className='bg-success text-dark' onClick={handleAdd}>
                  Tambah Data <CIcon icon={cilPlus} size='lg'></CIcon>
                </CButton>
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
                    <CTableHeaderCell scope="col">Kode</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Solusi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {theDatas.data.data?.map((data, index)=>(
                        <CTableRow key={data.id}>
                            <CTableHeaderCell scope="row">{(index+1)+((page-1)*5)}</CTableHeaderCell>
                            <CTableDataCell>{data.kode}</CTableDataCell>
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
                                {data.deskripsi}
                              </ShowMoreText>
                            </CTableDataCell>
                            <CTableDataCell>
                            {/* <div dangerouslySetInnerHTML={{ __html: data.solusi }}>
                            </div> */}
                            {data.solusi.length < 3 ? "Tidak ada solusi" :
                            
                              <ul>
                                {((data.solusi.replace(/[\[\]"]+/g,'')).split(',')).map((dataSolusi, index)=>(
                                  <li key={index}>{dataSolusi}</li>
                                ))}
                              </ul>
                            }
                              {/* {console.log(<List string={data.solusi}/>)} */}
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton color="warning" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleEdit(data.id)}>
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton color="danger" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleDelete(data.id)}>
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
                <CPagination align="end" style={{marginRight:"40px",marginTop:"2ren",marginLeft:'auto'}}>
                <ResponsivePagination
                  total={theDatas.data.last_page ? theDatas.data.last_page :1}
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

export default Penyakit
