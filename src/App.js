import React from 'react'

import './App.css'
import TodoList from './components/TodoList/TodoList'
import Navbar from './components/Navigation/Navbar/Navbar'

function App () {
  return (
    <div>
      <Navbar>Navigation</Navbar>
      <TodoList />
    </div>
  )
}

export default App
