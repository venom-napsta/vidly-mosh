import auth from '../services/authService';
import React from 'react'
import Form from './common/Form';
import Joi from 'joi-browser'
import * as UserService from '../services/userService';

export default class loginForm extends Form {

  state = {
    data:{
      username: '',
      password: '',
      name: ''
    },

    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label('Username'),
    password: Joi.string()
      .required()
      .min(6)
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name')
  }

  doSubmit = async() =>{
    // Call server
    try {
      const response = await UserService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token'])
      window.location = '/'
      // this.props.history.push('/')
    } catch (error) {
      if(error.response && error.response.status === 400){
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors })
      }
    }
  }
  
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form className='register-form' onSubmit={this.handleSubmit} >
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    )
  }
}
