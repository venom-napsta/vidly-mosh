import http from './httpService';
import endPoint from '../config/config.json';

const apiEndpoint = `${endPoint.apiUrl}/users`
export function register(user){
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  }) 
}
