import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { deleteColumn } from '@/api'

export default function useDeleteColumn() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteColumn,
    onSuccess: (column) => {
      queryClient.invalidateQueries(['columns'])
      toast.success(`${column.title} ${t('toast.deleted')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
