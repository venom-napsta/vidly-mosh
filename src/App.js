import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// import Categories from './components/Categories';
import Movies from "./components/Movies";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
// import Footer from './components/Footer';
import MoviesForm from "./components/movieForm";
import loginForm from "./components/loginForm";
import Register from "./components/Register";
import Logout from "./components/Logout";

import auth from "./services/authService";
import ProtectedRoute from "./components/common/ProtectedRoute";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="App">
          <div className="container">
            <Switch>
              <Route path="/login" component={loginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={Register} />

              <ProtectedRoute path="/movies/:id" component={MoviesForm} />

              {/* <Route path="/movies" component={Movies}/> */}
              <Route
                path="/movies"
                // props incl history, params, match...
                render={(props) => <Movies {...props} user={user} />}
              />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />
              <Redirect exact from="/" to="/movies" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </main>
        {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

/* // Emmet Zen Coding
Route[path][component]*4
// Result
<Route path="" component=""/>
<Route path="" component=""/>
<Route path="" component=""/>
<Route path="" component=""/> */

/* // General Emmet
ul>li>button.btn.btn-primary*3
// Result
<ul>
  <li>
    <button className="btn btn-primary">btn1</button>
    <button className="btn btn-primary">btn2</button>
    <button className="btn btn-primary">btn3</button></li>
</ul> */

// Super Emmet

// say we want to wrap an element with a div
// 1. Select Text/element
// 2. Press Ctrl + Shift + P
// 3. Search for 'wrap with abbreviation'
// 4. Type 'div.container' for eg. (Emmet it)

// Multiple Cursor
// 1. select the first filed
// 2. Press CTRL
// 3. Select The other fields

// Renaming Variables
// (currentName: newName)
// Read as get the data property and rename it to movie
// const {data: movie} = getMovie(movieId);
