import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import { paginate } from "../utils/paginate";
import { getGenres } from "../services/genreService";
// import { getGenres } from '../services/fakeGenreService';
import { getMovies, deleteMovie } from "../services/movieServices";
// import { getMovie } from '../services/moviesData'

import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import SearchBox from "./common/SearchBox";

// import config from '../config/config.json'
// usage  === config.apiEndpoint

// import http from '../services/httpService'
// usage http.get(apiEndpoint,...)

export default class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    liked: false,
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: {
      // filter >> sort >> paginate
      path: "title",
      order: "asc",
    },
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    // get all movies except movie id'd
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    // console.log("like clicked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    // console.log("clicked movie: ", index + 1);
    movies[index] = { ...movies[index] };
    // console.log("ddddd", { ...movies[index] });
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  // takes the given page number and updates the state
  handlePageChange = (page) => {
    // log the active page
    // console.log('curr', page);
    this.setState({
      currentPage: page,
    });
  };

  // takes ... and handles the onCkilck event of the table column
  handleSort = (sortColumn) => {
    // console.log(path);
    // this.setState({
    //   sortColumn: { path, order: 'asc'}
    // })

    // sort asc by default else desc on 2nd click
    this.setState({ sortColumn });
  };

  handleGenreSelect = (genre) => {
    // console.log('Genre', genre);

    // store genre to the state
    // also reset current page to 1

    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  async componentDidMount() {
    // adding all genres
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();

    this.setState({
      movies,
      // istead of
      // genres: getGenres()
      // use
      genres,
    });
  }

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      searchQuery,
      selectedGenre,
      sortColumn,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    // paginate filtered movies or all movies
    //ie iff selected genre and has id
    /* const filtered = selectedGenre && selectedGenre._id
      ? allMovies.filter(m => m.genre._id === selectedGenre._id)
      : allMovies; */

    // then instead of filtering allMovies
    // const movies = paginate(allMovies, currentPage, pageSize)
    // FILTER filtere ie categorized in terms of genre
    // const movies = paginate(filtered, currentPage, pageSize)

    // filter >> sort >> paginate
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // const mCount = this.state.movies.length
    // or professionally thru variable renaming
    const { length: mCount } = this.state.movies;
    // object restructuring
    const {
      pageSize,
      currentPage,
      sortColumn,
      genres,
      searchQuery,
      selectedGenre,
    } = this.state;

    const { user } = this.props;
    if (mCount === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            // textProperty='name'
            // valueProperty='_id'
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              style={{ marginBottom: 20 }}
              className="btn btn-primary"
            >
              New Movie
            </Link>
          )}
          <p>There are {totalCount} movies in the database.</p>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
    );
  }
}

// notes

/* getPagedData = () => {
  const { pageSize, currentPage, movies: allMovies, searchQuery, selectedGenre, sortColumn } = this.state

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

  return { totalCount: filtered.length, data: movies }
} */

/* handleDelete = async post =>{
  const originalPosts = this.state.posts;

  const posts = this.state.posts.filter(p => p.id !== post.id);
  this.setState({ posts })

  try {
    await axios.delete(apiEndpoint + '/' + post.id);
  } catch (ex) {

    // ex.req
    // ex.res

    if(ex.res && ex.res.status === 404)
      // handle expected err 
      alert('Post was not found/deleted')
    else{
      // handle unexpected error
      alert('An unexpected error occurred')
    }

    // Dsplay specific error
    // Expected err ==> 400-bad req, 404, ... CLIENT ERRORS
    // Unexpected err ==> network down, server dwn, db dwn, bug

    // To handle them we:
    // 1. Log them
    // 2. Display a generic and friendly error message

    alert("Something failed, del a post");
    this.setState({ posts: originalPosts });
  }
} */

/* import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Now go to the render fn and add:
<ToastContainer /> // inside the umbrella div
 */
