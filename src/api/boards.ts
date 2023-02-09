import client from './client'
import { Board } from './types'

function Board(data: Omit<Board, '_id'>): Omit<Board, '_id'> {
  return {
    title: data.title,
    owner: data.owner,
    users: []
  }
}

export async function fetchBoards() {
  const resp = await client.get<Board[]>('/boards')
  return resp.data
}

export async function createBoard(data: Omit<Board, '_id'>) {
  const newBoard = Board(data)
  const resp = await client.post<Board>('/boards', newBoard)
  return resp.data
}

export async function fetchBoardById(id: string) {
  const resp = await client.get<Board>(`/boards${id}`)
  return resp.data
}

export async function patchBoard(data: Board) {
  const resp = await client.put<Board>(`/boards${data._id}`, data)
  return resp.data
}

export async function deleteBoard(id: string) {
  const resp = await client.delete(`boards/${id}`)
  return resp.data
}

export async function fetchBoardsSet(ids: string[]) {
  const resp = await client.get<Board[]>('/boardsSet', { params: { ids } })
  return resp.data
}

export async function fetchUserBoards(uid: string) {
  const resp = await client.get<Board[]>(`/boardsSet/${uid}`)
  return resp.data
}
