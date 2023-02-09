import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ViewColumnsIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  UserIcon
} from '@heroicons/react/24/solid'

import { useAuth } from '@/hooks'
import { ROUTES } from '@/router'
import { Button, Switch, Listbox } from '@/components'

export function Header() {
  console.log('HEADER render')
  const [theme, setTheme] = useState(false)
  const navigate = useNavigate()

  const { t, i18n } = useTranslation()

  const auth = useAuth()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const onAddBoard = () => {
    console.log('add new board')
  }

  const onSignOut = () => {
    console.log('sign out')
  }

  const goToSignInPage = () => {
    navigate(ROUTES.signIn)
  }

  const goToSignUpPage = () => {
    navigate(ROUTES.signUp)
  }

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

        {!auth.user && (
          <div className="ml-auto flex items-center gap-4">
            <Button text={t('common.signIn')} onClick={goToSignInPage} />
            <Button text={t('common.signUp')} onClick={goToSignUpPage} />
          </div>
        )}

        {auth.user && (
          <div className="ml-auto flex items-center gap-4">
            <Button className="hidden md:block" text={t('header.addBoard')} onClick={onAddBoard} />

            <Link to={ROUTES.main}>
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
