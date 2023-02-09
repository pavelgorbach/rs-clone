import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import {
  ViewColumnsIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  UserIcon
} from '@heroicons/react/24/solid'

import { ROUTES } from '@/router'
import { Button, Switch, Listbox } from '@/components'
import useHeader from './useHeader'

function HeaderView() {
  const {
    i18n,
    isAuthenticated,
    theme,
    t,
    setTheme,
    changeLanguage,
    goToSignInPage,
    goToSignUpPage,
    onAddBoard,
    onSignOut
  } = useHeader()

  return (
    <header className="bg-white py-2 px-4">
      <div className="container m-auto flex items-center gap-4">
        <Link to={ROUTES.home}>
          <h1 className="whitespace-nowrap">
            <ViewColumnsIcon className="h-14 w-14 text-purple-500 hover:text-purple-400" />
          </h1>
        </Link>

        <Switch enabled={theme} onChange={setTheme} />

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

            <Link to={ROUTES.boards}>
              <HomeIcon className="h-6 w-6 text-purple-500 hover:text-purple-400" />
            </Link>

            <Link to={ROUTES.profile}>
              <UserIcon className="h-6 w-6 text-purple-500 hover:text-purple-400" />
            </Link>

            <ArrowRightOnRectangleIcon
              className="h-6 w-6 cursor-pointer text-purple-500 hover:text-purple-400"
              onClick={onSignOut}
            />
          </div>
        )}
      </div>
    </header>
  )
}

export const Header = observer(HeaderView)