import { observer } from 'mobx-react-lite'

import { Modal, EditTaskForm, EditTaskFormData } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useUpdateTask from '@/hooks/useUpdateTask'

function EditTaskModalView() {
  const updateTask = useUpdateTask()
  const modal = useModalStore()

  const { isLoading } = updateTask
  const { name, data } = modal.state

  const close = () => modal.close()

  const handleUpdateTask = async (formData: EditTaskFormData) => {
    if (name === 'edit-task') {
      await updateTask.mutateAsync({
        boardId: data.boardId,
        columnId: data.columnId,
        taskId: data._id,
        userId: data.userId,
        users: data.users,
        order: data.order,
        ...formData
      })

      close()
    }
  }

  return (
    <Modal isOpen={name === 'edit-task'} onClose={close}>
      <EditTaskForm
        title={name === 'edit-task' ? data.title : ''}
        description={name === 'edit-task' ? data.description : ''}
        onSubmit={handleUpdateTask}
        disabled={isLoading}
      />
    </Modal>
  )
}

export const EditTaskModal = observer(EditTaskModalView)
