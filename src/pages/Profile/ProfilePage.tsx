import { useTranslation } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { Navigate } from 'react-router-dom'

import { ROUTES } from '@/router'
import { Button, EditProfileForm, Loader, Modal } from '@/components'
import useProfilePage from './useProfilePage'

function ProfilePageView() {
  const { t } = useTranslation()

  const {
    isAuthenticated,
    isLoading,
    user,
    modal,
    handleDelete,
    handleUpdate,
    openDeleteModal,
    openEditModal,
    closeModal
  } = useProfilePage()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.home} replace />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="container m-auto">
      <div className="m-auto w-11/12 rounded-md border-2 border-purple-500 bg-white px-1 sm:px-2 md:w-2/3 md:px-5 lg:w-1/2 lg:px-20">
        <h2 className="font-semibold">{t('teamsection.Profile')}</h2>

        <div className="flex flex-col items-center justify-between gap-3 pt-10 sm:flex-row">
          <div className="not-prose w-1/4 cursor-pointer">
            <img src="icons/add_avatar.png" alt={t('profile.altAvatar')} />
          </div>
          <div className="flex w-2/3 flex-col gap-7">
            <div className="flex rounded-full bg-gray-50 px-5">
              <div className="w-24 border-r-2 border-purple-600 pr-2">{t('profile.NAME')}</div>
              <div className="w-48 px-2 text-center">{user?.name}</div>
            </div>
            <div className=" flex rounded-full bg-gray-50 px-5">
              <div className="w-24 border-r-2 border-purple-600 pr-2">{t('profile.LOGIN')}</div>
              <div className="w-48 px-2 text-center">{user?.login}</div>
            </div>
          </div>
        </div>

        <div className="mt-7 flex justify-between px-10 pt-10 lg:px-20">
          <Button text={t('common.delete')} onClick={openDeleteModal} />
          <Button text={t('common.edit')} onClick={openEditModal} />
        </div>

        <div className="m-auto my-10 flex w-2/3 items-center justify-center gap-4 rounded-full border-2 border-purple-600 bg-gray-50 py-1 px-2 text-xs">
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

      <Modal isOpen={modal === 'delete'} onClose={closeModal} title={t('profile.confirmation')}>
        <div>{t('profile.sure')}</div>
        <div className="mt-4 flex justify-around">
          <Button className="px-10" text="Да" onClick={handleDelete}></Button>
          <Button className="px-10" text="Нет" onClick={closeModal}></Button>
        </div>
      </Modal>

      <Modal isOpen={modal === 'edit'} onClose={closeModal}>
        <EditProfileForm onSubmit={handleUpdate} />
      </Modal>
    </div>
  )
}

const Profile = observer(ProfilePageView)
export default Profile
