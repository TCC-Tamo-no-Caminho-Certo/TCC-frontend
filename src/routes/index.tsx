import React from 'react'
import Home from 'pages/Home'
import Map from 'pages/Map'
import PrivateRoute from 'routes/Route'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <PrivateRoute path='/map' component={Map} isPrivate />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
