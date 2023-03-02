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

export async function fetchColumnsSet(ids: string[]) {
  const { data } = await client.get<Column[]>('/columnsSet', { params: { ids } })
  return data
}

export async function fetchUserColumns(uid: string) {
  if (!uid) throw new Error('Invalid data')
  const { data } = await client.get<Column[]>('/columnsSet', { params: { uid } })
  return data
}

export async function createColumn(query: { boardId: string; order: number; title: string }) {
  const { boardId, ...params } = query
  const { data } = await client.post<Column>(`/boards/${boardId}/columns`, params)
  return data
}

export async function updateColumn(query: {
  boardId: string
  columnId: string
  title: string
  order: number
}) {
  const { boardId, columnId, ...params } = query
  const { data } = await client.put<Column>(`/boards/${boardId}/columns/${columnId}`, params)
  return data
}

export async function updateColumnsSet(columns: { _id: string; order: number }[]) {
  const { data } = await client.patch<Column[]>('/columnsSet', columns)
  return data
}

export async function deleteColumn({ boardId, columnId }: { boardId: string; columnId: string }) {
  if (!boardId || !columnId) throw new Error('Invalid data')
  const { data } = await client.delete<Column>(`boards/${boardId}/columns/${columnId}`)
  return data
}
