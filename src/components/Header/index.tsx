import { Link } from "react-router-dom"
import { Button } from "../Button"

import './style.css'

export function Header() {
  const handleClick = () => {
    console.log('click')
  }

  return (
    <header className="header">
      <Link to="/">
        Logo
      </Link>

      <div className="settings">
        <div>Dark/Light</div>
        <div>Ru/En</div>
      </div>

      <div className="controls">
        <Button text="+ New board" onClick={handleClick} />
        <Link to="boards-list">Boards List</Link>
        <Link to="profile">Profile</Link>
        <Button text="Sign Out" onClick={handleClick} />
      </div>
    </header>
  )
}
