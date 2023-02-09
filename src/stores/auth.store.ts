import { makeAutoObservable } from 'mobx'

import { User, client } from '@/api'
import jwtDecode, { JwtPayload } from 'jwt-decode'

export class AuthStore {
  private authenticated = false
  private authUser: Omit<User, 'name'> | null = null

  constructor() {
    makeAutoObservable(this)
    const token = this.getToken()
    this.authenticated = !!token

    if (token) {
      this.setToken(token)
    }
  }

  private setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated
  }

  setToken(token: string) {
    const decoded = jwtDecode<JwtPayload & { id: string; login: string }>(token)

    this.setAuthUser({
      _id: decoded.id,
      login: decoded.login
    })

    this.setAuthenticated(true)

    client.defaults.headers.common['Authorization'] = `Bearer ${token}`

    localStorage.setItem('token', token)
  }

  setAuthUser(data: Omit<User, 'name'>) {
    this.authUser = data
  }

  private getToken() {
    return localStorage.getItem('token')
  }

  getUser() {
    return this.authUser
  }

  isAuthenticated() {
    return this.authenticated
  }
}
