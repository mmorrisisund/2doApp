import React, { Component } from 'react'

import css from './TodoList.module.css'
import Card from '../Card/Card'
import FilterBar from '../FilterBar/FilterBar'
import InputBox from '../InputBox/InputBox'
import TodoItemList from '../TodoItemList/TodoItemList'

export default class TodoList extends Component {
  state = {
    items: [],
    nextItemId: 1,
    filter: 'All'
  }

  onAddItemHandler = item => {
    if (item) {
      this.setState(prevState => {
        const newItem = {
          id: prevState.nextItemId,
          description: item,
          finished: false
        }
        return {
          items: [...prevState.items, newItem],
          nextItemId: prevState.nextItemId + 1
        }
      })
    }
  }

  onToggleStatusHandler = id => {
    this.setState(prevState => {
      const updatedItems = prevState.items.map(item => {
        if (item.id === id) item.finished = !item.finished
        return item
      })
      return { items: updatedItems }
    })
  }

  onRemoveItemHandler = id => {
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
