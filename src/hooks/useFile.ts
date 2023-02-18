import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import useAuthStore from '@/hooks/useAuthStore'
import { deleteFile, getFile, uploadFile } from '@/api/files'

export default function useFile() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { userId } = useAuthStore()

  const { data: photo, isError } = useQuery({
    queryKey: ['photo', userId],
    queryFn: () => getFile(userId),
    enabled: !!userId
  })

  const deletePhotoMutation = useMutation({
    mutationFn: (id: string) => deleteFile(id)
  })

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadFile(file, userId),
    onSuccess: (file) => {
      queryClient.invalidateQueries(['photo'])
      toast.success(`${file.name} ${t('toast.updated')}.`)
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : 'Something went wrong')
    }
  })

  return {
    deletePhotoMutation,
    uploadMutation,
    photo,
    isError
  }
}
