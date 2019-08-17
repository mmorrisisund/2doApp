import React, { Component } from 'react'

import css from './TodoList.module.css'
import Card from '../Card/Card'
import FilterBar from '../FilterBar/FilterBar'
import InputBox from '../InputBox/InputBox'
import ListDisplay from '../ListDisplay/ListDisplay'
import TodoItem from '../TodoItem/TodoItem'

export default class TodoList extends Component {
  state = {
    filter: 'All'
  }

  onFilterChangeHandler = name => {
    this.setState({ filter: name })
  }

  getFilteredTodos = () => {
    switch (this.state.filter) {
      case 'All':
        return this.props.list.todos
      case 'Finished':
        return this.props.list.todos.filter(todo => todo.finished)
      case 'Unfinished':
        return this.props.list.todos.filter(todo => !todo.finished)
      default:
        return this.props.list.todos
    }
  }

  renderTodoItems = () => {
    return this.getFilteredTodos().map(todo => (
      <TodoItem
        key={todo.id}
        item={todo}
        onToggleStatus={this.props.onTodoStatusToggled}
        onRemoveItem={this.props.onTodoRemoved}
      />
    ))
  }

  render () {
    if (!this.props.list) return null
    return (
      <div className={css.TodoList}>
        <h1 className={css.header}>{this.props.list.name}</h1>
        <Card>
          <FilterBar onFilterChange={this.onFilterChangeHandler} />
          <InputBox
            onValueChange={this.onValueChangeHandler}
            onAddItem={this.props.onTodoAdded}
          >
            Add Todo
          </InputBox>
          <ListDisplay>{this.renderTodoItems()} </ListDisplay>
        </Card>
      </div>
    )
  }
}
