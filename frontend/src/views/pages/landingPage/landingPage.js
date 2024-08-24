import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import {
    CButton,
    CCarousel,
  CCarouselCaption,
  CCarouselItem,
  CCloseButton,
  CCol,
  CContainer,
  CImage,
  CNavLink,
  COffcanvas,
  COffcanvasBody,
  COffcanvasHeader,
  COffcanvasTitle,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
const Login = () => {
    
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );  
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  return (
    <div style={{margin:0}}>
        <CCarousel>
            <CCarouselItem>
                <div className="bg-dark" style={{position:'relative'}}>
                    <CImage className="d-block w-100 img-carousel" src={'./4.jpg'} alt="slide 1" />
                </div>
                <CCarouselCaption style={{bottom:'15rem'}}>
                    <p style={{fontFamily:'Open sans',fontSize:'90px',marginBottom:0}}>Selamat Datang</p>
                    <p style={{fontFamily:'math',fontSize:'35px'}}>Sistem Pakar Diagnosa Penyakit Hipertensi</p>
                    <p style={{fontFamily:'math',fontSize:'25px'}}>Metode <label style={{fontStyle:'italic',position:'relative'}}>Certainty Factor</label></p>
                </CCarouselCaption>
                <div className='title'>
                    <strong style={{marginRight:'.5rem'}}>Sistem Pakar</strong>
                    Hipertensi
                    
                    <CButton onClick={() => setVisible(true)} className='text-light ms-auto' style={{marginRight:'.5rem'}}><CIcon icon={cilMenu} size='xxl'/> {''}</CButton>
                </div>
            </CCarouselItem>
        </CCarousel>
        <COffcanvas placement="end" visible={visible} className='bg-danger' onHide={() => setVisible(false)}>
            <COffcanvasHeader style={{display:'flex'}}>
                <COffcanvasTitle className='text-dark'></COffcanvasTitle>
                <CCloseButton className="text-reset text-white ms-auto" onClick={() => setVisible(false)} />
            </COffcanvasHeader>
            <COffcanvasBody>
                
            {currentUser && currentUser ? (
                <div>
                    <div className='px-3 pt-3 pb-3 text-dark' onClick={() => {navigate('/dashboard')}} style={{borderBottom:'1px solid #000',cursor:'pointer'}}>
                        <strong>Dashboard</strong>
                    </div>
                    <div className='px-3 pt-3 pb-3 text-dark' onClick={() => {navigate('/logout')}} style={{borderBottom:'1px solid #000',cursor:'pointer'}}>
                        Logout
                    </div>
                </div>
            ):(
                <div>
                    <div className='px-3 pt-3 pb-3 text-dark' onClick={() => {navigate('/home')}} style={{borderBottom:'1px solid #000',cursor:'pointer'}}>
                        <strong>Home</strong>
                    </div>
                    <div className='px-3 pt-3 pb-3 text-dark' onClick={() => {navigate('/login')}} style={{borderBottom:'1px solid #000',cursor:'pointer'}}>
                        Masuk
                    </div>
                </div>
            )}
            </COffcanvasBody>
        </COffcanvas>
    </div>
  )
}

export default Login
