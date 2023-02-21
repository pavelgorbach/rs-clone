import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { deleteTask } from '@/api'

export default function useDeleteTask() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (task) => {
      queryClient.invalidateQueries(['tasks'])
      toast.success(`${task.title} ${t('toast.deleted')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
