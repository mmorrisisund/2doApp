import React, { Component } from 'react'

import css from './InputBox.module.css'

class InputBox extends Component {
  state = { value: '' }

  onValueChangeHandler = e => this.setState({ value: e.target.value })

  onClickHandler = e => {
    if (this.state.value) {
      this.props.onAddItem(this.state.value)
      this.setState({ value: '' })
    }
  }

  onKeyDownHandler = e => {
    if (e.key === 'Enter') this.onClickHandler()
  }

  render () {
    return (
      <div className={css.InputBox}>
        <input
          type='text'
          name='item'
          id='item'
          value={this.state.value}
          onChange={this.onValueChangeHandler}
          autoComplete='off'
          onKeyDown={this.onKeyDownHandler}
        />
        <button onClick={this.onClickHandler}>{this.props.children}</button>
      </div>
    )
  }
}

export default InputBox
