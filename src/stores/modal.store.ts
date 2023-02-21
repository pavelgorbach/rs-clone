import { makeAutoObservable } from 'mobx'

import { Board, Column, Task } from '@/api/types'

type State =
  | { name: null; data: null }
  | { name: 'add-board'; data: { userId: string } }
  | { name: 'edit-board'; data: Board }
  | { name: 'delete-board'; data: { boardId: string } }
  | { name: 'add-column'; data: { boardId: string; order: number } }
  | { name: 'edit-column'; data: Column }
  | { name: 'delete-column'; data: { boardId: string; columnId: string } }
  | {
      name: 'add-task'
      data: { userId: string; boardId: string; columnId: string; order: number }
    }
  | { name: 'edit-task'; data: Task }
  | { name: 'delete-task'; data: { boardId: string; columnId: string; taskId: string } }
  | { name: 'edit-user'; data: { userId: string; name: string; login: string } }
  | { name: 'delete-user'; data: { userId: string } }
  | { name: 'upload-user-photo'; data: { userId: string } }

const DEFAULT_STATE: State = { name: null, data: null }
export class ModalStore {
  state: State = DEFAULT_STATE

  constructor() {
    makeAutoObservable(this)
  }

  open(state: State) {
    this.state = state
  }

  close() {
    this.state = DEFAULT_STATE
  }
}
