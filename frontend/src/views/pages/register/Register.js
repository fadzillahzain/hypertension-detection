import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cifId, cilBadge, cilBuilding, cilChild, cilHome, cilLockLocked, cilPhone, cilUser, cilUserFemale } from '@coreui/icons'
import {makeRequest} from '../../../axios'
import { Link, useNavigate } from 'react-router-dom'
import moment from 'moment'

const Register = () => {

  const [input, setInputs] = useState({
    name : "",
    jenis_kelamin :'P',
    tempat_lahir :'',
    tanggal_lahir :moment().format("MM-DD-YYYY"),
    email : "",
    password : "",
    password_confirmation: "",
    no_hp : "",
  });
  
  const [err, setErr] = useState([])

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
  };

  function handleformatkontak (e) {
    let kontak = input.no_hp
    let newKontak = []
    if(kontak[0] === '0'){
      for (let i = 0 ; i < kontak.length; i++) {
        if(i==0) continue
        newKontak.push(kontak[i])
      }
      setInputs((prev) => ({...prev, no_hp : newKontak.join('')}))
    }
  }
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }
  const handleRegister = async (e) => {
    e.preventDefault() // prevent auto refresh

    try{
      
      await makeRequest.post("/register", input,{
        withCredentials:false
      });
      setErr("Register berhasil silahkan login !!")
      await timeout(500);
      navigate("/login");
    }catch(err){
      console.log(err);
      if(err.response.data.name) 
        setErr(err.response.data.name[0])
      else if(err.response.data.email) 
        setErr(err.response.data.email[0])
      else if(err.response.data.alamat) 
        setErr(err.response.data.alamat[0])
      else if(err.response.data.no_hp) 
        setErr(err.response.data.no_hp[0])
      else if(err.response.data.password) 
        setErr(err.response.data.password[0])
      else if(err.response.data.password_confirmation) 
        setErr(err.response.data.password_confirmation[0])
      else if(err.response.data.tempat_lahir) 
        setErr(err.response.data.tempat_lahir[0])
    }
  };
  
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Daftar akun</h1>
                  <p className="text-body-secondary">Segera selesaikan pendaftaran akun dan mulai diagnosa penyakit anda !</p>
                  <CRow>
                    <CCol md={12} lg={12} xl={12}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput autoFocus placeholder="Nama Lengkap" autoComplete="name" name="name" onChange={handleChange} required />
                      </CInputGroup>
                    </CCol>
                    
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type="email" placeholder="Email" autoComplete="email" name="email" onChange={handleChange} required/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password" onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Ulangi Password"
                      autoComplete="new-password"
                      name="password_confirmation" onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                    {/* <CCol md={6} lg={6} xl={6}>
                      <CInputGroup className="mb-3">
                        <CFormInput placeholder="Nama Belakang" autoComplete="nameB" name="nameB" onChange={handleChange} required />
                      </CInputGroup>
                    </CCol> */}
                  </CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilChild} />
                    </CInputGroupText>
                    <CFormSelect name="jenis_kelamin" onChange={handleChange} >
                      <option disabled>--pilih jenis kelamin--</option>
                      <option value={'P'}>Perempuan</option>
                      <option value={'L'}>Laki - Laki</option>
                    </CFormSelect>
                  </CInputGroup>
                  <CRow>
                    <CCol md={6} lg={6} xl={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilBuilding} />
                        </CInputGroupText>
                        <CFormInput placeholder="Tempat Lahir" autoComplete="tempat_lahir" name="tempat_lahir" onChange={handleChange} required />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6} lg={6} xl={6}>
                      <CInputGroup className="mb-3">
                        <CFormInput type='date' placeholder="mm/dd/yyyy" autoComplete="tanggal_lahir" name="tanggal_lahir" onChange={handleChange} required />
                      </CInputGroup>
                    </CCol>
                  </CRow>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CInputGroupText>
                      <CIcon icon={cifId}></CIcon>
                      <span style={{marginLeft:'5px'}}>+62</span>
                    </CInputGroupText>
                      <CFormInput 
                        placeholder="Nomor Kontak" 
                        type='number' 
                        autoComplete="kontak-nomor" 
                        name="no_hp" 
                        onChange={handleChange} 
                        onBlur={handleformatkontak} 
                        value={input.no_hp}
                        required
                      />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHome}></CIcon>
                    </CInputGroupText>
                    <CFormTextarea placeholder='Alamat' autoComplete="alamat" name="alamat" onChange={handleChange} required/>
                  </CInputGroup>
                  
                  <p className="text-body-secondary">{err && err}</p>

                  <div className="d-grid">
                    <CButton color="success" onClick={handleRegister} className='text-dark'>Buat Akun</CButton>
                  </div>
                  <p className="text-body-secondary mt-2">Sudah punya akun ?
                    <Link to="/login">
                      <CButton color="link" className="px-1">
                          Masuk
                      </CButton>
                    </Link>
                  </p>

                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
