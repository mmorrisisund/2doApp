import React from 'react'

import TodoList from './components/TodoList/TodoList'
import TodoLists from './components/TodoLists/TodoLists'
import Navbar from './components/Navigation/Navbar/Navbar'
import css from './App.module.css'

function App () {
  return (
    <div className={css.App}>
      <div className={css.App__Header}>
        <Navbar>Navigation</Navbar>
      </div>
      <div className={css.App__Sidebar}>
        <TodoLists />
      </div>
      <div className={css.App_Content}>
        <TodoList />
      </div>
    </div>
  )
}

export default App
