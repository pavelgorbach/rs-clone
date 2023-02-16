import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { updateTask } from '@/api'

export default function useUpdateTask(cb?: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation({
    mutationFn: updateTask,
    onSuccess: (task) => {
      queryClient.invalidateQueries(['tasks'])
      toast.success(`${task.title} ${t('toast.updated')}.`)

      if (cb) cb()
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })
}
