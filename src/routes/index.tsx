import React from 'react'

import PrivateRoute from './PrivateRoute'

import ForgotPassword from 'pages/ForgotPassword'
import ConfirmPassword from 'pages/ForgotPassword/ConfirmPassword'
import Home from 'pages/Home'
import Login from 'pages/Home/Login'
import Signup from 'pages/Home/Signup'

import { AnimatePresence } from 'framer-motion'
import Logged from 'hoc/Logged'
import { Route, Switch, useLocation } from 'react-router-dom'

const Routes: React.FC = () => {
  const location = useLocation()

  const homeRoutes = [
    { path: '/', exact: true, slider: () => <Login />, restOfHome: () => <Home /> },
    { path: '/signup', slider: () => <Signup />, restOfHome: () => <Home /> },
  ]

  return (
    <Logged>
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
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={ConfirmPassword} />
        <Route path='/session' component={PrivateRoute} />
      </Switch>
    </Logged>
  )
}

export default Routes
