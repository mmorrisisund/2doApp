import React, { Component } from 'react'

import css from './FilterBar.module.css'
import FilterItem from './FilterItem/FilterItem'

class FilterBar extends Component {
  state = {
    filterItems: [
      { name: 'All', isActive: true },
      { name: 'Finished', isActive: false },
      { name: 'Unfinished', isActive: false }
    ]
  }

  renderFilterItems = () => {
    return this.state.filterItems.map(item => {
      return (
        <FilterItem
          key={item.name}
          onClick={this.onClickHandler}
          active={item.isActive}
        >
          {item.name}
        </FilterItem>
      )
    })
  }

  onClickHandler = name => {
    this.setState(prevState => ({
      filterItems: prevState.filterItems.map(item => ({
        ...item,
        isActive: item.name === name
      }))
    }))
    this.props.onFilterChange(name)
  }

  render () {
    return <div className={css.FilterBar}>{this.renderFilterItems()}</div>
  }
}

export default FilterBar
