import React, { Component } from 'react'

import TodoList from './components/TodoList/TodoList'
import TodoLists from './components/TodoLists/TodoLists'
import Navbar from './components/Navigation/Navbar/Navbar'
import css from './App.module.css'

// firebaseConfig = {
//   baseUrl: 'https://todoapp-8a03f.firebaseio.com/'
// }

class App extends Component {
  state = {
    userId: ''
  }
  render () {
    return (
      <div className={css.App}>
        <div className={css.App__Header}>
          <Navbar>Navigation</Navbar>
        </div>
        <div className={css.App__Sidebar}>
          <TodoLists />
        </div>
        <div className={css.App_Content}>
          <TodoList listId='list1' />
        </div>
      </div>
    )
  }
}

export default App
