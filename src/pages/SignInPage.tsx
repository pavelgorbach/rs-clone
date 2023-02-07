import { useNavigate, useLocation } from 'react-router-dom'

import useAuth from '@/hooks/useAuth'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const from = location.state?.from?.pathname || '/'

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('login') as string

    auth.signin(username, () => {
      navigate(from, { replace: true })
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="login" type="text" />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  )
}
