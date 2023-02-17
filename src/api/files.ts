import axios from 'axios'

import { BASE_URL } from './client'
import { File } from './types'

export async function uploadFile(file:File ) {
  const resp = await axios.post<File>(`${BASE_URL}/file`, file)
  return resp.data
}

export async function getFile(id: string) {
  const resp = await axios.get<File>(`${BASE_URL}/file?taskId=${id}`)
  return resp.data
}

export async function deleteFile(id: string) {
  const resp = await axios.delete<File>(`${BASE_URL}/file/${id}`)
  return resp.data
}
