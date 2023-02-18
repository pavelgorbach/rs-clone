import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { signUp } from '@/api'
import { AxiosError } from 'axios'

export default function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    onSuccess(createdUser) {
      toast.success(`${createdUser.name} created.`)
    },
    onError(e: AxiosError<{ message: string }>) {
      if (e.response) {
        toast.error(e.response.data.message)
      } else {
        toast.error(e.message)
      }
    }
  })
}
