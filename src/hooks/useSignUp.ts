import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { signUp } from '@/api'

export default function useSignUp(cb?: () => void) {
  return useMutation({
    mutationFn: signUp,
    onSuccess(createdUser) {
      toast.success(`${createdUser.name} created. You can login now.`)
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
