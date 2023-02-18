import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { createColumn } from '@/api'
import { AxiosError } from 'axios'

export default function useAddColumn() {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: createColumn,
    onSuccess: (newColumn) => {
      queryClient.invalidateQueries(['columns'])
      toast.success(`${newColumn.title} ${t('toast.created')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
