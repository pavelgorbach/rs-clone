import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { API_URL } from '@/api/client'
import { ROUTES } from '@/router/routes'
import { Button, Loader, Countdown } from '@/components'
import useProfilePage from './useProfilePage'

function ProfilePageView() {
  const { t } = useTranslation()

  const {
    isAuthenticated,
    tokenExpiration,
    isLoading,
    user,
    tasks,
    userPhoto,
    unauth,
    openEditUserModal,
    openDeleteUserModal,
    openUploadPhotoModal
  } = useProfilePage()

  if (!isAuthenticated) return <Navigate to={ROUTES.home} replace />

  if (isLoading || !user) return <Loader />

  return (
    <>
      <div className="container m-auto">
        <h1 className="text-center dark:text-slate-200">{t('teamsection.Profile')}</h1>

        <div className="m-auto flex max-w-md flex-col gap-10 bg-white p-10 shadow-md dark:bg-slate-500">
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:gap-0">
            <div
              className="cursor-pointer rounded-full border hover:border-purple-500"
              onClick={openUploadPhotoModal}
            >
              <img
                src={!userPhoto?.name ? 'icons/add_avatar.png' : `${API_URL}/${userPhoto?.path}`}
                className="!m-0 h-24 w-24 rounded-full object-cover"
                alt={t('profile.altAvatar')}
              />
            </div>

            <div className="flex flex-col gap-7">
              <div className="flex w-60 bg-gray-100">
                <div className="w-24 border-r border-purple-500 pl-5 text-gray-500 dark:bg-slate-600 dark:text-slate-200">
                  {t('profile.NAME')}
                </div>
                <div className="w-36 truncate px-5 text-center dark:bg-slate-600 dark:text-slate-200">
                  {user?.name}
                </div>
              </div>

              <div className="flex bg-gray-100">
                <div className="w-24 border-r border-purple-500 pl-5 text-gray-500 dark:bg-slate-600 dark:text-slate-200">
                  {t('profile.LOGIN')}
                </div>
                <div className="w-36 truncate px-5 text-center dark:bg-slate-600 dark:text-slate-200">
                  {user?.login}
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-20">
            <Button
              type="error"
              className="flex-1"
              text={t('common.delete')}
              onClick={openDeleteUserModal}
            />

            <Button
              type="success"
              className="flex-1"
              text={t('common.edit')}
              onClick={openEditUserModal}
            />
          </div>

          <Countdown
            exp={tokenExpiration}
            onEnd={unauth}
            className="self-center dark:bg-slate-600 dark:text-slate-200"
          />
        </div>

        <div className="m-auto max-w-xl">
          <h2 className="text-center dark:text-slate-200">{t('profile.tasks')}</h2>

          <div className="flex flex-col gap-2 bg-gray-100 dark:bg-slate-700 dark:text-slate-200">
            {tasks?.map((task) => {
              return (
                <Link
                  to={`${ROUTES.boards}/${task.boardId}`}
                  key={task._id}
                  className="border border-white bg-white p-2 shadow-md hover:border-purple-500 dark:border-slate-700 dark:bg-slate-500 dark:hover:border-purple-400"
                >
                  <h3 className="!m-0">{task.title}</h3>
                  <p className="!m-0">{task.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default observer(ProfilePageView)
