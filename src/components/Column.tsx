import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Button, Modal, EditColumnForm } from '@/components'

type ModalName = 'edit' | 'delete'

export function Column(props: { title: string }) {
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

  return (
    <>
      <div className="flex flex-1 flex-col bg-gray-100">
        <div className="m-3 mb-0 flex gap-2">
          <h3 className="!my-0 flex-1">{props.title}</h3>{' '}
          <button onClick={openEditModal}>
            <PencilIcon className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-green-100 hover:text-green-500" />
          </button>
          <button onClick={openDeleteModal}>
            <TrashIcon className="h-7 w-7 bg-gray-50 p-1 text-gray-400 hover:bg-red-100 hover:text-red-500" />
          </button>
        </div>

        <div className="m-3 w-64 flex-1 border border-dashed border-gray-300"></div>

        <Button text={t('column.addTask')} onClick={() => console.log('button add task')} />
      </div>

      <Modal isOpen={modal === 'edit'} onClose={closeModal} title={t('common.edit')}>
        <EditColumnForm />
      </Modal>

      <Modal isOpen={modal === 'delete'} onClose={closeModal} title={t('common.confirmation')}>
        <div className="prose">
          <p>{t('column.question')}</p>
          <div className="flex justify-between">
            <Button text={t('common.cancel')} onClick={closeModal} />
            <Button text={t('common.delete')} onClick={() => console.log('button delete column')} />
          </div>
        </div>
      </Modal>
    </>
  )
}
