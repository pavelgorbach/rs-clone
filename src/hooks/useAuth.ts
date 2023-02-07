import { useContext } from 'react'

import { AuthContext } from '@/providers/auth'

export default function useAuth() {
  return useContext(AuthContext)
}
