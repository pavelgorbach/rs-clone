import { createContext, useState, ReactNode } from 'react'

import { fakeAuthProvider } from '@/api/auth'

type AuthContextType = {
  user: string | null
  signin: (login: string, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null)

  const signin = (newUser: string, callback: VoidFunction) => {
    console.log({ newUser })
    return fakeAuthProvider.signin(() => {
      setUser(newUser)
      callback()
    })
  }

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null)
      callback()
    })
  }

  const value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
