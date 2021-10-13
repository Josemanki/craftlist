import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
      <header className="header">
        <Link className="header__logo-link" to="/">
          <h1 className="header__title">Dofus</h1>
          <h1 className="header__title header__title--accent">Craftlist</h1>
        </Link>
      </header>
  )
}

export default Header
