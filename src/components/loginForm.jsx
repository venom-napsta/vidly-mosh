import React from "react";
import Joi from "joi-browser";
import { Redirect } from "react-router-dom";

import auth from "../services/authService";
import Form from "./common/Form";

export default class loginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },

    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    // Call server
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      // this.props.history.push('/')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // clone err object
        const errors = { ...this.state.errors };
        // set new error
        errors.username = error.response.data;
        // update the state on new error
        this.setState({ errors });
      }
    }
  };

  render() {
    // we used redirect coz theres no need to remount the state
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form className="login-form" onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}
