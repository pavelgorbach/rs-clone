import { ReactNode } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'

import { Button } from './Button'
import { Task } from '@/api'
import useModalStore from '@/hooks/useModalStore'

export type Props = {
  column: {
    userId: string | undefined
    tasks: Task[] | undefined
    _id: string
    title: string
    order: number
    boardId: string
  }
  children: ReactNode
}

export function Column({ column, children }: Props) {
  const { t } = useTranslation()

  const modal = useModalStore()

  const onEdit = () => {
    modal.open({ name: 'edit-column', data: column })
  }

  const onDelete = () => {
    modal.open({
      name: 'delete-column',
      data: { boardId: column.boardId, columnId: column._id }
    })
  }

  const onAddTaskClick = () => {
    if (!column.userId) return

    modal.open({
      name: 'add-task',
      data: {
        userId: column.userId,
        boardId: column.boardId,
        columnId: column._id,
        order: column.tasks?.length || 0
      }
    })
  }

  return (
    <>
      <div className="flex flex-1 flex-col bg-gray-100 dark:bg-slate-500">
        <div className="m-3 mb-0 flex gap-2">
          <h3 className="!my-0 flex-1 dark:text-slate-200">{column.title}</h3>

          <button onClick={onEdit}>
            <PencilIcon className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-green-100 hover:text-green-500  dark:bg-slate-500" />
          </button>

          <button onClick={onDelete}>
            <TrashIcon className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-red-100 hover:text-red-500  dark:bg-slate-500" />
          </button>
        </div>

        {children}

        <Button
          text={t('column.addTask')}
          onClick={onAddTaskClick}
          className=" mx-2 dark:bg-slate-700"
        />
      </div>
    </>
  )
}
