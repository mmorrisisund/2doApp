import React, { Component } from 'react'

import css from './TodoList.module.css'
import Card from '../Card/Card'
import FilterBar from '../FilterBar/FilterBar'
import InputBox from '../InputBox/InputBox'
import ListDisplay from '../ListDisplay/ListDisplay'
import TodoItem from '../TodoItem/TodoItem'
import {
  addTodo,
  getTodoList,
  deleteTodo,
  toggleStatus
} from '../../services/firebase'

export default class TodoList extends Component {
  state = {
    todos: [],
    filter: 'All'
  }

  async componentDidMount () {
    const todos = await getTodoList()
    this.setState({ todos: [...todos] })
  }

  onAddTodoHandler = async description => {
    if (description) {
      const newTodo = await addTodo(description)
      this.setState(prevState => {
        return { todos: [...prevState.todos, newTodo] }
      })
    }
  }

  onToggleStatusHandler = async id => {
    const todo = this.state.todos.find(todo => todo.id === id)
    const newTodo = await toggleStatus(todo)

    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) return newTodo
      return todo
    })
    this.setState({ todos: updatedTodos })
  }

  onRemoveTodoHandler = async id => {
    await deleteTodo(id)
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }))
  }

  onFilterChangeHandler = name => {
    this.setState({ filter: name })
  }

  getFilteredTodos = () => {
    switch (this.state.filter) {
      case 'All':
        return this.state.todos
      case 'Finished':
        return this.state.todos.filter(todo => todo.finished)
      case 'Unfinished':
        return this.state.todos.filter(todo => !todo.finished)
      default:
        return this.state.todos
    }
  }

  createTodoItems = () => {
    return this.getFilteredTodos().map(todo => (
      <TodoItem
        key={todo.id}
        item={todo}
        onToggleStatus={this.onToggleStatusHandler}
        onRemoveItem={this.onRemoveTodoHandler}
      />
    ))
  }

  render () {
    return (
      <div className={css.TodoList}>
        <Card>
          <FilterBar onFilterChange={this.onFilterChangeHandler} />
          <InputBox
            onValueChange={this.onValueChangeHandler}
            onAddItem={this.onAddTodoHandler}
          />
          <ListDisplay>{this.createTodoItems()} </ListDisplay>
        </Card>
      </div>
    )
  }
}
