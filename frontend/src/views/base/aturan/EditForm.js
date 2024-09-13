import { CButton, CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useQueryClient } from '@tanstack/react-query'
// import { updateAturan } from '../../../services/api'
import { usePenyakitAll } from '../../../hooks/queries'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { editAturan } from '../../../services/api'
import { useAturanById } from '../../../hooks/queries'

const EditForm = () => {
    const { id } = useParams()

    const [err, setErr] = useState(null);
    
    const navigate = useNavigate()
    // const [input, setInputs] = useState({
    //     name : "",
    //     about : ""
    // });
    // const handleChange = (e) => {
    //     setInputs((prev) => ({...prev, [e.target.name] : e.target.value}));
    //   };
    const queryClient = useQueryClient()

    const { isPending, isError, data: initialValue, error, isFetching, isPlaceholderData } = useAturanById(id)
    const updateMateriMutation = useMutation({
        mutationFn: editAturan,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['updateAturan'] })
          navigate('/Aturan')
        },
        onError:(err) => {
            console.log(err.response.data.msg)
        }
    })
    const onSubmit = async (updatedAturan) => {
        updateMateriMutation.mutate({ id, ...updatedAturan})
    };

    const [aturan, setAturan] = useState({
        penyakit_id: initialValue?.penyakit_id || '',
        gejala_id: initialValue?.gejala_id || '',
        nilai: initialValue?.nilai || '',
        nilai_dst: initialValue?.nilai_dst || ''
    });


    const handleChangeInput = (evt) => {
        setAturan({
            ...aturan,
            [evt.target.name]: evt.target.value,
        })
    }

    const createSelectElement = (elementName, label, options) => (
        <div className="mb-3">
            <CFormLabel htmlFor={elementName}>{label}</CFormLabel>
            <CFormSelect
                id={elementName}
                name={elementName}
                onChange={handleChangeInput}
                value={aturan[elementName]}
            >
                <option value="">--Pilih {label}--</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </CFormSelect>
        </div>
    )

    const createTextInputElement = (elementName, label, placeholder, value, type = 'text') => (
        <div className="mb-3">
            <CFormLabel htmlFor={elementName}>{label}</CFormLabel>
            <CFormInput
                type={type}
                id={elementName}
                name={elementName}
                placeholder={placeholder}
                onChange={handleChangeInput}
                value={value}
                required
            />
        </div>
    )

    const handleSubmit = (evt) => {
        evt.preventDefault()
        onSubmit(aturan)

        setAturan({
            penyakit_id: '',
            gejala_id: '',
            nilai: '',
            nilai_dst: ''
        })
    }

    React.useEffect(() => {
        if (initialValue) {
            const data = initialValue.data

            setAturan({
                penyakit_id: data.penyakit_id || '',
                gejala_id: data.gejala_id || '',
                nilai: data.nilai || '',
                nilai_dst: data.nilai_dst || ''
            })
        }
    }, [initialValue])

    const { isPending: isPendingPenyakit, isError: isErrorPenyakit, data: responsePenyakit, error: errorPenyakit, isFetching: isFetchingPenyakit } = usePenyakitAll();

    return (
        <CForm encType='multipart/form-data' id='formEditAturan'>
            {isPending ? (
                <span>Loading ...</span>
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <>
                    {createSelectElement('penyakit_id', 'Penyakit', responsePenyakit?.data.penyakit || [])}
                    {createSelectElement('gejala_id', 'Gejala', responsePenyakit?.data.gejala || [])}
                    {createTextInputElement('nilai', 'Nilai CF', 'Nilai CF', aturan.nilai, 'number')}
                    {createTextInputElement('nilai_dst', 'Nilai DST', '[1.0, 0.0, 0.5]', aturan.nilai_dst, 'text')}
                    <div className="d-grid">
                        <CButton color="primary" onClick={handleSubmit}>Edit Aturan</CButton>
                    </div>
                </>
            )}
            {isFetching ? <span> Fetching...</span> : null}{' '}
        </CForm>
    )
}

export default EditForm
