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
    currentList: undefined
  }

  fb = firebase({ userId: this.state.userId })

  async componentDidMount () {
    const todoLists = await this.fb.getTodoLists()
    if (todoLists.length > 0) {
      this.setState({
        todoLists,
        currentList: todoLists[0]
      })
      this.fb.setListId(todoLists[0].listId)
    }
  }

  onTodoAddedHandler = async description => {
    const newTodo = await this.fb.addTodo(description)

    this.setState(prevState => {
      const { currentList, todoLists } = prevState

      const updatedLists = todoLists.map(list => {
        if (list.listId === currentList.listId) {
          return {
            ...list,
            todos: [...list.todos, newTodo]
          }
        }
        return list
      })

      return {
        ...prevState,
        todoLists: updatedLists,
        currentList: updatedLists.find(
          list => list.listId === currentList.listId
        )
      }
    })
  }

  onTodoRemovedHandler = async todoId => {
    await this.fb.deleteTodo(todoId)

    this.setState(prevState => {
      const { currentList, todoLists } = prevState

      const updatedLists = todoLists.map(list => {
        if (list.listId === currentList.listId) {
          return {
            ...list,
            todos: list.todos.filter(todo => todo.id !== todoId)
          }
        }
        return list
      })

      return {
        ...prevState,
        todoLists: updatedLists,
        currentList: updatedLists.find(
          list => list.listId === currentList.listId
        )
      }
    })
  }

  onTodoStatusToggledHandler = async todoId => {
    const { todoLists, currentList } = this.state
    const todo = todoLists
      .find(list => list.listId === currentList.listId)
      .todos.find(todo => todo.id === todoId)
    const updatedTodo = await this.fb.toggleStatus(todo)

    this.setState(prevState => {
      const { currentList, todoLists } = prevState

      const updatedLists = todoLists.map(list => {
        if (list.listId === currentList.listId) {
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
    const newList = await this.fb.addList(name)
    this.setState({
      todoLists: [...this.state.todoLists, newList],
      selectedList: newList.listId,
      currentList: newList
    })
  }

  onListRemovedHandler = async listId => {
    await this.fb.deleteList(listId)
    const filteredList = this.state.todoLists.filter(
      list => list.listId !== listId
    )
    this.setState({ todoLists: filteredList })

    if (this.state.currentList.listId === listId) {
      const newCurrentList =
        this.state.todoLists.length > 0 ? this.state.todoLists[0] : undefined
      this.setState({ currentList: newCurrentList })
    }
  }

  onListSelectedHandler = listId => {
    this.setState(state => {
      return {
        currentList: state.todoLists.find(list => list.listId === listId)
      }
    })
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
    if (this.state.currentList) this.fb.setListId(this.state.currentList.listId)
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
            list={this.state.currentList}
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
