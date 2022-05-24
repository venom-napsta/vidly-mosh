import React, { Component } from 'react'
import lodash from "lodash";

export class TableBody extends Component {
    renderCell = (item, column) => {
        if (column.content) return column.content(item)
        return lodash.get(item, column.path)
    }

    createKey = (item, column) => {
        return item._id + (column.path || column.key)
    }
    render() {
        const { data, columns, } = this.props

        return (
            <tbody>
                {
                    data.map(item => <tr key={item._id}>{
                        columns.map(column =>
                            <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>
                        )
                    }</tr>)
                }
            </tbody>
        )
    }
}

export default TableBody


// export class TableBody extends Component {
//     render() {
//         const { data, onDelete, onLike} = this.props
//         return (
//             <tbody>
//                 {
//                     // maps and displays all the movies in the state
//                     data.map(movie => (
//                         <tr key={movie._id}>
//                             <td>{movie.title}</td>
//                             <td>{movie.genre.name}</td>
//                             <td>{movie.numberInStock}</td>
//                             <td>{movie.dailyRentalRate}</td>
//                             <td><Like liked={movie.liked} onClick={() => onLike(movie)} /></td>
//                             <td><button onClick={() => onDelete(movie)} >Delete</button></td>
//                         </tr>
//                     ))}
//             </tbody>
//         )
//     }
// }