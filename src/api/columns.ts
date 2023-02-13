import client from './client'
import { Column } from './types'

function Column(data: Omit<Column, '_id' | 'boardId'>): Omit<Column, '_id' | 'boardId'> {
  return {
    title: data.title,
    order: data.order
  }
}

export async function fetchColumns(boardId?: string) {
  if (!boardId) Promise.reject('Board id is not provided.')
  const { data } = await client.get<Column[]>(`/boards/${boardId}/columns`)
  return data
}

export async function createColumn(data: Omit<Column, '_id'>) {
  const newColumn = Column(data)
  const resp = await client.post<Column>(`/boards/${data.boardId}/columns`, newColumn)
  return resp.data
}

export async function fetchColumnById(boardId: string, columnId: string) {
  const resp = await client.get<Column[]>(`/boards/${boardId}/columns/${columnId}`)
  return resp.data
}

export async function patchColumn({ boardId, _id, ...rest }: Column) {
  const resp = await client.put<Column>(`/boards/${boardId}/columns/${_id}`, rest)
  return resp.data
}

export async function deleteColumn(boardId?: string, columnId?: string) {
  if (!boardId || !columnId) {
    throw new Error('Board or column id is not provided.')
  }
  const { data } = await client.delete<Column>(`boards/${boardId}/columns/${columnId}`)
  return data
}

export async function fetchColumnsSet(ids: string[]) {
  const resp = await client.get<Column[]>('/columnsSet', { params: { ids } })
  return resp.data
}

export async function fetchUserColumns(uid: string) {
  const resp = await client.get<Column[]>('/columnsSet', { params: { uid } })
  return resp.data
}

export async function updateColumnsSet(columns: Pick<Column, '_id' | 'order'>[]) {
  const resp = await client.patch<Column[]>('/columnsSet', columns)
  return resp.data
}

export async function createColumnsSet(columns: Omit<Column, '_id'>[]) {
  const resp = await client.post<Column[]>('/columnsSet', columns)
  return resp.data
}
