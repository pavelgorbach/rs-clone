import { memo } from 'react'

import { CreateBoardModal } from './Modals/CreateBoardModal'
import { CreateColumnModal } from './Modals/CreateColumnModal'
import { CreateTaskModal } from './Modals/CreateTaskModal'
import { EditBoardModal } from './Modals/EditBoardModal'
import { EditColumnModal } from './Modals/EditColumnModal'
import { EditTaskModal } from './Modals/EditTaskModal'
import { DeleteBoardModal } from './Modals/DeleteBoardModal'
import { DeleteColumnModal } from './Modals/DeleteColumnModal'
import { DeleteTaskModal } from './Modals/DeleteTaskModal'

export function ModalsView() {
  return (
    <>
      <CreateBoardModal />
      <CreateColumnModal />
      <CreateTaskModal />
      <EditBoardModal />
      <EditColumnModal />
      <EditTaskModal />
      <DeleteBoardModal />
      <DeleteColumnModal />
      <DeleteTaskModal />
    </>
  )
}

export const Modals = memo(ModalsView)
