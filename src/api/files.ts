import client from './client'
import { File as FileDTO } from './types'

export async function uploadUserPhoto({ file, userId }: { file: File; userId?: string }) {
  if (!userId) throw new Error('User Id not found. Log out!')

  const formData = new FormData()
  formData.append('boardId', userId)
  formData.append('taskId', userId)
  formData.append('file', file)

  const { data } = await client.post<FileDTO>(`/file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data
}

export async function getUserPhoto(userId?: string) {
  if (!userId) throw new Error('Invalid data')

  const { data } = await client.get<FileDTO[]>(`/file?taskId=${userId}`)
  return data[0] || ({} as FileDTO)
}

export async function deleteUserPhoto(fileId: string) {
  if (!fileId) throw new Error('Invalid data')

  const { data } = await client.delete<FileDTO>(`/file/${fileId}`)
  return data
}
