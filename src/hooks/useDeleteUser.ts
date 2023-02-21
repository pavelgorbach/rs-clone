import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { deleteUser } from '@/api'

export default function useDeleteUser() {
  const { t } = useTranslation()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (user) => {
      toast.success(`${user.name} ${t('toast.deleted')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
