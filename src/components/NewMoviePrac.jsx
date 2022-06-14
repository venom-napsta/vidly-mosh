import React from 'react'
import Joi from 'joi-browser'

import Form from './common/Form';

import { getMovies, saveMovie } from '../services/moviesData'
import { getGenres } from '../services/fakeGenreService';

export default class NewMoviePrac extends Form {

  state = {
    data:{
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate:''
    },
    genres:[],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate')
  };

  componentDidMount() { 
    const genres = getGenres();
    this.setState({ genres })

    const movieId = this.props.match.params.id;
    if(movieId === 'new') return;

    const movie = getMovies(movieId);
    // if we used push users will be redirected to component with invalid Id
    if(!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie)});
   }

  //  gets movie and maps it to a different kind of movie object
  // to use on this model ie View model--a model for the view
   mapToViewModel(movie){
     return {
       _id: movie._id,
       title: movie.title,
       genreId: movie.genre.id,
       numberInStock: movie.numberInStock,
       dailyRentalRate: movie.dailyRentalRate
     };
   }

  doSubmit = () =>{
    saveMovie(this.state.data);

    this.props.history.push('/movies');
  }
  
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form className='new-movie-form' onSubmit={this.handleSubmit} >
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    )
  }
}
