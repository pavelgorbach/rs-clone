import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { updateTask } from '@/api'

export default function useUpdateTask() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTask,
    onSuccess: (task) => {
      queryClient.invalidateQueries(['tasks'])
      toast.success(`${task.title} ${t('toast.updated')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
