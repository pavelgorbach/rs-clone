import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { signIn } from '@/api'
import useAuthStore from './useAuthStore'

export default function useSignIn(cb?: () => void) {
  const authStore = useAuthStore()

  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      authStore.authenticate(data.token)
      toast.success('You successfully logged in')

      if (cb) cb()
    },
    onError(e) {
      if (e instanceof Error) {
        toast.error(e.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  })
}
