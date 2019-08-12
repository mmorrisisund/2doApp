import React from 'react'

import css from './TodoItemList.module.css'
import TodoItem from './TodoItem/TodoItem'

const TodoItemList = ({ items, onToggleStatus, onRemoveItem }) => {
  const populateItems = () => {
    return items.map(item => (
      <TodoItem
        key={item.id}
        item={item}
        onToggleStatus={onToggleStatus}
        onRemoveItem={onRemoveItem}
      />
    ))
  }

  return <ul className={css.TodoItemList}>{populateItems()}</ul>
}

export default TodoItemList
