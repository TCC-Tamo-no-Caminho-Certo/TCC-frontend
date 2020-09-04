import React from 'react'

import Home from 'pages/Home'
import Main from 'pages/Main'
import ConfirmPassword from 'pages/ForgotPassword/ConfirmPassword'
import ForgotPassword from 'pages/ForgotPassword'

import Profile from 'pages/Profile'
import EditProfile from 'pages/Profile/EditProfile'

import PrivateRoute from 'routes/PrivateRoute'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home} exact />

        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={ConfirmPassword} />
        <PrivateRoute path='/map' component={Main} />

        <Route path='/profile' component={Profile} />
        <Route path='/editProfile' component={EditProfile} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
