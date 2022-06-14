import * as genresAPI from "./fakeGenreService"
import http from './httpService';

const movies = [
  {
    _id: "1",
    title: "Terminator",
    genre: { _id: "983h2husduh4", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: "2018-01-03T19:04:28.809Z",
    liked: true
  },
  {
    _id: "2",
    title: "Terminator2",
    genre: { _id: "983h2husdu56", name: "Thriller" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: "2018-01-03T19:04:28.809Z",
    liked: false

  },
  {
    _id: "3",
    title: "Terminator3",
    genre: { _id: "983h2husdu56", name: "Thriller" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: "2018-01-03T19:04:28.809Z",
    liked: true
  },
  {
    _id: "4",
    title: "Terminator4",
    genre: { _id: "983h2husd8f4", name: "Commedy" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: "2018-01-03T19:04:28.809Z",
    liked: true
  },
  {
    _id: "5",
    title: "Terminator5",
    genre: { _id: "983h2husd8f4", name: "Commedy" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: "2018-01-03T19:04:28.809Z",
    liked: false
  },
  {
    _id: "6",
    title: "Terminator6",
    genre: { _id: "983h2husduh4", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: "2018-01-03T19:04:28.809Z",
    liked: false
  },
  {
    _id: "7",
    title: "Terminator7",
    genre: { _id: "983h2husduh4", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: "2018-01-03T19:04:28.809Z",
    liked: false,
  },
  {
    _id: "8",
    title: "Terminator8",
    genre: { _id: "983h2husd8f4", name: "Commedy" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: "2018-01-03T19:04:28.809Z",
    liked: false
  }
]

export function getMovie(){
  // return 
  return http.get(`http://localhost:3900/api/movies`)
}

export function getMovies(id){
  return movies.find(m => m._id === id);
}

export function saveMovie(movie){
  let movieInDb = movies.find(m => m._id === movie._id) || {}
  movieInDb.title = movie.title
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock
  movieInDb.dailyRentalRate = movie.dailyRentalRate

  if(!movieInDb._id){
    movieInDb = Date.now().toString();
    movies.push(movieInDb);
  }
  return movieInDb;
}