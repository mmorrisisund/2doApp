import React from 'react'

import css from './Card.module.css'

const Card = props => {
  return <div className={css.Card}>{props.children}</div>
}

export default Card
