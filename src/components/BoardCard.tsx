import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'

import { Board } from '@/api'
import { Button, Modal, EditBoardForm } from '@/components'

type Props = Board & {
  onDelete(id: number): void
  onUpdate(data: Board): void
}

type Modal = 'create' | 'edit' | 'delete'

export function BoardCard({ id, name, description, onDelete, onUpdate }: Props) {
  const [modal, setModal] = useState<Modal | null>(null)

  const openModal = (name: Modal) => {
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
    onDelete(id)
  }

  const handleUpdate = (data: Board) => {
    onUpdate(data)
  }

  const { t } = useTranslation()

  return (
    <>
      <Link to={`/board/${id}`}>
        <div className="mt-3 rounded bg-white p-3 shadow-md">
          <h3 className="!m-0">{name}</h3>
          <p>{description}</p>

          <div className="flex justify-end gap-2">
            <button onClick={openEditModal} className="rounded-md bg-purple-100 p-1">
              <PencilIcon className="h-6 w-6 text-purple-500" />
            </button>

            <button onClick={openDeleteModal} className="rounded-md bg-purple-100 p-1">
              <TrashIcon className="h-6 w-6 text-purple-500" />
            </button>
          </div>
        </div>
      </Link>

      <Modal isOpen={modal === 'edit'} onClose={closeModal} title={t('common.edit')}>
        <EditBoardForm {...{ name, description, id }} onSubmit={handleUpdate} />
      </Modal>

      <Modal isOpen={modal === 'delete'} onClose={closeModal} title={t('common.confirmation')}>
        <div className="prose">
          <p>{t('boardCard.question')}</p>
          <div className="flex justify-between">
            <Button text={t('common.cancel')} onClick={closeModal} />
            <Button text={t('common.delete')} onClick={handleDelete} />
          </div>
        </div>
      </Modal>
    </>
  )
}
