import React from 'react'

import Home from 'pages/Home'
import Main from 'pages/Main'
import ConfirmPassword from 'pages/ForgotPassword/ConfirmPassword'
import ForgotPassword from 'pages/ForgotPassword'

import Profile from 'pages/Profile'
import EditProfile from 'pages/Profile/EditProfile'
// import Customization from 'pages/Profile/Customization'
// import Financial from 'pages/Profile/Financial'
// import Historic from 'pages/Profile/Historic'
// import Security from 'pages/Profile/Security'

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
        {/* <Route path='/security' component={Security} />
        <Route path='/customization' component={Customization} />
        <Route path='/financial' component={Financial} />
        <Route path='/historic' component={Historic} /> */}
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
