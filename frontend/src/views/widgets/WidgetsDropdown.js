import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import {
  CRow,
  CCol,
  CCard,
  CCardBody,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import { cilFolder, cilUser } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2])

  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      <CCol sm={6} xl={4} xxl={3} >
        <CCard className='bg-info'>
          <CCardBody style={{display:'flex'}}>
          <CIcon icon={cilUser} size='xl' className='mx-2'/>
              <p className='mx-1 mb-0' style={{fontSize:'20px'}}>Data Diagnosa</p>
              <p className='ms-auto mb-0' style={{fontSize:'20px'}}>23</p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6} xl={4} xxl={3} >
        <CCard className='bg-secondary'>
          <CCardBody style={{display:'flex'}}>
          <CIcon icon={cilFolder} size='xl' className='mx-2'/>
              <p className='mx-1 mb-0' style={{fontSize:'20px'}}>Data Penyakit</p>
              <p className='ms-auto mb-0' style={{fontSize:'20px'}}>23</p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6} xl={4} xxl={3} >
        <CCard className='bg-success'>
          <CCardBody style={{display:'flex'}}>
          <CIcon icon={cilFolder} size='xl' className='mx-2'/>
              <p className='mx-1 mb-0' style={{fontSize:'20px'}}>Data Gejala</p>
              <p className='ms-auto mb-0' style={{fontSize:'20px'}}>23</p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6} xl={4} xxl={3} >
        <CCard className='bg-warning'>
          <CCardBody style={{display:'flex'}}>
              <CIcon icon={cilFolder} size='xl' className='mx-2'/>
              <p className='mx-1 mb-0' style={{fontSize:'20px'}}>Data Aturan</p>
              <p className='ms-auto mb-0' style={{fontSize:'20px'}}>23</p>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm={6} xl={4} xxl={3} >
        <CCard className='bg-primary'>
          <CCardBody style={{display:'flex'}}>
          <CIcon icon={cilUser} size='xl' className='mx-2'/>
              <p className='mx-1 mb-0' style={{fontSize:'20px'}}>User</p>
              <p className='ms-auto mb-0' style={{fontSize:'20px'}}>23</p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsDropdown
