import React from 'react'

import css from './TodoItem.module.css'

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
      <i
        className={`material-icons ${css.TodoItem__icon}`}
        onClick={() => onRemoveItem(item.id)}
      >
        delete
      </i>
    </li>
  )
}

export default TodoItem
