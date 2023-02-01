export type Board = {
  id: number
  name: string
}

export type Column = {
  id: number
  name: string
}

const boards: Board[] = []

const columns: Column[] = []

export function getBoards() {
  return Promise.resolve(boards)
}

export function postBoard(board: Board) {
  boards.push(board)
  return Promise.resolve(board)
}

export function getColumns() {
  return Promise.resolve(columns)
}

export function postColumn(column: Column) {
  columns.push(column)
  return Promise.resolve(column)
}
