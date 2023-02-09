import { Board } from './types'

const boards: Map<string, Board> = new Map()

function Board(data: Partial<Board>, ownerId: string): Board {
  return {
    _id: Math.random().toString(),
    title: data.title || '',
    owner: ownerId,
    users: []
  }
}

export function getBoards() {
  return Promise.resolve([...boards.values()])
}

export function createBoard(data: Omit<Board, '_id'>, ownerId: string) {
  const newBoard = Board(data, ownerId)
  boards.set(newBoard._id, newBoard)
  return Promise.resolve(newBoard)
}

export function deleteBoard(id: string) {
  boards.delete(id)
  return Promise.resolve(id)
}

export function updateBoard(data: Board) {
  boards.set(data._id, data)
  return Promise.resolve(data)
}
