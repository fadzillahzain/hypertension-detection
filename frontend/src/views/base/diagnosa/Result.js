import React from 'react'
import {
    CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilArrowCircleLeft, cilSave } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import moment from 'moment-timezone';
import 'moment/locale/id'  
moment.locale('id')
moment().tz("Asia/Jakarta").format();


const Result = () => {
    // const [inputs, setinputs] = useState();
    const navigate = useNavigate()
    const date = moment().format("dddd, MMMM Do YYYY, h:mm:ss");
    
    // const HandleChange = (e) => {
    // }
    // const { isPending, isError, data: theDatas, error, isFetching } = useAturanPages()
    // if (isError) return `Error: ${error.message}`
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className='mt-2'>
              <h3>Hasil Diagnosa</h3>
              <p>hasil diagnosis hanya bersifat sementara</p>
            </div>
          </CCardHeader>
          <CCardBody>
            
            {/* {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : ( */}
              
            <>
            {date}
            <div>
                Berdasarkan gejala yang dialami, yaitu 
                <div><CBadge color='success'>yakin</CBadge> batuk</div>
                <div><CBadge color='warning'>kurang yakin</CBadge> pusing</div>
                Penyakit yang dialami, yaitu
            </div>
            
              <CTable color="" hover align='middle' responsive caption="top">
                {/* <CTableCaption>Daftar data materi</CTableCaption> */}
                
                <CTableHead color=''>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Penyakit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Hasil{'(%)'}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Solusi Ditawarkan</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                        <CTableRow key={1}>
                            <CTableHeaderCell scope="row">Hipertensi</CTableHeaderCell>
                            <CTableDataCell>80.12</CTableDataCell>
                            <CTableDataCell>info ke dokter</CTableDataCell>
                        </CTableRow>
                </CTableBody>
              </CTable>
              
            <CButton color="primary" className="mb-3 text-light mt-1 px-3 mx-1" onClick={() => navigate('/diagnosa')}>
                <CIcon icon={cilArrowCircleLeft} /> {' '} Diagnosa Ulang
            </CButton>
            <CButton color="secondary" className="mb-3 text-light mt-1 px-3 mx-1">
                <CIcon icon={cilSave} /> {' '} Simpan Hasil
            </CButton>
            </>       
          {/* )}
          {isFetching ? <span> Loading...</span> : null}{' '} */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Result
