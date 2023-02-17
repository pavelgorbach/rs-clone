import client from './client'

export async function uploadFile(file: File, uid?: string) {
  if (!uid) {
    throw new Error('shlyapa')
  }

  const data = new FormData()

  for (const pair of data.entries()) {
    console.log(pair[0] + ', ' + pair[1])
  }

  const resp = await client.post<File>(`/file`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return resp.data
}

export async function getFile(id: string) {
  const resp = await client.get<File>(`/file?taskId=${id}`)
  return resp.data
}

export async function deleteFile(id: string) {
  const resp = await client.delete<File>(`/file/${id}`)
  return resp.data
}
