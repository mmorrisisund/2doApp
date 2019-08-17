import React, { Component } from 'react'

import css from './App.module.css'
import TodoList from './components/TodoList/TodoList'
import TodoLists from './components/TodoLists/TodoLists'
import Navbar from './components/Navigation/Navbar/Navbar'
import firebase from './services/firebase'

class App extends Component {
  state = {
    userId: 'user1',
    todoLists: [],
    selectedList: ''
  }

  fb = firebase({ userId: this.state.userId })

  async componentDidMount () {
    const todoLists = await this.fb.getTodoLists()
    this.setState({ todoLists, selectedList: 0 })
    this.fb.setListId(todoLists[0].listId)
  }

  onTodoAddedHandler = async description => {
    const newTodo = await this.fb.addTodo(description)

    this.setState(prevState => {
      const { selectedList, todoLists } = prevState
      const { listId } = todoLists[selectedList]

      const updatedLists = todoLists.map(list => {
        if (list.listId === listId) {
          return {
            ...list,
            todos: [...list.todos, newTodo]
          }
        }
        return list
      })

      return {
        ...prevState,
        todoLists: updatedLists
      }
    })
  }

  onTodoRemovedHandler = async todoId => {
    await this.fb.deleteTodo(todoId)

    this.setState(prevState => {
      const { selectedList, todoLists } = prevState
      const { listId } = todoLists[selectedList]

      const updatedLists = todoLists.map(list => {
        if (list.listId === listId) {
          return {
            ...list,
            todos: list.todos.filter(todo => todo.id !== todoId)
          }
        }
        return list
      })

      return {
        ...prevState,
        todoLists: updatedLists
      }
    })
  }

  onTodoStatusToggledHandler = async todoId => {
    const { todoLists, selectedList } = this.state
    const todo = todoLists[selectedList].todos.find(todo => todo.id === todoId)
    const updatedTodo = await this.fb.toggleStatus(todo)

    this.setState(prevState => {
      const { selectedList, todoLists } = prevState
      const { listId } = todoLists[selectedList]

      const updatedLists = todoLists.map(list => {
        if (list.listId === listId) {
          const todos = list.todos.map(todo => {
            if (todo.id === todoId) return updatedTodo
            return todo
          })
          return {
            ...list,
            todos
          }
        }
        return list
      })

      return {
        ...prevState,
        todoLists: updatedLists
      }
    })
  }

  onListAddedHandler = async name => {

  }

  onListRemovedHandler = async listId => {

  }

  onListSelectedHandler = listId => {

  }

  getListSummaryInfo = () => {
    function getFinishedCount (todos) {
      return todos.reduce((acc, todo) => {
        return todo.finished ? ++acc : acc
      }, 0)
    }

    const summaryInfo = this.state.todoLists.map(list => {
      const finishedCount = getFinishedCount(list.todos)
      return {
        id: list.listId,
        name: list.name,
        finished: finishedCount,
        unfinished: list.todos.length - finishedCount
      }
    })

    return summaryInfo || []
  }

  render () {
    const { todoLists, selectedList } = this.state
    return (
      <div className={css.App}>
        <div className={css.App__Header}>
          <Navbar>Navigation</Navbar>
        </div>
        <div className={css.App__Sidebar}>
          <TodoLists
            onListAdded={this.onListAddedHandler}
            onListRemoved={this.onListRemovedHandler}
            onListSelected={this.onListSelectedHandler}
            lists={this.getListSummaryInfo()}
          />
        </div>
        {/* {this.state.todoLists.length > 0 ? ( */}
        <div className={css.App_Content}>
          <TodoList
            list={todoLists[selectedList]}
            onTodoAdded={this.onTodoAddedHandler}
            onTodoRemoved={this.onTodoRemovedHandler}
            onTodoStatusToggled={this.onTodoStatusToggledHandler}
          />
        </div>
        {/* ) : null} */}
      </div>
    )
  }
}

export default App
