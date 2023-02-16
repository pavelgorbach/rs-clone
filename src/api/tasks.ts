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

export async function createTask(
  userId: string | undefined,
  boardId: string | undefined,
  columnId: string | undefined,
  params: Pick<Task, 'title' | 'order' | 'description'>
) {
  if (!userId || !boardId || !columnId) throw new Error('Invalid data')
  const { data } = await client.post<Task>(`/boards/${boardId}/columns/${columnId}/tasks`, {
    ...params,
    userId,
    users: [userId]
  })
  return data
}

export async function patchTask(
  boardId: string | undefined,
  columnId: string | undefined,
  taskId: string | undefined,
  params: {
    title: string
    order: number
    description: string
    userId: string
    users: string[]
  }
) {
  if (!boardId || !columnId || !taskId) throw new Error('Invalid data')
  const { data } = await client.put<Task>(
    `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    {
      ...params,
      columnId
    }
  )
  return data
}

export async function deleteTask(boardId?: string, columnId?: string, taskId?: string) {
  if (!boardId || !columnId || !taskId) throw new Error('Invalid data')
  const { data } = await client.delete<Task>(
    `boards/${boardId}/columns/${columnId}/tasks/${taskId}`
  )
  return data
}
