import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { signIn } from '@/api'
import { ROUTES } from '@/router'
import { LoginInput } from '@/components'
import useAuthStore from '@/hooks/useAuthStore'

export default function useSignInPage() {
  const navigate = useNavigate()

  const authStore = useAuthStore()

  const { mutate: loginUser } = useMutation({
    mutationFn: (userData: LoginInput) => signIn(userData),
    onSuccess: (data) => {
      authStore.authenticate(data.token)
      toast.success('You successfully logged in')
      navigate(ROUTES.boards, { replace: true })
    },
    onError(e) {
      if (e instanceof Error) {
        toast.error(e.message)
      } else {
        toast.error('Something went wrong')
      }
    }
  })

  async function onSubmit(credentials: LoginInput) {
    loginUser(credentials)
  }

  return {
    onSubmit
  }
}
