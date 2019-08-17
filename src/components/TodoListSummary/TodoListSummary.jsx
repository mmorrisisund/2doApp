import React from 'react'

import css from './TodoListSummary.module.css'
import DeleteIcon from '../DeleteIcon/DeleteIcon'

const TodoListSummary = ({ summary, onRemoveItem, onListSelected }) => {
  return (
    <div className={css.TodoListSummary}>
      <div
        className={css.textContent}
        onClick={() => onListSelected(summary.id)}
      >
        <h3 className={css.header}>{summary.name}</h3>
        <div className={css.counts}>
          <p className={css.countsText}>
            Finished:
            <span className={css.countsDigit}>
              <strong>{summary.finished}</strong>
            </span>
          </p>
          <p className={css.countsText}>
            Unfinished:
            <span className={css.countsDigit}>
              <strong>{summary.unfinished}</strong>
            </span>
          </p>
        </div>
      </div>
      <div className='iconContent'>
        <DeleteIcon id={summary.id} onRemoveItem={onRemoveItem} />
      </div>
    </div>
  )
}

export default TodoListSummary

// text content
//   header
//   counts
//     finished
//     unfinished
// icon content
