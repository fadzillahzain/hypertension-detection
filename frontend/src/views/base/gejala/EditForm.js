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
import CIcon from '@coreui/icons-react'
import { cilMinus, cilPlus, cilTrash } from '@coreui/icons'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const EditPenyaktiForm = ({onsubmit, initialValue})=>{
    const [err, setErr] = useState(null);
    const navigate = useNavigate()
    const [input, setInputs] = useState({
        kode : initialValue?.data.kode,
        name : initialValue?.data.name,
        kategori : initialValue?.data.kategori,
        deskripsi : initialValue?.data.deskripsi,
    });
    const handleChange = (e) => {
        setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
      };
    const handleSubmit = (evt) => {
        evt.preventDefault()
        onsubmit(input)
        
        setInputs({
          kode: '',
          name: '',
          kategori: '',
          deskripsi:''
        })
    }
    
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
                            value={input.kode}
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
                            value={input.name}
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="kategori">kategori</CFormLabel>
                        <CFormInput
                            type="text"
                            id="kategori"
                            name='kategori'
                            placeholder="Nama Kategori"
                            onChange={handleChange} required 
                            value={input.kategori}
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
                            value={input.deskripsi}
                        >
                        </CFormTextarea>
                    </div>
                    <p>{err && err}</p>
                    <div className="d-grid">
                        <CButton color="info" onClick={handleSubmit}>Simpan</CButton>
                    </div>
                </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditPenyaktiForm
