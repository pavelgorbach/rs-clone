import { CreateColumnModal } from './CreateColumnModal'
import { CreateTaskModal } from './CreateTaskModal'
import { DeleteColumnModal } from './DeleteColumnModal'
import { DeleteTaskModal } from './DeleteTaskModal'
import { EditColumnModal } from './EditColumnModal'
import { EditTaskModal } from './EditTaskModal'

export function Modals() {
  return (
    <>
      <CreateColumnModal />
      <EditColumnModal />
      <DeleteColumnModal />

      <CreateTaskModal />
      <EditTaskModal />
      <DeleteTaskModal />
    </>
  )
}
