import { observer } from 'mobx-react-lite'

import { Modal } from './Modal'
import { CreateTaskForm } from './CreateTaskForm'
import useModalStore from '@/hooks/useModalStore'
import useAddTask from '@/hooks/useAddTask'

function CreateTaskModalView() {
  const store = useModalStore()
  const { name, data } = store.state

  const close = () => store.closeModal()

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
