import React from 'react'

import css from './TodoItem.module.css'
import DeleteIcon from '../DeleteIcon/DeleteIcon'

const TodoItem = ({ item, onToggleStatus, onRemoveItem }) => {
  return (
    <li className={css.TodoItem}>
      <span
        onClick={() => onToggleStatus(item.id)}
        className={`${css.TodoItem__description}  ${
          item.finished ? css.TodoItem_finished : null
        }`}
      >
        {item.description}
      </span>
      <DeleteIcon id={item.id} onRemoveItem={onRemoveItem} />
    </li>
  )
}

export default TodoItem
