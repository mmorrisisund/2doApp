import React from 'react'

import css from './Navbar.module.css'
import NavbarLogo from './NavbarLogo/NavbarLogo'

const Navbar = props => {
  return (
    <nav className={css.Navbar}>
      <NavbarLogo />
    </nav>
  )
}

export default Navbar
