import React from 'react'

import css from './ListDisplay.module.css'

const ListDisplay = ({ children }) => {
  return <ul className={css.ListDisplay}>{children}</ul>
}

export default ListDisplay
