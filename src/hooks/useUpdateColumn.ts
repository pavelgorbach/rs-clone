import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { updateColumn } from '@/api'

export default function useUpdateColumn() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateColumn,
    onSuccess: (column) => {
      queryClient.invalidateQueries(['columns'])
      toast.success(`${column.title} ${t('toast.updated')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
