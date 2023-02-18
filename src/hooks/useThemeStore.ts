import { useContext } from 'react'
import { StoreContext } from '@/store.context'

export default function useThemeStore() {
  const store = useContext(StoreContext)
  return store.themeStore
}
