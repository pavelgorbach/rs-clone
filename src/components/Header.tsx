import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES, LOCALIZATIONS } from '@/constants'
import { Button, Switch, Listbox } from '@/components'

export function Header() {
  const [theme, setTheme] = useState(false)
  const [locale, setLocale] = useState(LOCALIZATIONS[0])

  const onAddBoard = () => {
    console.log('add new board')
  }

  const onSignOut = () => {
    console.log('add new board')
  }

  return (
    <header className="flex items-center gap-4 p-4">
      <Link to={ROUTES.home}>
        <h1>Task Manager</h1>
      </Link>

      <Switch enabled={theme} onChange={setTheme} />

      <Listbox value={locale} options={LOCALIZATIONS} onChange={setLocale} />

      <div className="ml-auto flex items-center gap-4">
        <Button text="+ New board" onClick={onAddBoard} />
        <Link to={ROUTES.main}>Main</Link>
        <Link to={ROUTES.profile}>Profile</Link>
        <Button text="Sign Out" onClick={onSignOut} />
      </div>
    </header>
  )
}
