import React, { Component } from 'react'
import _ from "lodash";
import { paginate } from '../utils/paginate';
import { getMovies } from '../services/moviesData'
import Pagination from './common/Pagination';
import ListGroup from './common/ListGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './MoviesTable';

export default class Movies extends Component {
  state = {
    movies: [],
    liked: false,
    pageSize: 3,
    currentPage: 1,
    genres: [],
    sortColumn: {
      // filter >> sort >> paginate
      path: 'title',
      order: 'asc'
    }
  }

  handleDelete = (movie) => {
    console.log(movie);
    // get all movies except movie id'd
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({ movies /* movies : movies */ })
  }

  handleLike = (movie) => {
    console.log("like clicked", movie);
    const movies = [...this.state.movies]
    const index = movies.indexOf(movie)
    console.log("clicked movie: ", (index + 1));
    movies[index] = { ...movies[index] }
    console.log("ddddd", ({ ...movies[index] }));
    movies[index].liked = !movies[index].liked
    this.setState({ movies })
  }

  // takes the given page number and updates the state
  handlePageChange = (page) => {
    // log the active page
    // console.log('curr', page);
    this.setState({
      currentPage: page
    })
  }

  // takes ... and handles the onCkilck event of the table column
  handleSort = (sortColumn) =>{
    // console.log(path);
    // this.setState({
    //   sortColumn: { path, order: 'asc'}
    // })

    // sort asc by default else desc on 2nd click
    this.setState({ sortColumn })
  }

  handleGenreSelect = (genre) => {
    // console.log('Genre', genre);

    // store genre to the state
    // also reset current page to 1
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }
  componentDidMount() {
    // adding all genres
    const genres = [{ _id:'', name: 'All Genres'}, ...getGenres()]

    this.setState({
      movies: getMovies(),
      // istead of
      // genres: getGenres()
      // use
      genres: genres
    })
  }

  getPagedData = () =>{
    const { pageSize, currentPage, movies: allMovies, selectedGenre, sortColumn } = this.state

    // paginate filtered movies or all movies
    //ie iff selected genre and has id 
    const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies;

      // then instead of filtering allMovies
      // const movies = paginate(allMovies, currentPage, pageSize)
      // FILTER filtere ie categorized in terms of genre
      // const movies = paginate(filtered, currentPage, pageSize)
      
    // filter >> sort >> paginate
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
    const movies = paginate(sorted, currentPage, pageSize)

    return { totalCount: filtered.length, data: movies}
  }
  render() {
    // const mCount = this.state.movies.length
    // or professionally thru variable renaming
    const { length: mCount } = this.state.movies
    // object restructuring
    const { pageSize, currentPage, sortColumn } = this.state

    if (mCount === 0) return <p>There are no movies in the database.</p>

    const { totalCount, data: movies } = this.getPagedData()

    return (
      <div className='row'>
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            // textProperty='name'
            // valueProperty='_id'
            // selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect} />
        </div>
        <div className="col">  

          <p>There are {totalCount} movies in the database.</p>
          <MoviesTable 
            //passed events from the Movies Table
            onLike={this.handleLike} 
            sortColumn={sortColumn}
            onDelete={this.handleDelete} 
            movies={movies} 
            onSort={this.handleSort}
          />
          <Pagination
            // Controls and handle the pagination component
            onPageChange={this.handlePageChange}

            // now instead of passing th total # of movies
            // LIKE:
            // itemsCount={mCount}
            // RENDER:
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        </div>
      </div>
    )
  }
}
