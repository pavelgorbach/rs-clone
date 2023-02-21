import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { createTask } from '@/api'

export default function useAddTask() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTask,
    onSuccess: (task) => {
      queryClient.invalidateQueries(['columns'])
      queryClient.invalidateQueries(['tasks'])
      queryClient.invalidateQueries(['my-tasks']) // User's tasks on Profile Page
      toast.success(`${task.title} ${t('toast.created')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
