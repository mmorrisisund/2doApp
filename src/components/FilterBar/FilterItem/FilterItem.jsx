import React from 'react'

import css from './FilterItem.module.css'

const FilterItem = ({ active, children, onClick }) => {
  const classes = [css.FilterItem]
  classes.push(active ? css.active : '')
  return (
    <span className={classes.join(' ')} onClick={() => onClick(children)}>
      {children}
    </span>
  )
}

export default FilterItem
