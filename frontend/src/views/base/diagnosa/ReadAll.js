import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
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
import { cilAperture } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import { useGejalaAll, usePenyakitAll } from '../../../hooks/queries'
import { makeRequest } from '../../../axios'

const Diagnosa = () => {
  const [inputs, setInputs] = useState([])
  const [checkboxes, setCheckboxes] = useState({})
  const [penyakitId, setPenyakitId] = useState(1)
  const navigate = useNavigate()

  const { isPending, isError, data: theDatas, error, isFetching } = useGejalaAll()
  const { data: penyakits, isFetching: isFetchingPenyakit } = usePenyakitAll()
  // console.log(theDatas);

  // const handleChange = (e) => {
  //   setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
  // };
  const handleChange = (e) => {
    // listIdGejala.includes(id) ? setListIdGejala(listIdGejala.filter(v => v !== id)) : setListIdGejala([...listIdGejala, id])
    const { name, checked } = e.target
    setCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked,
    }))
  }

  const handleSubmit = () => {
    // const temp = [...inputs];
    // console.log(temp.findIndex(d => d.value === 0));

    let gejalas = []
    for (const [key, value] of Object.entries(checkboxes)) {
      if (value) {
        gejalas.push(parseInt(key)) // or (key)
      }
    }

    let data = {
      gejala: gejalas,
      penyakit: penyakitId,
    }

    let keluhan = {
      gejala: theDatas.data.filter((gejala) => {
        return gejalas.includes(gejala.id)
      }),
      penyakit: penyakits.data.penyakit.filter((penyakit) => {
        return penyakitId === penyakit.id
      })[0]
    }

    console.log(keluhan)

    makeRequest
      .post('/diagnosa', data, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}` },
      })
      .then((response) => {
        navigate('/diagnosa/hasil', {
          state: {
            keluhan: keluhan,
            result: response.data,
          },
        })
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }
  if (isError) return `Error: ${error.message}`

  React.useEffect(() => {
    if (penyakits) {
      setPenyakitId(penyakits.data.penyakit[0].id)
    }
  }, [])

  React.useEffect(() => {
    if (theDatas) {
      let _checkboxes = {}

      theDatas.data.map((gejala) => {
        _checkboxes[gejala.id] = false
      })
      setCheckboxes(_checkboxes)
    }
  }, [theDatas])

  return (
    <CRow>
      {/* {JSON.stringify(checkboxes)} */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="mt-2">
              <h3>Diagnosa Penyakit</h3>
              <p>
                Pilih semua gejala yang dialami sesuai dengan kondisi anda. Tekan tombol
                &apos;Diagnosa&apos;, jika sudah yakin dengan pilihan.
              </p>
            </div>
          </CCardHeader>
          <CCardBody>
            {/* Select penyakit */}
            {isFetchingPenyakit ? (
              <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              <CFormSelect
                className="mb-3"
                aria-label="Default select example"
                defaultValue={penyakitId}
              >
                {penyakits?.data?.penyakit.map((penyakit) => (
                  <option key={penyakit.id} value={penyakit.id}>
                    {penyakit.name}
                  </option>
                ))}
              </CFormSelect>
            )}
            {isPending ? (
              <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              <CForm>
                <CButton
                  color="secondary"
                  className="mb-3 text-light mt-1 px-3 mx-1"
                  onClick={handleSubmit}
                >
                  <CIcon icon={cilAperture} /> Diagnosa
                </CButton>
                <CTable color="" hover align="middle" responsive caption="top">
                  {/* <CTableCaption>Daftar data materi</CTableCaption> */}

                  <CTableHead color="">
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Kode</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Gejala</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Pilih Kondisi</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {theDatas.data?.map((data, index) => (
                      <CTableRow key={data.id}>
                        <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                        <CTableDataCell>{data.kode}</CTableDataCell>
                        <CTableDataCell>{data.name}</CTableDataCell>
                        <CTableDataCell width={'40%'}>
                          {/* <CFormSelect defaultValue={'0'} onChange={(e) =>handleChange(data.id, e.target.value)}>
                                    <option value={2}>Yakin</option>
                                    <option value={1}>Kurang Yakin</option>
                                    <option value={0}>Tidak</option>
                                  </CFormSelect> */}
                          <CFormCheck
                            type="checkbox"
                            id="check"
                            name={data.id}
                            value={data.id}
                            onChange={handleChange}
                            checked={checkboxes[data.id]}
                          />
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
