import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

// import Categories from './components/Categories';
import Movies from './components/Movies';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MoviesForm from './components/movieForm';

import './App.css';
import loginForm from './components/loginForm';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className='App'>
          <div className='container'>
            <Switch>
              <Route path="/login" component={loginForm}></Route>
              <Route path="/movies/:id" component={MoviesForm}></Route>
              <Route path="/movies" component={Movies}></Route>
              <Route path="/customers" component={Customers}></Route>
              <Route path="/rentals" component={Rentals}></Route>
              <Route path="/not-found" component={NotFound}></Route>
              <Redirect exact from='/' to='/movies' />
              <Redirect to='/not-found' />
            </Switch>
          </div>
        </main>
        <Footer />
      </React.Fragment>
    )
  }
}

/* // Emmet Zen Coding
Route[path][component]*4
// Result
<Route path="" component=""></Route>
<Route path="" component=""></Route>
<Route path="" component=""></Route>
<Route path="" component=""></Route> */

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