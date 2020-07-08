import React from "react"
import Home from "pages/Home"
import Maps from "pages/Map"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import isAuthenticated from "services/auth"

function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated("post", "auth") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: "/", state: {from: props.location}}} />
        )
      }
    />
  )
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <PrivateRoute path="/map" component={Maps} />
        <Route component={() => "Página não encontrada"} />
      </Switch>
    </BrowserRouter>
  )
}
