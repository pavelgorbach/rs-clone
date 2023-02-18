import { observer } from 'mobx-react-lite'

import { Modal, EditTaskForm, EditTaskFormData } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useUpdateTask from '@/hooks/useUpdateTask'

function EditTaskModalView() {
  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const updateTask = useUpdateTask()

  const handleUpdateTask = async (formData: EditTaskFormData) => {
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
  }

  return (
    <Modal isOpen={name === 'edit-task'} onClose={close}>
      <EditTaskForm
        title={name === 'edit-task' ? data.title : ''}
        description={name === 'edit-task' ? data.description : ''}
        onSubmit={handleUpdateTask}
      />
    </Modal>
  )
}

export const EditTaskModal = observer(EditTaskModalView)
