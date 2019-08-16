import React from 'react'

import css from './TodoListSummary.module.css'
import DeleteIcon from '../DeleteIcon/DeleteIcon'

const TodoListSummary = ({ summary, onRemoveItem }) => {
  return (
    <div className={css.TodoListSummary}>
      <h3 className={css.header}>{summary.name}</h3>
      <div className={css.content}>
        <div className={css.content__counts}>
          <p className={css.content__countsText}>
            Finished:
            <span className={css.content__countsDigit}>
              <strong>{summary.finished}</strong>
            </span>
          </p>
          <p className={css.content__countsText}>
            Unfinished:
            <span className={css.content__countsDigit}>
              <strong>{summary.unfinished}</strong>
            </span>
          </p>
        </div>
        <DeleteIcon id={summary.id} onRemoveItem={onRemoveItem} />
      </div>
    </div>
  )
}

export default TodoListSummary
