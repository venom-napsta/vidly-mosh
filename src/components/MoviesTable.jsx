import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import TableHeader from "./common/TableHeader";
// import TableBody from "./common/TableBody";
import Like from './common/Like';
import TableComponent from './common/TableComponent';

export class MoviesTable extends Component {

    // improving the thead below for reusability <TableHeader/>
    columns = [
        { path: 'title', label: 'Title', content:movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { key: 'like', content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} /> },
        { key: 'delete', content: movie => 
            < button onClick = {() => this.props.onDelete(movie)} > 
                <i className="fa fa-remove"></i>
            </button > 
        }
    ]
render() {
    const { movies, /* onDelete, onLike */  onSort, sortColumn } = this.props
    return (
        <TableComponent columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort} />
    )
}
}

export default MoviesTable





/* <thead>
    <tr>
        <th onClick={() => this.raiseSort('title')}>Title</th>
        <th onClick={() => this.raiseSort('genre.name')}>Genre</th>
        <th onClick={() => this.raiseSort('numberInStock')}>Stock</th>
        <th onClick={() => this.raiseSort('dailyRentalRate')}>Rate</th>
        <th>Like</th>
        <th></th>
    </tr>
</thead> */



/* <tbody>
            {
                // maps and displays all the movies in the state
                movies.map(movie => (
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><Like liked={movie.liked} onClick={() => onLike(movie)} /></td>
                        <td><button onClick={() => onDelete(movie)} >Delete</button></td>
                    </tr>
                ))}
        </tbody> */