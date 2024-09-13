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
import moment from 'moment-timezone'
import 'moment/locale/id'
import { useLocation } from 'react-router-dom'
import { makeRequest } from '../../../axios'
import { createRekamMedis } from '../../../services/api'
moment.locale('id')
moment().tz('Asia/Jakarta').format()

const Result = () => {
  // const [inputs, setinputs] = useState();
  const navigate = useNavigate()
  const date = moment().format('dddd, MMMM Do YYYY, h:mm:ss')
  const { state } = useLocation()

  console.log(state)

  // const HandleChange = (e) => {
  // }
  // const { isPending, isError, data: theDatas, error, isFetching } = useAturanPages()
  // if (isError) return `Error: ${error.message}`
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="mt-2">
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
                {/* <div><CBadge color='success'>yakin</CBadge> batuk</div>
                <div><CBadge color='warning'>kurang yakin</CBadge> pusing</div> */}
                {state.keluhan.gejala.map((gejala, id) => (
                  <div key={id}>
                    <CBadge color="warning">
                      {gejala.kode} {gejala.name}
                    </CBadge>
                  </div>
                ))}
              </div>

              <CTable color="" hover align="middle" responsive caption="top">
                {/* <CTableCaption>Daftar data materi</CTableCaption> */}

                <CTableHead color="">
                  <CTableRow>
                    <CTableHeaderCell scope="col">Penyakit</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Hasil{'(CF)'}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Hasil{'(DST)'}</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Solusi Ditawarkan</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow key={1}>
                    <CTableHeaderCell scope="row">{state.keluhan.penyakit.name}</CTableHeaderCell>
                    <CTableDataCell>{state.result.data.combinedCF}</CTableDataCell>
                    <CTableDataCell>
                      belief: {state.result.data.belief}
                      <br />
                      plausibility: {state.result.data.plausibility}
                    </CTableDataCell>
                    <CTableDataCell>info ke dokter</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>

              <CButton
                color="primary"
                className="mb-3 text-light mt-1 px-3 mx-1"
                onClick={() => navigate('/diagnosa')}
              >
                <CIcon icon={cilArrowCircleLeft} /> Diagnosa Ulang
              </CButton>
              <CButton
                color="secondary"
                className="mb-3 text-light mt-1 px-3 mx-1"
                onClick={() => {
                  let gejalas = []

                  state.keluhan.gejala.map((gejala) => {
                    gejalas.push(`${gejala.kode} ${gejala.name}`)
                  })

                  createRekamMedis({
                    gejala: gejalas.join(', '),
                    penyakit: state.keluhan.penyakit.name,
                    aksi: 'info ke dokter',
                  }).then((res) => {
                    console.log(res)
                    navigate('/riwayat/diagnosa')
                  })
                }}
              >
                <CIcon icon={cilSave} /> Simpan Hasil
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
