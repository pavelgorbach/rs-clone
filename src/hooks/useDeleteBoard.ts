import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { deleteBoard } from '@/api'

export default function useDeleteBoard() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: (board) => {
      queryClient.invalidateQueries(['boards'])
      toast.success(`${board.title} ${t('toast.deleted')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
