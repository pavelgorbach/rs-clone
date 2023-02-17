import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { updateBoard } from '@/api'

export default function useUpdateBoard(cb?: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: updateBoard,
    onSuccess: (board) => {
      queryClient.invalidateQueries(['boards', board.owner])
      toast.success(`${board.title} ${t('toast.updated')}.`)

      if (cb) cb()
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })
}
