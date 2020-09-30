import React from 'react'

import Home from 'pages/Home'
import Map from 'pages/Main/Map'
import ConfirmPassword from 'pages/ForgotPassword/ConfirmPassword'
import ForgotPassword from 'pages/ForgotPassword'
import Profile from 'pages/Profile'

import PrivateRoute from 'routes/PrivateRoute'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={ConfirmPassword} />

        <PrivateRoute path='/main' component={Map} />
        <PrivateRoute path='/profile' component={Profile} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
