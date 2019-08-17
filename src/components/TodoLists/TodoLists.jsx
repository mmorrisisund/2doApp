import React, { Component } from 'react'

import css from './TodoLists.module.css'
import TodoListSummary from '../TodoListSummary/TodoListSummary'
import InputBox from '../InputBox/InputBox'

const fakeData = [
  { id: '1', name: 'General Todos', finished: '2', unfinished: '3' },
  { id: '2', name: 'Homework', finished: '0', unfinished: '4' },
  { id: '3', name: 'Horcruxes', finished: '2', unfinished: '4' }
]

export default class TodoLists extends Component {
  state = {
    lists: fakeData
  }

  onAddItemHandler = name => {
    if (name) {
      this.setState(state => {
        return {
          lists: state.lists.concat({
            id: state.lists.length + 1,
            name,
            finished: 0,
            unfinished: 0
          })
        }
      })
    }
  }

  onRemoveItemHandler = id => {
    this.setState(state => ({
      lists: state.lists.filter(list => list.id !== id)
    }))
  }

  renderChildren = () => {
    return this.props.lists.map(list => (
      <TodoListSummary
        key={list.id}
        summary={list}
        onRemoveItem={this.props.onListRemoved}
        onListSelected={this.props.onListSelected}
      />
    ))
  }

  renderAddButtonContent = () => {
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
          <InputBox onAddItem={this.props.onListAdded}>
            {this.renderAddButtonContent()}
          </InputBox>
        </div>
        {this.renderChildren()}
      </div>
    )
  }
}
