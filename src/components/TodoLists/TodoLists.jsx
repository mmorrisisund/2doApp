import React, { Component } from 'react'

import css from './TodoLists.module.css'

const fakeData = [
  { name: 'General Todos', finished: '2', unfinished: '3' },
  { name: 'Homework', finished: '0', unfinished: '4' },
  { name: 'Horcruxes', finished: '2', unfinished: '4' }
]

export default class TodoLists extends Component {
  state = {
    lists: []
  }

  render () {
    return <div className={css.TodoLists}>Data</div>
  }
}
