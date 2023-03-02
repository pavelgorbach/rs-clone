import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

import { deleteUserPhoto } from '@/api'

export default function useDeleteUserPhoto() {
  return useMutation({
    mutationFn: deleteUserPhoto,
    onError: (e: AxiosError) => {
      toast.error(e.message)
    }
  })
}
