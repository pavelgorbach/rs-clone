import { makeAutoObservable } from 'mobx'

import { Column, Task } from '@/api/types'

type State =
  | { name: 'add-column'; data: { boardId: string; order: number } }
  | { name: 'edit-column'; data: Column }
  | { name: 'delete-column'; data: { boardId: string; columnId: string } }
  | {
      name: 'add-task'
      data: { userId: string; boardId: string; columnId: string; order: number }
    }
  | { name: 'edit-task'; data: Task }
  | { name: 'delete-task'; data: { boardId: string; columnId: string; taskId: string } }
  | { name: null; data: null }

export class ModalStore {
  state: State

  constructor() {
    makeAutoObservable(this)

    this.state = { name: null, data: null }
  }

  openModal(state: State) {
    this.state = state
  }

  closeModal() {
    this.state = { name: null, data: null }
  }
}
