import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

import { uploadUserPhoto } from '@/api'

export default function useUploadUserPhoto() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: uploadUserPhoto,
    onSuccess: (file) => {
      queryClient.invalidateQueries(['my-photo'])
      toast.success(`${file.name} ${t('toast.updated')}.`)
    },
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
