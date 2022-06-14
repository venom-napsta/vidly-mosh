import http from './httpService';
import endPoint from '../config/config.json'


export function getGenres(){
    return http.get(`${endPoint.apiUrl}/genres`)
}

