export type User = {
  _id: string
  name: string
  login: string
}

export type Board = {
  _id: string
  title: string
  owner: string
  users: string[]
}

export type Column = {
  _id: string
  title: string
  order: number
  boardId: string
}

export type Task = {
  _id: string
  title: string
  order: number
  boardId: string
  columnId: string
  description: string
  userId: string
  users: string[]
}

export type File = {
  _id: string
  name: string
  taskId: string
  boardId: string
  path: string
}

export type Point = {
  _id: string
  title: string
  taskId: string
  boardId: string
  done: boolean
}

export type ErrorResponse = {
  statusCode: number
  message: string
}
