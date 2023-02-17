import { observer } from 'mobx-react-lite'

import { Modal, CreateTaskForm } from '@/components'
import useModalStore from '@/hooks/useModalStore'
import useAddTask from '@/hooks/useAddTask'

function CreateTaskModalView() {
  const modal = useModalStore()
  const { name, data } = modal.state

  const close = () => modal.close()

  const addTask = useAddTask(close)

  return (
    <Modal isOpen={name === 'add-task'} onClose={close}>
      <CreateTaskForm
        onSubmit={(formData) => {
          if (name === 'add-task') {
            addTask.mutate({ ...data, ...formData })
          }
        }}
      />
    </Modal>
  )
}

export const CreateTaskModal = observer(CreateTaskModalView)
