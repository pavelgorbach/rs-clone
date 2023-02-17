import { createContext } from 'react'

import { AuthStore } from './stores/auth.store'
import { ModalStore } from './stores/modal.store'
interface IStoreContext {
  authStore: AuthStore
  modalStore: ModalStore
}

const authStore = new AuthStore()
const modalStore = new ModalStore()

export const StoreContext = createContext<IStoreContext>({
  authStore,
  modalStore
})
