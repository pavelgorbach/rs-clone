import { makeAutoObservable } from 'mobx'
import jwtDecode, { JwtPayload } from 'jwt-decode'

import { client } from '@/api'
export class AuthStore {
  isAuthenticated = false
  userId: string | undefined
  exp = 0
  iat = 0

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

  validateToken(token: string) {
    const decoded = jwtDecode<JwtPayload & { id: string }>(token)
    return (decoded.exp ?? 0) * 1000 < Date.now()
  }

  authenticate(token: string) {
    const decoded = jwtDecode<JwtPayload & { id: string }>(token)
    const isExpired = this.validateToken(token)

    if (isExpired) {
      this.unauth()
      return
    }

    localStorage.setItem('token', token)

    this.userId = decoded.id
    this.exp = (decoded.exp ?? 0) * 1000
    this.iat = (decoded.iat ?? 0) * 1000
    this.isAuthenticated = true

    client.defaults.headers.common['Authorization'] = `Bearer ${token}`
    client.interceptors.response.use(
      (originResp) => {
        return originResp
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          this.unauth()
        }
        return error
      }
    )
  }

  unauth() {
    this.isAuthenticated = false
    this.userId = undefined
    this.exp = 0
    this.iat = 0
    localStorage.removeItem('token')
    client.defaults.headers.common['Authorization'] = null
  }
}
