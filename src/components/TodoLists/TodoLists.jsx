import React, { Component } from 'react'

import css from './TodoLists.module.css'
import TodoListSummary from '../TodoListSummary/TodoListSummary'
import InputBox from '../InputBox/InputBox'

const fakeData = [
  { name: 'General Todos', finished: '2', unfinished: '3' },
  { name: 'Homework', finished: '0', unfinished: '4' },
  { name: 'Horcruxes', finished: '2', unfinished: '4' }
]

export default class TodoLists extends Component {
  state = {
    lists: fakeData
  }

  renderChildren = () => {
    return this.state.lists.map((summary, idx) => (
      <TodoListSummary summary={summary} key={idx} />
    ))
  }

  renderListCreator = () => {
    return (
      <div className={css.addButtonContent}>
        <i className='material-icons'>playlist_add</i>
        <span style={{ display: 'inline' }}>Add List</span>
      </div>
    )
  }

  render () {
    return (
      <div className={css.TodoLists}>
        <div className={css.TodoLists__addSection}>
          <InputBox>{this.renderListCreator()}</InputBox>
        </div>
        {this.renderChildren()}
      </div>
    )
  }
}
