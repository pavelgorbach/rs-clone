import { observer } from 'mobx-react-lite'

import { Modal } from './Modal'
import { EditTaskForm } from './EditTaskForm'
import useModalStore from '@/hooks/useModalStore'
import useUpdateTask from '@/hooks/useUpdateTask'

function EditTaskModalView() {
  const store = useModalStore()
  const { name, data } = store.state

  const close = () => store.closeModal()

  const updateTask = useUpdateTask(close)

  return (
    <Modal isOpen={name === 'edit-task'} onClose={close}>
      <EditTaskForm
        title={name === 'edit-task' ? data.title : ''}
        description={name === 'edit-task' ? data.description : ''}
        onSubmit={(formData) => {
          if (name === 'edit-task') {
            updateTask.mutate({
              boardId: data.boardId,
              columnId: data.columnId,
              taskId: data._id,
              userId: data.userId,
              users: data.users,
              order: data.order,
              ...formData
            })
          }
        }}
      />
    </Modal>
  )
}

export const EditTaskModal = observer(EditTaskModalView)
