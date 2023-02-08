import { useLocation, Navigate } from 'react-router-dom'

import useAuth from '@/hooks/useAuth'
import { ROUTES } from '@/constants'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    return <Navigate to={ROUTES.signUp} state={{ from: location }} replace />
  }

  return children
}