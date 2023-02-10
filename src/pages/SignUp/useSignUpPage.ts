import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/router'
import { signUp } from '@/api'
import { RegisterInput } from '@/components'

export default function useSignUpPage() {
  const navigate = useNavigate()

  const { mutate: registerUser } = useMutation({
    mutationFn: (userData: RegisterInput) => signUp(userData),
    onSuccess(createdUser) {
      toast.success(`${createdUser.name} created. You can login now.`)
      navigate(ROUTES.signIn, { replace: true })
    },
    onError(e) {
      if (e instanceof Error) {
        toast.error(e.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  })

  function onSubmit(data: RegisterInput) {
    registerUser(data)
  }

  return {
    onSubmit
  }
}
