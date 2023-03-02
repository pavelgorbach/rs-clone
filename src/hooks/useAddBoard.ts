import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { createBoard } from '@/api'

export default function useAddBoard() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

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
