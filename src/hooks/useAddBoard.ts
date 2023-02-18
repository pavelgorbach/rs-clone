import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { createBoard } from '@/api'
import { AxiosError } from 'axios'

export default function useAddBoard() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: createBoard,
    onSuccess: (board) => {
      queryClient.invalidateQueries(['boards'])
      toast.success(`${board.title} ${t('toast.created')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
