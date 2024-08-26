import { makeRequest } from "../axios";

const user = JSON.parse(localStorage.getItem("user")) || null
//// TANPA AXIOS
// const server = import.meta.env.VITE_SERVER_ADDRESS;
// export async function getRekamMedis() {
//     const response = await fetch(`$${server}}/rekamMedis`)
//     return response.json()
// }
// export async function createRekamMedis(newData) {
//   const response = await fetch(`${server}/rekamMedis`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newData),
//   })
//   return response.json()
// }
export const getRekamMedis = async (page=1) => {
    const response = await makeRequest.get(`/rekam?page=${page}`,{headers : {Authorization : `Bearer ${user.token}`}})
    return response.data
}

export const getRekamMedisUser = async (page=1) => {
    const response = await makeRequest.get(`/rekam/user?page=${page}`,{headers : {Authorization : `Bearer ${user.token}`}})
    return response.data
}
export async function getRekamMedisById(id) {
    return (await makeRequest.get(`/rekamMedis/${id}`)).data
}
export async function createRekamMedis(newData) {
    return (await makeRequest.post('/rekamMedis', newData)).data
}

export async function editRekamMedis(newData) {
    return (await makeRequest.put(`/rekamMedis/${newData.id}`,newData)).data
}

export async function delRekamMedis(id) {
    return (await makeRequest.delete(`/rekamMedis/${id}`)).data
}

export async function getDashboard() {
    return (await makeRequest.get(`/dashboard`)).data
}

export const getUserPages = async (page=1) => {
    const response = await makeRequest.get(`/user/super?page=${page}`,{headers : {Authorization : `Bearer ${user.token}`}})
    return response.data
}
export async function getUser(id) {
    return (await makeRequest.get(`/user/${id}`)).data
}
export async function createUser(newData) {
    return (await makeRequest.post(`/user`, newData)).data
}

export async function editUser(newData) {
    return (await makeRequest.put(`/user/${newData.id}`,newData)).data
}

export const getPenyakit = async (page=1) => {
    const response = await makeRequest.get(`/penyakit?page=${page}`,{headers : {Authorization : `Bearer ${user.token}`}})
    return response.data
}
export const getPenyakitAll = async () => {
    const response = await makeRequest.get(`/penyakit/all`,{headers : {Authorization : `Bearer ${user.token}`}})
    return response.data
}

export async function getPenyakitById(id) {
    return (await makeRequest.get(`/penyakit/${id}`,{headers : {Authorization : `Bearer ${user.token}`}})).data
}
export async function createPenyakit(newData) {
    return (await makeRequest.post('/penyakit', newData,{headers : {Authorization : `Bearer ${user.token}`}})).data
}

export async function editPenyakit(newData) {
    return (await makeRequest.put(`/penyakit/${newData.id}`,newData,{headers : {Authorization : `Bearer ${user.token}`}})).data
}

export async function delPenyakit(id) {
    return (await makeRequest.delete(`/penyakit/${id}`,{headers : {Authorization : `Bearer ${user.token}`}})).data
}

export const getGejalaAll = async () => {
    const response = await makeRequest.get(`/gejala/all`,{headers : {Authorization : `Bearer ${user.token}`}})
    return response.data
}

export const getGejala = async (page=1) => {
    const response = await makeRequest.get(`/gejala?page=${page}`,{headers : {Authorization : `Bearer ${user.token}`}})
    return response.data
}

export async function getGejalaById(id) {
    return (await makeRequest.get(`/gejala/${id}`,{headers : {Authorization : `Bearer ${user.token}`}})).data
}
export async function createGejala(newData) {
    return (await makeRequest.post('/gejala', newData,{headers : {Authorization : `Bearer ${user.token}`}})).data
}

export async function editGejala(newData) {
    return (await makeRequest.put(`/gejala/${newData.id}`,newData,{headers : {Authorization : `Bearer ${user.token}`}})).data
}

export async function delGejala(id) {
    return (await makeRequest.delete(`/gejala/${id}`,{headers : {Authorization : `Bearer ${user.token}`}})).data
}


export const getAturan = async (page=1) => {
    const response = await makeRequest.get(`/aturan?page=${page}`,{headers : {Authorization : `Bearer ${user.token}`}})
    return response.data
}

export async function getAturanById(id) {
    return (await makeRequest.get(`/aturan/${id}`,{headers : {Authorization : `Bearer ${user.token}`}})).data
}
export async function createAturan(newData) {
    return (await makeRequest.post('/aturan', newData,{headers : {Authorization : `Bearer ${user.token}`}})).data
}

export async function editAturan(newData) {
    return (await makeRequest.put(`/aturan/${newData.id}`,newData,{headers : {Authorization : `Bearer ${user.token}`}})).data
}

export async function delAturan(id) {
    return (await makeRequest.delete(`/aturan/${id}`,{headers : {Authorization : `Bearer ${user.token}`}})).data
}


