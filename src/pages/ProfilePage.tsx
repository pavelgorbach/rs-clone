import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, EditProfileForm, Modal } from '@/components'

export default function Profile() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const { t } = useTranslation()

  function toggleEditModal() {
    setIsEditOpen((state) => !state)
  }

  function toggleDeleteModal() {
    setIsDeleteOpen((state) => !state)
  }

  return (
    <>
      <h2>{t('teamsection.Profile')}</h2>

      <div className="flex max-w-sm flex-col gap-4 self-center">
        <img src="" alt="avatar" className="h-20 w-20 rounded-full bg-teal-700 text-white" />

        <Button text={t('common.edit')} onClick={toggleEditModal} />
        <Button text={t('common.delete')} onClick={toggleDeleteModal} />
      </div>

      <Modal isOpen={isEditOpen} onClose={toggleEditModal}>
        <EditProfileForm
          onSubmit={(data) => {
            console.log(data) // TODO: send data to server
            toggleEditModal()
          }}
        />
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={toggleDeleteModal} title={t('profile.confirmation')}>
        <div>{t('profile.sure')}</div>
      </Modal>
    </>
  )
}
