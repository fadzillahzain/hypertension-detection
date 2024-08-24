import { useMutation, useQueryClient } from '@tanstack/react-query'

import { delRekamMedis } from '../services/api'

export function useDeleteRekamMedis() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: delRekamMedis,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['rekamMedis'] })
    },
  })
}

export function useDeletePenyakit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: delPenyakit,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['penyakit'] })
    },
  })
}
export function useDeleteGejala() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: delGejala,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['gejala'] })
    },
  })
}

export function useDeleteAturan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: delAturan,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['aturan'] })
    },
  })
}
