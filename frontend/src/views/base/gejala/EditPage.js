import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import EditForm from './EditForm'
import { useGejalaById } from '../../../hooks/queries'
import { editGejala } from '../../../services/api'

const EditGejala= () => {
    const [err, setErr] = useState(null);
    
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { id } = useParams()
    const { isPending, isError, data: response, error, isFetching, isPlaceholderData } = useGejalaById(id)
    const updateMateriMutation = useMutation({
        mutationFn: editGejala,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['editGejala'] })
          navigate('/gejala')
        },
        onError:(err) => {
            console.log(err.response.data)
        }
    })
    const handleSubmit = async (updatedData, solusi) => {
        updateMateriMutation.mutate({ id, ...updatedData, solusi})
    };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Gejala</strong>
          </CCardHeader>
          <CCardBody>
            
            {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              <EditForm onsubmit={handleSubmit} initialValue={response} />     
          )}
          {isFetching ? <span> Fetching...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditGejala