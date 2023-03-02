import { useContext } from 'react'
import { StoreContext } from '@/store.context'

export default function useAuthStore() {
  const store = useContext(StoreContext)
  return store.authStore
}
