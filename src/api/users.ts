import client from './client'
import { User } from './types'

export async function fetchUsers() {
  const resp = await client.get<User[]>('/users')
  return resp.data
}

export async function fetchUser(id: string) {
  const resp = await client.get<User>(`/users/${id}`)
  return resp.data
}

export async function updateUser(id: string, data: Partial<User>) {
  const resp = await client.put<User>(`/users/${id}`, data)
  return resp.data
}

export async function deleteUser(id: string) {
  const resp = await client.delete<User>(`/users/${id}`)
  return resp.data
}
