import { createContext } from 'react'

import { AuthStore } from './stores/auth.store'

interface IStoreContext {
  authStore: AuthStore
}

const authStore = new AuthStore()

export const StoreContext = createContext<IStoreContext>({
  authStore
})
