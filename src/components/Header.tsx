/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Tooltip } from 'react-tooltip'
import { useTranslation } from 'react-i18next'
import ViewColumnsIcon from '@heroicons/react/24/solid/ViewColumnsIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/solid/ArrowRightOnRectangleIcon'
import HomeIcon from '@heroicons/react/24/solid/HomeIcon'
import UserIcon from '@heroicons/react/24/solid/UserIcon'

import { BASE_URL } from '@/api/client'
import { ROUTES } from '@/router/routes'
import { Button, ThemeSwitch, Listbox } from '@/components'
import useAuthStore from '@/hooks/useAuthStore'
import useModalStore from '@/hooks/useModalStore'
import useFile from '@/hooks/useFile'

function HeaderView() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const authStore = useAuthStore()
  const modal = useModalStore()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const onAddBoard = () => {
    navigate(ROUTES.boards)
    modal.open({ name: 'add-board', data: { userId: authStore.userId! } })
  }

  const onSignOut = () => {
    authStore.unauth()
  }

  const goToSignInPage = () => {
    navigate(ROUTES.signIn)
  }

  const goToSignUpPage = () => {
    navigate(ROUTES.signUp)
  }

  const { photo } = useFile()

  return (
    <header className="bg-white py-2 px-4 dark:bg-slate-800">
      <div className="container m-auto flex items-center gap-4">
        <Link to={ROUTES.home}>
          <h1 className="whitespace-nowrap">
            <ViewColumnsIcon className="h-10 w-10 text-purple-500 hover:text-purple-400" />
          </h1>
        </Link>

        <ThemeSwitch />

        <Listbox value={i18n.language} options={['ru', 'en']} onChange={changeLanguage} />

        {!authStore.isAuthenticated && (
          <div className="ml-auto flex items-center gap-4">
            <Button text={t('common.signIn')} onClick={goToSignInPage} />
            <Button text={t('common.signUp')} onClick={goToSignUpPage} />
          </div>
        )}

        {authStore.isAuthenticated && (
          <div className="ml-auto flex items-center gap-4">
            <Button className="hidden md:block" text={t('header.addBoard')} onClick={onAddBoard} />

            <Link to={ROUTES.boards} id="go-to-boards">
              <HomeIcon className="h-6 w-6 text-purple-500 hover:text-purple-400" />
            </Link>

            <Tooltip
              anchorId="go-to-boards"
              place="bottom"
              content={t('tooltip.goBoards')}
              className="!p-1.5"
            />

            <Link to={ROUTES.profile} id="go-to-profile">
              {photo?._id ? (
                <div className="rounded-full border-2 border-gray-200">
                  <img
                    className="h-6 w-6 rounded-full object-cover"
                    src={`${BASE_URL}/${photo.path}`}
                  />
                </div>
              ) : (
                <UserIcon className="h-6 w-6 text-purple-500 hover:text-purple-400" />
              )}
            </Link>

            <Tooltip
              anchorId="go-to-profile"
              place="bottom"
              content={t('tooltip.goProfile')}
              className="!p-1.5"
            />

            <ArrowRightOnRectangleIcon
              id="log-out"
              className="h-6 w-6 cursor-pointer text-purple-500 hover:text-purple-400"
              onClick={onSignOut}
            />

            <Tooltip
              anchorId="log-out"
              place="bottom"
              content={t('tooltip.logOut')}
              className="!p-1.5"
            />
          </div>
        )}
      </div>
    </header>
  )
}

export const Header = observer(HeaderView)
