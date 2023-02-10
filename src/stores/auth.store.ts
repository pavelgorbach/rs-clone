import { makeAutoObservable } from 'mobx'
import jwtDecode, { JwtPayload } from 'jwt-decode'

import { client } from '@/api'
export class AuthStore {
  isAuthenticated = false
  userId: string | undefined
  exp: number | undefined
  iat: number | undefined

  constructor() {
    makeAutoObservable(this)

    const token = this.getToken()
    this.isAuthenticated = !!token

    if (token) {
      this.authenticate(token)
    }
  }

  private getToken() {
    return localStorage.getItem('token')
  }

  authenticate(token: string) {
    localStorage.setItem('token', token)

    const decoded = jwtDecode<JwtPayload & { id: string }>(token)

    this.userId = decoded.id
    this.exp = decoded.exp
    this.iat = decoded.iat
    this.isAuthenticated = true

    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  unauth() {
    this.isAuthenticated = false
    this.userId = undefined
    this.exp = undefined
    this.iat = undefined
    localStorage.removeItem('token')
    client.defaults.headers.common['Authorization'] = null
  }
}
