import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { 
  getAturan,
  getAturanById,
  getDashboard, 
  getGejala, 
  getGejalaAll, 
  getGejalaById, 
  getPenyakit, 
  getPenyakitAll, 
  getPenyakitById, 
  getRekamMedis, 
  getRekamMedisById, 
  getRekamMedisUser, 
  getUser, 
  getUserPages} from '../services/api'

export function useRekamMedisPages(page) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['rekamMedis', {page}],
    queryFn: () => getRekamMedis(page),
    placeholderData: keepPreviousData,
  });
}

export function useRiwayatDiagnosaPages(page) {
  return useQuery({
    queryKey: ['riwayatDiagnosa', {page}],
    queryFn: () => getRekamMedisUser(page),
    placeholderData: keepPreviousData,
  });
}

export function useRekamMedisById(id){
  return useQuery({
    queryKey: ['rekamMedisbyId', id],
    queryFn: () => getRekamMedisById(id),
  })
}

export function useDashboard(){
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => getDashboard(),
  })
}

export function useUserPages(page) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['user', {page}],
    queryFn: () => getUserPages(page),
    placeholderData: keepPreviousData,
  });
}

export function useUserById(id){
  return useQuery({
    queryKey: ['userbyid', id],
    queryFn: () => getUser(id),
  })
}

export function usePenyakitPages(page) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['penyakit', page],
    queryFn: () => getPenyakit(page),
    placeholderData: keepPreviousData,
  });
}

export function usePenyakitAll() {
  return useQuery({
    queryKey: ['penyakitAll'],
    queryFn: () => getPenyakitAll(),
    placeholderData: keepPreviousData,
  });
}

export function usePenyakitById(id){
  return useQuery({
    queryKey: ['penyakitbyId', id],
    queryFn: () => getPenyakitById(id),
  })
}

export function useGejalaAll() {
  return useQuery({
    queryKey: ['gejalaAll'],
    queryFn: () => getGejalaAll(),
    placeholderData: keepPreviousData,
  });
}

export function useGejalaPages(page) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['gejala', {page}],
    queryFn: () => getGejala(page),
    placeholderData: keepPreviousData,
  });
}

export function useGejalaById(id){
  return useQuery({
    queryKey: ['gejalabyId', id],
    queryFn: () => getGejalaById(id),
  })
}

export function useAturanPages(page) {
  return useQuery({
    queryKey: ['aturan', {page}],
    queryFn: () => getAturan(page),
    placeholderData: keepPreviousData,
  });
}

export function useAturanById(id){
  // console.log("id =========> "+id)
  return useQuery({
    queryKey: ['aturanbyId', id],
    queryFn: () => getAturanById(id),
  })
}