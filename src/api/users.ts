import client from './client'
import { User } from './types'

export async function fetchUsers() {
  const resp = await client.get<User[]>('/users')
  return resp.data
}

export async function fetchUser(id?: string) {
  if (!id) Promise.reject('User id is not provided.')
  const resp = await client.get<User>(`/users/${id}`)
  return resp.data
}

export async function updateUser({ _id, ...data }: Partial<User> & { password: string }) {
  const resp = await client.put<User>(`/users/${_id}`, data)
  return resp.data
}

export async function deleteUser(id?: string) {
  if (!id) {
    throw new Error('User id is not provided.')
  }

  const resp = await client.delete<User>(`/users/${id}`)
  return resp.data
}
