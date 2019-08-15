import React from 'react'

import css from './DeleteIcon.module.css'

const DeleteIcon = ({ id, onRemoveItem }) => {
  return (
    <i
      className={`material-icons ${css.DeleteIcon}`}
      onClick={() => onRemoveItem(id)}
    >
      delete
    </i>
  )
}

export default DeleteIcon
