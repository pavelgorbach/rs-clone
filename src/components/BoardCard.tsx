import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useTranslation } from 'react-i18next'

import { Board } from '@/api'
import { Button, Modal, EditBoardForm, EditBoardFormData } from '@/components'
import { ROUTES } from '@/router'

type Props = Board & {
  onDelete(id: string): void
  onUpdate(data: Board): void
}

type ModalName = 'create' | 'edit' | 'delete'

export function BoardCard({ _id, title, users, owner, onDelete, onUpdate }: Props) {
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

  const handleUpdate = ({ title }: EditBoardFormData) => {
    closeModal()
    onUpdate({
      title,
      _id,
      owner,
      users
    })
  }

  const { t } = useTranslation()

  return (
    <>
      <Link to={`${ROUTES.boards}/${_id}`}>
        <div className="mt-3 bg-white p-3 shadow-sm">
          <h3 className="!mt-0 mb-2">{title}</h3>

          <div className="flex justify-end gap-2">
            <button onClick={openEditModal}>
              <PencilIcon className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-green-100 hover:text-green-500" />
            </button>

            <button onClick={openDeleteModal}>
              <TrashIcon className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-red-100 hover:text-red-500" />
            </button>
          </div>
        </div>
      </Link>

      <Modal isOpen={modal === 'edit'} onClose={closeModal} title={t('common.edit')}>
        <EditBoardForm title={title} onSubmit={handleUpdate} />
      </Modal>

      <Modal isOpen={modal === 'delete'} onClose={closeModal} title={t('common.confirmation')}>
        <div className="prose">
          <p>{t('boardCard.question')}</p>
          <div className="flex justify-between">
            <Button text={t('common.cancel')} type="success" onClick={closeModal} />
            <Button type="error" text={t('common.delete')} onClick={handleDelete} />
          </div>
        </div>
      </Modal>
    </>
  )
}
