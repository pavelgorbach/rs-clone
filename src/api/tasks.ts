import client from './client'
import { Task } from './types'

export async function fetchTasksByUserId(uid?: string) {
  if (!uid) throw new Error('Invalid data')
  const { data } = await client.get<Task[]>(`/tasksSet?userId=${uid}`)
  return data
}

export async function fetchTasksByBoardId(boardId?: string) {
  if (!boardId) throw new Error('Invalid data')
  const { data } = await client.get<Task[]>(`/tasksSet/${boardId}`)
  return data
}

export async function createTask(query: {
  userId: string
  boardId: string
  columnId: string
  title: string
  order: number
  description: string
}) {
  const { boardId, columnId, userId, ...params } = query
  const { data } = await client.post<Task>(`/boards/${boardId}/columns/${columnId}/tasks`, {
    ...params,
    users: [userId]
  })
  return data
}

export async function updateTask(query: {
  boardId: string
  columnId: string
  taskId: string
  title: string
  order: number
  description: string
  userId: string
  users: string[]
}) {
  const { boardId, columnId, taskId, ...params } = query
  const { data } = await client.put<Task>(
    `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    { ...params, columnId }
  )
  return data
}

export async function deleteTask(query: { boardId?: string; columnId?: string; taskId?: string }) {
  const { boardId, columnId, taskId } = query
  const { data } = await client.delete<Task>(
    `boards/${boardId}/columns/${columnId}/tasks/${taskId}`
  )
  return data
}
