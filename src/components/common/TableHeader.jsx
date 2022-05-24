import React, { Component } from 'react'

// Interface
// 1. columns array
// 2. sortColumn: object
// 3. onSort: fn

class TableHeader extends Component {
  raiseSort = path => {

    // sort asc by default else desc on 2nd click

    const sortColumn = { ...this.props.sortColumn }
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    else {
      sortColumn.path = path
      sortColumn.order = 'asc'
    }
    //raise sort event
    this.props.onSort(sortColumn)
  } 

  renderSortIcon = column =>{
    const {sortColumn} = this.props

    if(column.path !== sortColumn.path ) return null
    if(sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  }
  render() {
    return (
      <thead className='clickable'>
        <tr>
          {this.props.columns.map(column =>
            <th key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>
              {column.label} { this.renderSortIcon(column)}
            </th>)}
        </tr>
      </thead>
    )
  }
}

export default TableHeader