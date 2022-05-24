import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
          <Link className="navbar-brand" to="/">Vidly Mosh</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" area-expanded="false" aria-label="Toggle Navigation">
              <span className='navbar-toggler-icon' />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                  <NavLink className="nav-item nav-link" to='/movies' >Movies</NavLink>
                  <NavLink className="nav-item nav-link" to='/customers' >Customers</NavLink>
                  <NavLink className="nav-item nav-link" to='/rentals' >Rentals</NavLink>
              </div>
          </div>
      </nav>
  )
}

export default Navbar