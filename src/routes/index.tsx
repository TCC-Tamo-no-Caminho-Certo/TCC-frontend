import React from 'react'
import Home from 'pages/Home'
import Map from 'pages/Map'
import Route from 'routes/Route'
import { BrowserRouter, Switch } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/map' component={Map} isPrivate />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
