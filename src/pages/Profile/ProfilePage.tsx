import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { ClockIcon } from '@heroicons/react/24/outline'

import { ROUTES } from '@/router'
import { Button, EditProfileForm, Loader, Modal, LogoutTimer } from '@/components'
import useProfilePage from './useProfilePage'

function ProfilePageView() {
  const { t } = useTranslation()

  const {
    isLoading,
    user,
    modal,
    tasks,
    isAuthenticated,
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
    <>
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
            <ClockIcon className="h-8 w-8 text-purple-500" />

            <div>{t('profile.logout')}</div>

            <LogoutTimer />
          </div>
        </div>

        <div className="m-auto w-11/12 text-center sm:w-2/3">
          <h2>{t('profile.tasks')}</h2>

          <div className="flex flex-col gap-2">
            {tasks?.map((task) => {
              return (
                <Link
                  to={`${ROUTES.boards}/${task.boardId}`}
                  key={task._id}
                  className="not-prose rounded-lg border-2 border-purple-600 p-2"
                >
                  <h2 className="text-left text-2xl font-semibold">{task.title}</h2>
                  <div className="text-left text-2xl line-clamp-2">{task.description}</div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      <Modal isOpen={modal === 'delete'} onClose={closeModal} title={t('profile.confirmation')}>
        <div>{t('profile.sure')}</div>

        <div className="mt-4 flex justify-around">
          <Button type="success" text="Да" onClick={handleDelete} />
          <Button text="Нет" onClick={closeModal} />
        </div>
      </Modal>

      <Modal isOpen={modal === 'edit'} onClose={closeModal}>
        <EditProfileForm onSubmit={handleUpdate} />
      </Modal>
    </>
  )
}

export default observer(ProfilePageView)
