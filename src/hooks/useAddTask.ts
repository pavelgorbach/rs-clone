import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { createTask } from '@/api'

export default function useAddTask(cb?: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: createTask,
    onSuccess: (task) => {
      queryClient.invalidateQueries(['columns'])
      queryClient.invalidateQueries(['tasks'])
      queryClient.invalidateQueries(['my-tasks']) // User's tasks on Profile Page
      toast.success(`${task.title} ${t('toast.created')}.`)

      if (cb) cb()
    }
  })
}
