import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'

import { ROUTES, LOCALIZATIONS } from '@/constants'
import { Button, Switch, Listbox } from '@/components'

export function Header() {
  const [theme, setTheme] = useState(false)
  const [locale, setLocale] = useState(LOCALIZATIONS[0])

  const onAddBoard = () => {
    console.log('add new board')
  }

  const onSignOut = () => {
    console.log('sign out')
  }

  return (
    <header className="bg-white p-4 ">
      <div className="container m-auto flex items-center gap-4">
        <Link to={ROUTES.home}>
          <h1 className="whitespace-nowrap">Task Manager</h1>
        </Link>

        <Switch enabled={theme} onChange={setTheme} />

        <Listbox value={locale} options={LOCALIZATIONS} onChange={setLocale} />

        <div className="ml-auto flex items-center gap-4">
          <Button className="hidden md:block" text="+ New board" onClick={onAddBoard} />
          <Link to={ROUTES.main}>Main</Link>
          <Link to={ROUTES.profile}>Profile</Link>
          <ArrowRightOnRectangleIcon
            className="h-6 w-6 cursor-pointer text-purple-500 hover:text-purple-400"
            onClick={onSignOut}
          />
        </div>
      </div>
    </header>
  )
}
