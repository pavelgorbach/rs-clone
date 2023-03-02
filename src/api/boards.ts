import client from './client'
import { Board } from './types'

export async function fetchBoards() {
  const resp = await client.get<Board[]>('/boards')
  return resp.data
}

export async function createBoard(data: Omit<Board, '_id'>) {
  const resp = await client.post<Board>('/boards', data)
  return resp.data
}

export async function fetchBoardById(id?: string) {
  if (!id) Promise.reject('Board id is not provided.')
  const resp = await client.get<Board>(`/boards/${id}`)
  return resp.data
}

export async function updateBoard({ _id, ...rest }: Board) {
  const resp = await client.put<Board>(`/boards/${_id}`, rest)
  return resp.data
}

export async function deleteBoard(id: string) {
  const resp = await client.delete<Board>(`/boards/${id}`)
  return resp.data
}

export async function fetchBoardsSet(ids: string[]) {
  const resp = await client.get<Board[]>('/boardsSet', { params: { ids } })
  return resp.data
}

export async function fetchUserBoards(uid?: string) {
  if (!uid) {
    Promise.reject('User id is not provided.')
  }

  const resp = await client.get<Board[]>(`/boardsSet/${uid}`)
  return resp.data
}
