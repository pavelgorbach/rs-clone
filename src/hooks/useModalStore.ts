import { useContext } from 'react'
import { StoreContext } from '@/store.context'

export default function useModalStore() {
  const { modalStore } = useContext(StoreContext)
  return modalStore
}
