import React from 'react'

import Home from 'pages/Home'
import Main from 'pages/Main'

import PrivateRoute from 'routes/PrivateRoute'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />

        <PrivateRoute path='/map' component={Main} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
