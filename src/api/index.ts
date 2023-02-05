export type Board = {
  id: number
  name: string
  description: string
}

export type Column = {
  id: number
  name: string
  order: number
}

export const boards: Map<number, Board> = new Map()

let columns: Map<number, Column> = new Map()

function Board(data: Partial<Board>) {
  return {
    id: Math.random(),
    name: data.name || '',
    description: data.description || ''
  }
}

function Column(data: Partial<Column>) {
  return {
    id: Math.random(),
    name: data.name || '',
    order: data.order || 0
  }
}

export function getBoards() {
  return Promise.resolve([...boards.values()])
}

export function createBoard(data: Omit<Board, 'id'>) {
  const newBoard = Board(data)
  boards.set(newBoard.id, newBoard)
  return Promise.resolve(newBoard)
}

export function deleteBoard(id: number) {
  boards.delete(id)
  return Promise.resolve(id)
}

export function updateBoard(data: Board) {
  boards.set(data.id, data)
  return Promise.resolve(data)
}

export function getColumns() {
  return Promise.resolve([...columns.values()])
}

export function createColumn(data: Column) {
  const newColumn = Column(data)
  columns.set(newColumn.id, newColumn)
  return Promise.resolve(newColumn)
}

export function setColumns(data: Column[]) {
  columns = new Map(data.map((c) => [c.id, c]))
  return Promise.resolve(columns)
}
