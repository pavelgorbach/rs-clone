import { Board } from './types'

const boards: Map<string, Board> = new Map()

function Board(data: Partial<Board>): Board {
  return {
    _id: Math.random().toString(),
    title: data.title || '',
    owner: data.owner || '',
    users: []
  }
}

export function getBoards() {
  return Promise.resolve([...boards.values()])
}

export function createBoard(data: Omit<Board, '_id'>) {
  const newBoard = Board(data)
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
