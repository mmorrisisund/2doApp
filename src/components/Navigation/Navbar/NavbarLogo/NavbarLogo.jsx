import React from 'react'

import css from './NavbarLogo.module.css'

const NavbarLogo = () => {
  return (
    <div className={css.NavbarLogo}>
      <i className='material-icons'>playlist_add_check</i>
      <span>2do</span>
    </div>
  )
}

export default NavbarLogo
