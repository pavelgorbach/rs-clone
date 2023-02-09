import { EditProfileFormData } from '@/components'
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

export async function updateUser(uid: string, data: EditProfileFormData) {
  const resp = await client.put<User>(`/users/${uid}`, data)
  return resp.data
}

export async function deleteUser(id: string) {
  const resp = await client.delete<User>(`/users/${id}`)
  return resp.data
}
