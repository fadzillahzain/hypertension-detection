import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAturan } from '../../../services/api'
import { usePenyakitAll } from '../../../hooks/queries'
// import AddFormDetail from './AddFormDetail'

const AddForm = () => {
  const [err, setErr] = useState(null);
  const navigate = useNavigate()
  const { isPending, isError, data: response, error, isFetching } = usePenyakitAll()   
  const [input, setInputs] = useState({
    penyakit_id : "",
    gejala_id : "",
    nilai : "",
    nilai_dst : ""
  });
  
  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
  };
  const queryClient = useQueryClient()
  
  const createMutation = useMutation({
    mutationFn: createAturan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['Aturan'] })
      console.log(input())
      navigate('/Aturan')
    },
    onError:(err) => {
      console.error(err.response.data)
    }
  })
  const handleSubmit = async (data) => {
    createMutation.mutate({...data})
  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Aturan</strong>
          </CCardHeader>
          <CCardBody>
          
          {isPending? ( <span>Loading ...</span>
          ) : isError ? (
            <div>Error: {error.message}</div>
          ) : (
            <>
            <CForm encType='multipart/form-data'>
              <div className="mb-3">
                <CFormLabel htmlFor="penyakit">Penyakit</CFormLabel>
                <CFormSelect name="penyakit_id" onChange={handleChange} >
                  <option>--Pilih Nama Penyakit--</option>
                  {response?.data.penyakit.map((data)=>{
                    return(
                      <option key={data.id} value={data.id}>{data.name}</option>
                    )
                  })} 
            
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="gejala">Gejala</CFormLabel>
                <CFormSelect name="gejala_id" onChange={handleChange} >
                  <option>--Pilih Nama Gejala--</option>
                  {response?.data.gejala.map((data)=>{
                    return(
                      <option key={data.id} value={data.id}>{data.name}</option>
                    )
                  })} 
                  
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="nilai">Nilai CF</CFormLabel>
                <CFormInput
                  type="number"
                  step="0.01"
                  min={-1}
                  max={1}
                  id="nilai"
                  name='nilai'
                  placeholder="Nilai CF"
                  onChange={handleChange} required 
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="nilai_dst">Nilai DST (format: [mengidap, tidak mengidap, tidak tahu]) example: [1.0, 0.0, 0.5]</CFormLabel>
                <CFormInput
                  type="text"
                  id="nilai_dst"
                  name='nilai_dst'
                  placeholder="[1.0, 0.0, 0.5]"
                  onChange={handleChange} required 
                />
              </div>
              <p>{err && err}</p>
              <div className="d-grid">
                <CButton color="info" onClick={()=>{handleSubmit(input)}}>Simpan</CButton>
              </div>
            </CForm>
            </>
          )}
          {isFetching ? <span> Fetching...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddForm
