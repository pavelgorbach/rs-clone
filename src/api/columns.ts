import { Column } from './types'

let columns: Map<string, Column> = new Map()

function Column(data: Partial<Column>): Column {
  return {
    _id: Math.random().toString(),
    title: data.title || '',
    order: data.order || 0,
    boardId: data.boardId || ''
  }
}

export function getColumns() {
  return Promise.resolve([...columns.values()])
}

export function createColumn(data: Column) {
  const newColumn = Column(data)
  columns.set(newColumn._id, newColumn)
  return Promise.resolve(newColumn)
}

export function setColumns(data: Column[]) {
  columns = new Map(data.map((c) => [c._id, c]))
  return Promise.resolve(columns)
}
