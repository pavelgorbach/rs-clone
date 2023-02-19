import { createContext } from 'react'

import { AuthStore } from './stores/auth.store'
import { ModalStore } from './stores/modal.store'
import { ThemeStore } from './stores/theme.store'
interface IStoreContext {
  authStore: AuthStore
  modalStore: ModalStore
  themeStore: ThemeStore
}

const authStore = new AuthStore()
const modalStore = new ModalStore()
const themeStore = new ThemeStore()

export const StoreContext = createContext<IStoreContext>({
  authStore,
  modalStore,
  themeStore
})
