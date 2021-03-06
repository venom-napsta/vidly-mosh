import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

function ProtectedRoute({ component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                // redirecting user to their prev route/state
                state: { from: props.location },
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;

// // protecting the route
// render={(props) => {
//   if (!user) return <Redirect to="/login" />;
//   return <MoviesForm {...props} />;
