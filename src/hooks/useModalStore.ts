import { useContext } from 'react'
import { StoreContext } from '@/store.context'

export default function useModalStore() {
  const store = useContext(StoreContext)
  return store.modalStore
}
