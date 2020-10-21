import React from 'react'

import PrivateRoute from './PrivateRoute'

import ForgotPassword from 'pages/ForgotPassword'
import ConfirmPassword from 'pages/ForgotPassword/ConfirmPassword'
import Home from 'pages/Home'

import Logged from 'hoc/Logged'

import { Redirect, Route, Switch } from 'react-router-dom'

const Routes: React.FC = () => {
  return (
    <Logged>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>

        <Route path='/home' component={Home} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={ConfirmPassword} />
        <Route path='/session' component={PrivateRoute} />
      </Switch>
    </Logged>
  )
}

export default Routes
