import React from 'react'
import PrivateRoute from 'routes/PrivateRoute'

import Home from 'pages/Home'
import Login from 'pages/Home/Login'
import Signup from 'pages/Home/Signup'
import ConfirmPassword from 'pages/ForgotPassword/ConfirmPassword'
import ForgotPassword from 'pages/ForgotPassword'

import Profile from 'pages/Profile'

import Map from 'pages/Main/Map'

import { Route, Switch, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

const Routes: React.FC = () => {
  const location = useLocation()

  const homeRoutes = [
    { path: '/', exact: true, slider: () => <Login />, restOfHome: () => <Home /> },
    { path: '/signup', slider: () => <Signup />, restOfHome: () => <Home /> },
  ]

  return (
    <>
      <AnimatePresence initial={false}>
        <Switch location={location} key={location.pathname}>
          {homeRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              exact={route.exact}
              children={() => (
                <>
                  <route.slider />
                  <route.restOfHome />
                </>
              )}
            />
          ))}
        </Switch>
      </AnimatePresence>

      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={ConfirmPassword} />

        <PrivateRoute path='/main' component={Map} />
        <Route path='/profile' component={Profile} />
      </Switch>
    </>
  )
}

export default Routes
