import { ReactNode } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'

export type Props = {
  title: string
  children: ReactNode
  onEdit(): void
  onDelete(): void
}

export function Column({ title, children, onEdit, onDelete }: Props) {
  return (
    <>
      <div className="flex flex-1 flex-col bg-gray-100">
        <div className="m-3 mb-0 flex gap-2">
          <h3 className="!my-0 flex-1">{title}</h3>

          <button onClick={onEdit}>
            <PencilIcon className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-green-100 hover:text-green-500" />
          </button>

          <button onClick={onDelete}>
            <TrashIcon className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-red-100 hover:text-red-500" />
          </button>
        </div>

        {children}
      </div>
    </>
  )
}
