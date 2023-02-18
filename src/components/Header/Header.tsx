import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Tooltip } from 'react-tooltip'
import {
  ViewColumnsIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  UserIcon
} from '@heroicons/react/24/solid'

import { ROUTES } from '@/router'
import { Button, Switch, Listbox } from '@/components'
import useHeader from './useHeader'
import { BASE_URL } from '@/api/client'
import useFile from '@/hooks/useFile'

function HeaderView() {
  const {
    i18n,
    isAuthenticated,
    theme,
    t,
    toggleTheme,
    changeLanguage,
    goToSignInPage,
    goToSignUpPage,
    onAddBoard,
    onSignOut
  } = useHeader()

  const { photo } = useFile()

  return (
    <header className="bg-white py-2 px-4 dark:bg-slate-800">
      <div className="container m-auto flex items-center gap-4">
        <Link to={ROUTES.home}>
          <h1 className="whitespace-nowrap">
            <ViewColumnsIcon className="h-14 w-14 text-purple-500 hover:text-purple-400" />
          </h1>
        </Link>

        <Switch enabled={theme} onClick={toggleTheme} />

        <Listbox value={i18n.language} options={['ru', 'en']} onChange={changeLanguage} />

        {!isAuthenticated && (
          <div className="ml-auto flex items-center gap-4">
            <Button text={t('common.signIn')} onClick={goToSignInPage} />
            <Button text={t('common.signUp')} onClick={goToSignUpPage} />
          </div>
        )}

        {isAuthenticated && (
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
                <img className="w-6 rounded-full" src={`${BASE_URL}/${photo.path}`} />
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
