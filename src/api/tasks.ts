import client from './client'
import { Task } from './types'

export async function fetchTasks(id: string){
  const resp = await client.get<Task[]>(`/tasksSet?userId=${id}`)
  return resp.data
}