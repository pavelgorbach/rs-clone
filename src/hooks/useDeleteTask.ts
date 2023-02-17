import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { deleteTask } from '@/api'

export default function useDeleteTask(cb?: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: (task) => {
      queryClient.invalidateQueries(['tasks'])
      toast.success(`${task.title} ${t('toast.deleted')}.`)
      if (cb) cb()
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })
}
