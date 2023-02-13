import { useState } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Button, Modal, EditColumnForm } from '@/components'
import { useTranslation } from 'react-i18next'
type Props = {
  id: number
  name: string
}
type ModalName = 'edit' | 'delete'
export function Column(props: { title: string }) {
  const [modal, setModal] = useState<ModalName | null>(null)
  const { t } = useTranslation()

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
