import React, { Component } from 'react'

import css from './TodoList.module.css'
import Card from '../Card/Card'
import FilterBar from '../FilterBar/FilterBar'
import InputBox from '../InputBox/InputBox'
import TodoItemList from '../TodoItemList/TodoItemList'
import {
  addTodo,
  getTodoList,
  deleteTodo,
  toggleStatus
} from '../../services/firebase'

export default class TodoList extends Component {
  state = {
    items: [],
    filter: 'All'
  }

  async componentDidMount () {
    const todos = await getTodoList()
    this.setState({ items: [...todos] })
  }

  onAddItemHandler = async description => {
    if (description) {
      const newTodo = await addTodo(description)
      this.setState(prevState => {
        return { items: [...prevState.items, newTodo] }
      })
    }
  }

  onToggleStatusHandler = async id => {
    const todo = this.state.items.find(todo => todo.id === id)
    const newTodo = await toggleStatus(todo)

    const updatedItems = this.state.items.map(item => {
      if (item.id === id) return newTodo
      return item
    })
    this.setState({ items: updatedItems })
  }

  onRemoveItemHandler = async id => {
    await deleteTodo(id)
    this.setState(prevState => ({
      items: prevState.items.filter(item => item.id !== id)
    }))
  }

  onFilterChangeHandler = name => {
    this.setState({ filter: name })
  }

  getFilteredItems = () => {
    switch (this.state.filter) {
      case 'All':
        return this.state.items
      case 'Finished':
        return this.state.items.filter(item => item.finished)
      case 'Unfinished':
        return this.state.items.filter(item => !item.finished)
      default:
        return this.state.items
    }
  }

  render () {
    return (
      <div className={css.TodoList}>
        <Card>
          <FilterBar onFilterChange={this.onFilterChangeHandler} />
          <InputBox
            value={this.state.itemDescription}
            onValueChange={this.onValueChangeHandler}
            onAddItem={this.onAddItemHandler}
          />

          <TodoItemList
            items={this.getFilteredItems()}
            onToggleStatus={this.onToggleStatusHandler}
            onRemoveItem={this.onRemoveItemHandler}
          />
        </Card>
      </div>
    )
  }
}
