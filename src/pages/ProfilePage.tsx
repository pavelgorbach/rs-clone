import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, EditProfileForm, Modal } from '@/components'

type profileProps = {
  name: string
  login: string
  avatar: string
}

export default function Profile({
  name = 'Maksim',
  login = 'Maxer',
  avatar = '/src/assets/add_avatar.png'
}: profileProps) {
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
    <section>
      {/* <div className="flex max-w-sm flex-col gap-4 self-center">
        <img src="" alt="avatar" className="h-20 w-20 rounded-full bg-teal-700 text-white" /> */}

      <Modal isOpen={isDeleteOpen} onClose={toggleDeleteModal} title={t('profile.confirmation')}>
        <div>{t('profile.sure')}</div>
      </Modal>
      <Modal isOpen={isEditOpen} onClose={toggleEditModal}>
        <EditProfileForm
          onSubmit={(data) => {
            console.log(data) // TODO: send data to server
            toggleEditModal()
          }}
        />
      </Modal>
      <div className="m-auto w-1/3 rounded-md border-2 border-purple-500 px-20">
        <h2 className="font-semibold">{t('teamsection.Profile')}</h2>
        <div className="flex items-center justify-between pt-10">
          <div className="not-prose w-1/4 cursor-pointer">
            <img src={avatar} alt={t('profile.altAvatar')} />
          </div>
          <div className="flex w-2/3 flex-col gap-7">
            <div className="flex rounded-full bg-white px-5">
              <div className="w-24 border-r-2 border-purple-600">{t('profile.NAME')}</div>
              <div className="w-48 text-center">{name}</div>
            </div>
            <div className=" flex rounded-full bg-white px-5">
              <div className="w-24 border-r-2 border-purple-600">{t('profile.LOGIN')}</div>
              <div className="w-48 text-center">{login}</div>
            </div>
          </div>
        </div>
        <div className="mt-7 flex gap-10 pt-10">
          <Button text={t('common.delete')} onClick={toggleDeleteModal} />
          <Button text={t('common.edit')} onClick={toggleEditModal} />
        </div>
        {/* <hr className="my-1"/> */}
        <div className="m-auto my-10 flex w-2/3 items-center justify-center gap-4 rounded-full border-2 border-purple-600 py-1 px-2">
          <div>
            <svg
              className="w-7"
              fill="RGBA(147 51 234)"
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="AccessTimeFilledIcon"
            >
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.71L11 12.41V7h2v4.59l3.71 3.71-1.42 1.41z"></path>
            </svg>
          </div>
          <div>{t('profile.logout')}</div>
          {/* TODO: make countown function */}
          <div>11:11:11</div>
        </div>
      </div>
      <div className="text-center">
        <h2>{t('profile.tasks')}</h2>
        <div>
          <div>{t('profile.notasks')}</div>
          <ul></ul>
        </div>
      </div>
    </section>
  )
}
