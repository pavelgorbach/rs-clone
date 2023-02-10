import client from './client'
import { Board, Task } from './types'

export async function fetchTasks(id: string){
  const resp = await client.get<Task[]>('/tasksSet')
  return resp.data
}