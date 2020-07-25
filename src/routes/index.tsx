import React from 'react'
import Home from 'pages/Home'
import Map from 'pages/Map'
import { BrowserRouter, Switch } from 'react-router-dom'
import Route from 'routes/Route'

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/map' component={Map} isPrivate />
    </Switch>
  </BrowserRouter>
)

export default Routes
