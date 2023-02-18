import client from './client'
import { FileDTO } from './types'

export async function uploadFile(file: File, uid?: string) {
  if (!uid) {
    throw new Error('User Id not found. Log out!')
  }

  const data = new FormData()
  data.append('boardId', uid)
  data.append('taskId', uid)
  data.append('file', file)
  const resp = await client.post<File & FileDTO>(`/file`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return resp.data
}

export async function getFile(id: string | undefined) {
  const resp = await client.get<(File & FileDTO)[]>(`/file?taskId=${id}`)
  if (resp.data && resp.data[0]) return resp.data[0]
  else
    return {
      _id: '',
      name: '',
      taskId: '',
      boardId: '',
      path: ''
    }
}

export async function deleteFile(fileId: string) {
  const resp = await client.delete<FileDTO>(`/file/${fileId}`)
  return resp.data
}
