import client from './client'

import { Task } from './types'

function Task(
  data: Omit<Task, '_id' | 'boardId' | 'columnId'>
): Omit<Task, '_id' | 'boardId' | 'columnId'> {
  return {
    title: data.title,
    order: data.order,
    description: data.description,
    userId: data.userId,
    users: data.users
  }
}

export async function fetchTasksByUserId(uid?: string) {
  if (!uid) {
    throw new Error('User id is not provided')
  }

  const { data } = await client.get<Task[]>(`/tasksSet?userId=${uid}`)
  return data
}

export async function fetchTasksByBoardId(boardId?: string) {
  if (!boardId) {
    throw new Error('Board id is not provided')
  }
  const { data } = await client.get<Task[]>(`/tasksSet/${boardId}`)
  return data
}

export async function createTask({ boardId, columnId, ...data }: Omit<Task, '_id'>) {
  const newTask = Task(data)
  const resp = await client.post<Task>(`/boards/${boardId}/columns/${columnId}/tasks`, newTask)
  return resp.data
}
