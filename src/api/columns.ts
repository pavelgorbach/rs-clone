import client from './client'
import { Column } from './types'

function Column(data: Omit<Column, '_id'>): Omit<Column, '_id'> {
  return {
    title: data.title,
    order: data.order,
    boardId: data.boardId
  }
}

export async function fetchColumns(boardId: string) {
  const resp = await client.get<Column[]>(`/boards/${boardId}/columns`)
  return resp.data
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

export async function updateColumn(boardId: string, columnId: string, data: Partial<Column>) {
  const resp = await client.put<Column[]>(`/boards/${boardId}/columns/${columnId}`, data)
  return resp.data
}

export async function deleteColumn(boardId: string, columnId: string) {
  const resp = await client.delete(`boards/${boardId}/columns/${columnId}`)
  return resp.data
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
  const resp = await client.patch<Column[]>('/columnsSet', { columns })
  return resp.data
}

export async function createColumnsSet(columns: Omit<Column, '_id'>[]) {
  const resp = await client.post<Column[]>('/columnsSet', { columns })
  return resp.data
}
