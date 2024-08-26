import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilAperture } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useGejalaAll } from '../../../hooks/queries';

const Diagnosa = () => {
    const [inputs, setInputs] = useState([]);
    const navigate = useNavigate()
    
    const { isPending, isError, data: theDatas, error, isFetching } = useGejalaAll()
    // console.log(theDatas);
    
  // const handleChange = (e) => {
  //   setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
  // };
  const handleChange = (id, value) => {
      // console.log("ii",inputs);
      // const hold=inputs;
    setInputs((prev) => [...prev, {id : id, val:value} ]);
    // const temp = hold.splice(hold.findIndex(v => v.id === id),1);
    // console.log("filter",temp, "hold i", hold.findIndex(v => v.id === id))
    
  };
    
  const handleSubmit = () => {
    // const temp = [...inputs];
    // console.log(temp.findIndex(d => d.value === 0));
    
    // temp.splice(temp.findIndex(d => d.value === 0), 1);
    // temp.splice(inputs.indexOf(inputs.value), 1)
    // setInputs(temp)
    navigate(`/diagnosa/hasil`,{inputs})
  }
    if (isError) return `Error: ${error.message}`
    
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className='mt-2'>
              <h3>Diagnosa Penyakit</h3>
              <p>Pilih semua gejala yang dialami sesuai dengan kondisi anda. Tekan tombol &apos;Diagnosa&apos;, jika sudah yakin dengan pilihan.</p>
            </div>
          </CCardHeader>
          <CCardBody>
              {isPending? ( <span>Loading ...</span>
              ) : isError ? (
                <div>Error: {error.message}</div>
              ) : (
                
              <CForm>
                <CButton color="secondary" className="mb-3 text-light mt-1 px-3 mx-1" onClick={handleSubmit}>
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
                        {theDatas.data?.map((data, index)=>(
                            <CTableRow key={data.id}>
                                <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                                <CTableDataCell>{data.kode}</CTableDataCell>
                                <CTableDataCell>{data.name}</CTableDataCell>
                                <CTableDataCell width={'40%'}>
                                  <CFormSelect defaultValue={'0'} onChange={(e) =>handleChange(data.id, e.target.value)}>
                                    <option value={2}>Yakin</option>
                                    <option value={1}>Kurang Yakin</option>
                                    <option value={0}>Tidak</option>
                                  </CFormSelect>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody> 
                  </CTable>
              </CForm>       
              )}
              {isFetching ? <span> fetching...</span> : null}{' '}
            
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Diagnosa
