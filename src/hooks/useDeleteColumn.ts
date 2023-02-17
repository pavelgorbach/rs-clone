import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { deleteColumn } from '@/api'

export default function useDeleteColumn(cb?: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: deleteColumn,
    onSuccess: (column) => {
      queryClient.invalidateQueries(['columns'])
      toast.success(`${column.title} ${t('toast.deleted')}.`)
      if (cb) cb()
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })
}