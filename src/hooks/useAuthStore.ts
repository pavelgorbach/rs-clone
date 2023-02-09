import { useContext } from 'react'
import { StoreContext } from '@/store.context'

export default function useAuthStore() {
  const { authStore } = useContext(StoreContext)
  return authStore
}
