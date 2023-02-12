import { useState } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
type Props = {
  id: number
  name: string
}
type ModalName = 'edit' | 'delete'
export function Column(props: { title: string }) {
  const [modal, setModal] = useState<ModalName | null>(null)

  const openModal = (name: ModalName) => {
    setModal(name)
  }

  const openEditModal = (e: React.MouseEvent) => {
    e.preventDefault()
    openModal('edit')
  }

  const openDeleteModal = (e: React.MouseEvent) => {
    e.preventDefault()
    openModal('delete')
  }

  return (
    <div className="column">
      <div className="flex gap-2">
        <h3 className="!m-0">{props.title}</h3>{' '}
        <button onClick={openEditModal} className="rounded-md bg-purple-100 p-1">
          <PencilIcon className="h-4 w-4 text-green-500" />
        </button>
        <button onClick={openDeleteModal} className="rounded-md bg-purple-100 p-1">
          <TrashIcon className="h-4 w-4 text-red-500" />
        </button>
      </div>
    </div>
  )
}
