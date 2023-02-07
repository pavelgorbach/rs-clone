import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, EditProfileForm, Modal } from '@/components'

type profileProps = {
  name: string
  id: number
  login: string
  avatar: string
}

export default function Profile({ name = 'Maksim', id, login = 'Maxer', avatar }: profileProps) {
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
    <section className="m-auto w-1/3">
      {/* <div className="flex max-w-sm flex-col gap-4 self-center">
        <img src="" alt="avatar" className="h-20 w-20 rounded-full bg-teal-700 text-white" /> */}

      <Modal isOpen={isDeleteOpen} onClose={toggleDeleteModal} title={t('profile.confirmation')}>
        <div>{t('profile.sure')}</div>
      </Modal>
      <h2>{t('teamsection.Profile')}</h2>
      <div>
        <div >
          <img src="#" alt="Your Avatar" />
        </div>
        <div>
          <div className="flex">
            <div className="w-24 border-r-4">NAME</div>
            <div className="w-48 text-center">{name}</div>
          </div>
          <div className="flex">
            <div className="w-24 border-r-4">LOGIN</div>
            <div className="w-48 text-center">{login}</div>
          </div>
        </div>
      </div>
      <div>
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
      <hr />
      <div>
        <div>
          <img src="" alt="Clock" />
        </div>
        <div>Logout after</div>
        {/* <div>{timer}</div> */}
      </div>
    </section>
  )
}
