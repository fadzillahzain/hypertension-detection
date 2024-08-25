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
import { createPenyakit } from '../../../services/api'
import CIcon from '@coreui/icons-react'
import { cilMinus, cilPlus, cilTrash } from '@coreui/icons'

const AddForm = () => {
    const [err, setErr] = useState(null);
    const navigate = useNavigate()
    const [input, setInputs] = useState({
        kode : "",
        name : "",
        deskripsi : "",
    });
    const [solusi, setSolusis] = useState([]);
    const [dataSolusi, setDataSolusis] = useState("");
    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
      };
    const handleAddSolusi = (e) => {
        setSolusis((prev) => [...prev, dataSolusi ]);
        setDataSolusis("");
    };
    const handleDelSolusi = (arr) => {
        const temp = [...solusi];
        temp.splice(solusi.indexOf(arr), 1)
        setSolusis(temp)
        
    };
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: createPenyakit,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['penyakit'] })
          navigate('/penyakit')
        },
        onError:(err) => {
            console.error(err.response.data)
        }
    })
    const handleSubmit = async (data, solusi) => {
      createMutation.mutate({...data, solusi})
      setInputs({
        name: '',
        about: '',
        link: ''
      })
    };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tambah Penyakit</strong>
          </CCardHeader>
          <CCardBody>
                <CForm encType='multipart/form-data'>
                    <div className="mb-3">
                        <CFormLabel htmlFor="kode">Kode</CFormLabel>
                        <CFormInput
                            type="text"
                            id="kode"
                            name='kode'
                            placeholder="Kode Penyakit"
                            onChange={handleChange} required 
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="name">Name</CFormLabel>
                        <CFormInput
                            type="text"
                            id="name"
                            name='name'
                            placeholder="Nama Penyakit"
                            onChange={handleChange} required 
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="deskripsi">Deskripsi</CFormLabel>
                        <CFormTextarea 
                            id="deskripsi" 
                            name='deskripsi'
                            rows={3}
                            placeholder='Deskripsi Penyakit'
                            onChange={handleChange}
                        >
                        </CFormTextarea>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="link">Solusi</CFormLabel>
                        <ul>
                          {solusi.map((dataSolusi,index)=>(
                            <li key={index}>
                              {dataSolusi} 
                              <CIcon icon={cilTrash} onClick={() => {handleDelSolusi(dataSolusi)}} className='text-danger' style={{cursor:'pointer'}}></CIcon>
                            </li>
                          ))}
                        </ul>
                        <CRow>
                          <CCol md={10}>
                            <CFormInput
                              type="text"
                              id="solusi"
                              name='solusi'
                              placeholder="Solusi Penyakit"
                              value={dataSolusi}
                              onChange={(e)=>{setDataSolusis(e.target.value)}} required 
                          />
                          </CCol>
                          <CCol md={2}>
                            <CButton color="success" onClick={handleAddSolusi}>
                              <CIcon icon={cilPlus} className='' size='lg'></CIcon> Solusi
                            </CButton>
                          </CCol>
                        </CRow>
                    </div>
                    <p>{err && err}</p>
                    <div className="d-grid">
                        <CButton color="info" onClick={()=>{handleSubmit(input,solusi)}}>Simpan</CButton>
                    </div>
                </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddForm
