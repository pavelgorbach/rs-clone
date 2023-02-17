import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { deleteBoard } from '@/api'

export default function useDeleteBoard(cb?: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: (board) => {
      queryClient.invalidateQueries(['boards'])
      toast.success(`${board.title} ${t('toast.deleted')}.`)

      if (cb) cb()
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })
}
