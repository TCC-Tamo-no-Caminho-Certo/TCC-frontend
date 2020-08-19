import React from 'react'

import Home from 'pages/Home'
import Main from 'pages/Main'
import ForgotPassword from 'pages/ForgotPassword'

import PrivateRoute from 'routes/PrivateRoute'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/forgot-password' component={ForgotPassword} />
        <PrivateRoute path='/map' component={Main} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
