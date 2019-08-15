import React from 'react'

import TodoList from './components/TodoList/TodoList'
import TodoLists from './components/TodoLists/TodoLists'
import css from './App.module.css'

function App () {
  return (
    <div>
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
