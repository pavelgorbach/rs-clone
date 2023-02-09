import axios from 'axios'

import { BASE_URL } from './client'
import { User } from './types'

export async function signUp(data: Omit<User, '_id'> & { password: string }) {
  const resp = await axios.post<User>(`${BASE_URL}/auth/signup`, data)
  return resp.data
}

export async function signIn(data: { login: string; password: string }) {
  const resp = await axios.post<{ token: string }>(`${BASE_URL}/auth/signin`, data)
  return resp.data
}
