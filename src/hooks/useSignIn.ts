import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { signIn } from '@/api'
import useAuthStore from './useAuthStore'
import { AxiosError } from 'axios'

export default function useSignIn() {
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      authStore.authenticate(data.token)
      toast.success('You successfully logged in')
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
