import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { 
  getDashboard, 
  getRekamMedis, 
  getRekamMedisById, 
  getUser, 
  getUserPages} from '../services/api'

export function useRekamMedisPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['rekamMedis', {limit,page,filter}],
    queryFn: () => getRekamMedis(limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function useRiwayatDiagnosaPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['riwayatDiagnosa', {limit,page,filter}],
    queryFn: () => getRekamMedis(limit,page,filter),
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

export function useUserPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['user', {limit,page,filter}],
    queryFn: () => getUserPages(limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function useUserById(id){
  return useQuery({
    queryKey: ['userbyid', id],
    queryFn: () => getUser(id),
  })
}

export function usePenyakitPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['penyakit', {limit,page,filter}],
    queryFn: () => getPenyakit(limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function usePenyakitById(id){
  return useQuery({
    queryKey: ['penyakitbyId', id],
    queryFn: () => getRekamMedisById(id),
  })
}

export function useGejalaPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['gejala', {limit,page,filter}],
    queryFn: () => getGejala(limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function useGejalaById(id){
  return useQuery({
    queryKey: ['gejalabyId', id],
    queryFn: () => getRekamMedisById(id),
  })
}

export function useAturanPages(limit,page,filter) {
  // console.log("hook =========> page " +page+" limit : "+limit+" filter : "+filter);
  return useQuery({
    queryKey: ['aturan', {limit,page,filter}],
    queryFn: () => getAturan(limit,page,filter),
    placeholderData: keepPreviousData,
  });
}

export function useAturanById(id){
  return useQuery({
    queryKey: ['aturanbyId', id],
    queryFn: () => getAturanById(id),
  })
}