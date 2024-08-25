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
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createGejala } from '../../../services/api'

const AddForm = () => {
    const [err, setErr] = useState(null);
    const navigate = useNavigate()
    const [input, setInputs] = useState({
        kode : "",
        name : "",
        kategori : "",
        deskripsi : "",
    });
    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
      };
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: createGejala,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['Gejala'] })
          navigate('/gejala')
        },
        onError:(err) => {
            console.error(err.response.data)
        }
    })
    const handleSubmit = async (data) => {
      createMutation.mutate({...data})
      setInputs({
        kode: '',
        name: '',
        kategori: '',
        deskripsi: ''
      })
    };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Gejala</strong>
          </CCardHeader>
          <CCardBody>
                <CForm encType='multipart/form-data'>
                    <div className="mb-3">
                        <CFormLabel htmlFor="kode">Kode</CFormLabel>
                        <CFormInput
                            type="text"
                            id="kode"
                            name='kode'
                            placeholder="Kode Gejala"
                            onChange={handleChange} required 
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="name">Name</CFormLabel>
                        <CFormInput
                            type="text"
                            id="name"
                            name='name'
                            placeholder="Nama Gejala"
                            onChange={handleChange} required 
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="kategori">Kategori</CFormLabel>
                        <CFormInput
                            type="text"
                            id="kategori"
                            name='kategori'
                            placeholder="Kategori Gejala"
                            onChange={handleChange} required 
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="deskripsi">Deskripsi</CFormLabel>
                        <CFormTextarea 
                            id="deskripsi" 
                            name='deskripsi'
                            rows={3}
                            placeholder='Deskripsi Gejala'
                            onChange={handleChange}
                        >
                        </CFormTextarea>
                    </div>
                    <p>{err && err}</p>
                    <div className="d-grid">
                        <CButton color="info" onClick={()=>{handleSubmit(input)}}>Simpan</CButton>
                    </div>
                </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddForm
