import client from './client'
import { Column } from './types'

export async function fetchColumnsByBoardId(boardId?: string) {
  if (!boardId) throw new Error('Invalid data')
  const { data } = await client.get<Column[]>(`/boards/${boardId}/columns`)
  return data
}

export async function fetchColumnById(boardId?: string, columnId?: string) {
  if (!boardId || !columnId) throw new Error('Invalid data')
  const { data } = await client.get<Column[]>(`/boards/${boardId}/columns/${columnId}`)
  return data
}

export async function createColumn(
  boardId: string | undefined,
  params: { order: number; title: string }
) {
  if (!boardId) throw new Error('Invalid data')
  const { data } = await client.post<Column>(`/boards/${boardId}/columns`, params)
  return data
}

export async function patchColumn(
  boardId: string | undefined,
  columnId: string | undefined,
  params: { title: string; order: number }
) {
  if (!boardId || !columnId) throw new Error('Invalid data')
  const { data } = await client.put<Column>(`/boards/${boardId}/columns/${columnId}`, params)
  return data
}

export async function deleteColumn(boardId?: string, columnId?: string) {
  if (!boardId || !columnId) throw new Error('Invalid data')
  const { data } = await client.delete<Column>(`boards/${boardId}/columns/${columnId}`)
  return data
}

export async function fetchColumnsSet(ids: string[]) {
  const { data } = await client.get<Column[]>('/columnsSet', { params: { ids } })
  return data
}

export async function fetchUserColumns(uid: string) {
  if (!uid) throw new Error('Invalid data')
  const { data } = await client.get<Column[]>('/columnsSet', { params: { uid } })
  return data
}

export async function updateColumnsSet(columns: { _id: string; order: number }[]) {
  const { data } = await client.patch<Column[]>('/columnsSet', columns)
  return data
}
