import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { updateBoard } from '@/api'

export default function useUpdateBoard() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateBoard,
    onSuccess: (board) => {
      queryClient.invalidateQueries(['boards', board.owner])
      toast.success(`${board.title} ${t('toast.updated')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
