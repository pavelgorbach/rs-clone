import { observer } from 'mobx-react-lite'

import { Modal, CreateTaskForm, CreateTaskFormData } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useAddTask from '@/hooks/useAddTask'

function CreateTaskModalView() {
  const addTask = useAddTask()
  const modal = useModalStore()

  const { isLoading } = addTask
  const { name, data } = modal.state

  const close = () => modal.close()

  const handleAddTask = async (formData: CreateTaskFormData) => {
    if (name === 'add-task') {
      await addTask.mutateAsync({ ...data, ...formData })
      close()
    }
  }

  return (
    <Modal isOpen={name === 'add-task'} onClose={close}>
      <CreateTaskForm onSubmit={handleAddTask} disabled={isLoading} />
    </Modal>
  )
}

export const CreateTaskModal = observer(CreateTaskModalView)
