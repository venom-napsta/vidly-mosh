import http from './httpService'
import endPoint from '../config/config.json'  

export function getMovies(){
  return http.get(`${endPoint.apiUrl}/movies`) 
}

export function getMovie(movieId){
  return http.get(`${endPoint.apiUrl}/movies/${movieId}`) 
}


export function saveMovie(movie){
  // return http.get(`${endPoint.apiUrl}/movies/${movieId}`) 
  if(movie._id){
    const body = { ...movie }
    delete body._id
    return http.put(`${endPoint.apiUrl}/movies/${movie._id}`, body)
  }

  return http.post(`${endPoint.apiUrl}/movies`, movie)
}

export function deleteMovie(movieId){
  return http.delete(`${endPoint.apiUrl}/movies/${movieId}`)
}