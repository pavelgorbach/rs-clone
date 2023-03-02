import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { updateUser } from '@/api'

export default function useUpdateUser() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      queryClient.invalidateQueries(['user', user._id])
      toast.success(`${user.name} ${t('toast.updated')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
