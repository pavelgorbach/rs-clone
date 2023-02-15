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

  if (isLoading || !user) {
    return <Loader />
  }

  return (
    <>
      <div className="container m-auto">
        <h1 className="text-center">{t('teamsection.Profile')}</h1>

        <div className="m-auto flex max-w-md flex-col gap-10 bg-white p-10 shadow-md">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:gap-0">
            <div className="cursor-pointer">
              <img src="icons/add_avatar.png" className="!m-0 w-20" alt={t('profile.altAvatar')} />
            </div>

            <div className="flex flex-col gap-7">
              <div className="flex w-60 bg-gray-100">
                <div className="w-24 border-r border-purple-500 pl-5 text-gray-500">
                  {t('profile.NAME')}
                </div>
                <div className="w-36 truncate px-5 text-center">{user?.name}</div>
              </div>

              <div className="flex bg-gray-100">
                <div className="w-24 border-r border-purple-500 pl-5 text-gray-500">
                  {t('profile.LOGIN')}
                </div>
                <div className="w-36 truncate px-5 text-center">{user?.login}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-20">
            <Button
              type="error"
              className="flex-1"
              text={t('common.delete')}
              onClick={openDeleteModal}
            />
            <Button
              type="success"
              className="flex-1"
              text={t('common.edit')}
              onClick={openEditModal}
            />
          </div>

          <div className="m-auto flex items-center gap-4 self-center rounded-full border border-purple-600 bg-gray-50 py-1 px-2 text-xs">
            <ClockIcon className="h-8 w-8 text-purple-500" />

            <div>{t('profile.logout')}</div>

            <LogoutTimer />
          </div>
        </div>

        <div className="m-auto max-w-xl text-center">
          <h2>{t('profile.tasks')}</h2>

          <div className="flex flex-col gap-2 bg-white">
            {tasks?.map((task) => {
              return (
                <Link
                  to={`${ROUTES.boards}/${task.boardId}`}
                  key={task._id}
                  className="not-prose border border-white p-2 shadow-md hover:border-purple-500"
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
        <div className="prose">
          <p>{t('profile.sure')}</p>

          <div className="flex justify-between">
            <Button type="success" text={t('common.cancel')} onClick={closeModal} />
            <Button type="error" text={t('common.delete')} onClick={handleDelete} />
          </div>
        </div>
      </Modal>

      <Modal isOpen={modal === 'edit'} onClose={closeModal}>
        <EditProfileForm name={user.name} login={user.login} onSubmit={handleUpdate} />
      </Modal>
    </>
  )
}

export default observer(ProfilePageView)
