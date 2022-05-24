import React, { Component } from 'react'
import Input from './common/input';

export default class loginForm extends Component {

  state = {
    account:{
      username: '',
      password: ''
    },

    errors: {}
  };

  validate = () => {
    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === '')
      errors.username = 'Username is Required'
    if (account.password.trim() === '')
      errors.password = 'Password is Required'
    
    return Object.keys(errors).length === 0 ? null : errors;
  }

  handleSubmit = e => {
    e.preventDefault();

    // error handling
    const errors = this.validate();
    this.setState({ errors:errors || {} });
    if(errors) return;

    // Call the server

    console.log('Submitted');
  }

  validateProperty = input =>{
    const { name, value } = input
    if(name === 'username'){
      if(value.trim() === '' ) return 'Username is required.';
    }
    if(name === 'password'){
      if(value.trim() === '' ) return 'Password is required.';
    }

  }
  handleChange = ({currentTarget:input}) => {
    // handleChange = e => {

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if(errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name]
    
    const account = { ...this.state.account };
    account[input.name] = input.value;

    // account[e.currentTarget.name] = e.currentTarget.value; // to accept multiple inputs dynamically
    // account.username = e.currentTarget.value; to accept 1 input
    this.setState({account, errors })
  }


  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form className='login-form' onSubmit={this.handleSubmit} >
          <Input
            name='username' 
            value={account.username}
            label='Username or Email'
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name='password' 
            value={account.password}
            label='Password'
            onChange={this.handleChange}
            error={errors.password}
          />
          {/* Refactored to a usable component Input
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input 
              name='password'
              onChange={this.handleChange}
              value={password} 
              id='Password' 
              type="password" 
              className="form-control" 
            />
          </div> */}
          <button className='btn btn-primary' >Login</button>
        </form>
      </div>
    )
  }
}
