import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cifId, cilBuilding, cilChild, cilHome, cilLockLocked, cilPhone, cilSave, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { makeRequest } from '../../../axios'

const MyProfileForm = (initialValue) => {
  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );  
  const formatedTtl = moment(initialValue.initialValue.tanggal_lahir).toISOString().substring(0,10);
  const [input, setInputs] = useState({
    name : initialValue.initialValue?.name,
    jenis_kelamin :initialValue.initialValue?.jenis_kelamin,
    tempat_lahir :initialValue.initialValue?.tempat_lahir,
    tanggal_lahir :formatedTtl,
    email : initialValue.initialValue?.email,
    no_hp : initialValue.initialValue?.no_hp,
    alamat:initialValue.initialValue?.alamat
  });
  
  const [pass, setPass] = useState({
    password : "",
    password_confirmation: "",
    
  });
  const [err, setErr] = useState(null)
  const [errPass, setErrPass] = useState(null)

  const navigate = useNavigate()

  const handleChangeDetail = (e) => {
    setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
  };
  
  const handleChangePass = (e) => {
    setPass((prev) => ({...prev, [e.target.name] : e.target.value}));
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

  
  const handleRegisterDetail = async (e) => {
    // e.preventDefault() // prevent auto refresh    
    try{
      await makeRequest.put("/user", input,{headers : {Authorization : `Bearer ${currentUser.token}`}});
      setCurrentUser({
        name : input.name,
        jenis_kelamin :input.jenis_kelamin,
        tempat_lahir :input.tempat_lahir,
        tanggal_lahir :moment(input.tanggal_lahir).format("MM-DD-YYYY"),
        email : input.email,
        no_hp : input.no_hp,
      });
      
      setErr("data berhasil disimpan  ")
    }catch(err){
      setErr(err.response.data)
    }
  };
  
  const handleRegisterPass = async (e) => {
    e.preventDefault() // prevent auto refresh
    try{
      await makeRequest.put("/user/pass", pass,{headers : {Authorization : `Bearer ${currentUser.token}`}});
      setPass({
        password : '',
        password_confirmation : ''
      })
      setErrPass("data berhasil disimpan  ")
    }catch(err){
      console.log(err);
      if(err.response.data.password)
        setErrPass(err.response.data.password[0])
    }
  };
  return (
        <CRow>
          <CCol md={6} lg={6} xl={6}>
            <CCard className="mx-1">
              <CCardBody className="p-4">
                <CForm>
                  <h1 className='mb-5'>Edit Detail akun</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput autoFocus placeholder="Nama Lengkap" autoComplete="name" name="name" onChange={handleChangeDetail} value={input.name} required />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput type="email" placeholder="Email" autoComplete="email" name="email" onChange={handleChangeDetail} value={input.email} required/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilChild} />
                    </CInputGroupText>
                    <CFormSelect name="jenis_kelamin" onChange={handleChangeDetail} value={input.jenis_kelamin}>
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
                        <CFormInput placeholder="Tempat Lahir" autoComplete="tempat_lahir" name="tempat_lahir" onChange={handleChangeDetail} value={input.tempat_lahir} required />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6} lg={6} xl={6}>
                      <CInputGroup className="mb-3">
                        <CFormInput type='date' autoComplete="tanggal_lahir" name="tanggal_lahir" onChange={handleChangeDetail} required value={input.tanggal_lahir} />
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
                        onChange={handleChangeDetail} 
                        onBlur={handleformatkontak} 
                        value={input.no_hp}
                        required
                      />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilHome}></CIcon>
                    </CInputGroupText>
                    <CFormTextarea placeholder='Alamat' autoComplete="alamat" name="alamat" onChange={handleChangeDetail} value={input.alamat} required/>
                  </CInputGroup>
                  
                  <p className="text-body-secondary">{err && err}</p>

                  <div className="d-grid text-dark">
                    <CButton color="success" onClick={handleRegisterDetail}>
                      <CIcon icon={cilSave} size='lg' className='mx-2'></CIcon>
                      Simpan
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol md={6} lg={6} xl={6}>
            <CCard className="mx-1">
              <CCardBody className="p-4">
                <CForm>
                  <h1 className='mb-5'>Edit Password akun</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name="password" onChange={handleChangePass}
                      required
                      value={pass.password}
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
                      name="password_confirmation" onChange={handleChangePass}
                      required
                      value={pass.password_confirmation}
                    />
                  </CInputGroup>
                  <p className="text-body-secondary">{errPass && errPass}</p>

                  <div className="d-grid text-dark">
                    <CButton color="success" onClick={handleRegisterPass}>
                      <CIcon icon={cilSave} size='lg' className='mx-2'></CIcon>
                      Simpan
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
  )
}

export default MyProfileForm
