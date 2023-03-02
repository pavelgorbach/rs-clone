import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { createColumn } from '@/api'

export default function useAddColumn() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

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
