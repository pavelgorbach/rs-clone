import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import {
  Button,
  Modal,
  EditColumnForm,
  EditColumnFormData,
  CreateTaskForm,
  CreateTaskFormData
} from '@/components'
import { Column as ColumnDTO, Task } from '@/api'

type ModalName = 'edit' | 'delete' | 'create-task'

type Props = ColumnDTO & {
  tasks?: Task[]
  onDelete(id: string): void
  onUpdate(data: ColumnDTO): void
  onAddTask(data: Pick<Task, 'boardId' | 'columnId' | 'title' | 'description'>): void
  onUpdateTask(): void
  onDeleteTask(): void
}

export function Column({
  _id,
  title,
  order,
  boardId,
  tasks,
  onDelete,
  onUpdate,
  onAddTask
}: Props) {
  const { t } = useTranslation()
  const [modal, setModal] = useState<ModalName | null>(null)

  const openModal = (name: ModalName) => {
    setModal(name)
  }

  const closeModal = () => {
    setModal(null)
  }

  const openEditModal = (e: React.MouseEvent) => {
    e.preventDefault()
    openModal('edit')
  }

  const openDeleteModal = (e: React.MouseEvent) => {
    e.preventDefault()
    openModal('delete')
  }

  const handleDelete = () => {
    closeModal()
    onDelete(_id)
  }

  const handleUpdate = ({ title }: EditColumnFormData) => {
    closeModal()
    onUpdate({
      title,
      _id,
      order,
      boardId
    })
  }

  const openCreateTaskModal = (e: React.MouseEvent) => {
    e.preventDefault()
    openModal('create-task')
  }

  const handleAddTask = (data: CreateTaskFormData) => {
    closeModal()
    onAddTask({
      boardId,
      columnId: _id,
      ...data
    })
  }

  return (
    <>
      <div className="flex flex-1 flex-col bg-gray-100">
        <div className="m-3 mb-0 flex gap-2">
          <h3 className="!my-0 flex-1">{title}</h3>

          <button onClick={openEditModal}>
            <PencilIcon className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-green-100 hover:text-green-500" />
          </button>

          <button onClick={openDeleteModal}>
            <TrashIcon className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-red-100 hover:text-red-500" />
          </button>
        </div>

        <div className="m-2 flex w-64 flex-1 flex-col gap-1 border border-dashed border-gray-300 p-1">
          {tasks?.map((task) => {
            return (
              <div key={task._id} className="bg-white p-1">
                <div>{task.title}</div>
                <div className="font-thin">{task.description}</div>
              </div>
            )
          })}
        </div>

        <Button text={t('column.addTask')} onClick={openCreateTaskModal} />
      </div>

      <Modal isOpen={modal === 'edit'} onClose={closeModal} title={t('common.edit')}>
        <EditColumnForm title={title} onSubmit={handleUpdate} />
      </Modal>

      <Modal isOpen={modal === 'delete'} onClose={closeModal} title={t('common.confirmation')}>
        <div className="prose">
          <p>{t('column.question')}</p>

          <div className="flex justify-between">
            <Button type="success" text={t('common.cancel')} onClick={closeModal} />

            <Button type="error" text={t('common.delete')} onClick={handleDelete} />
          </div>
        </div>
      </Modal>

      <Modal isOpen={modal === 'create-task'} onClose={closeModal}>
        <CreateTaskForm onSubmit={handleAddTask} />
      </Modal>
    </>
  )
}
