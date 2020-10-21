import React, { useEffect, useState } from 'react'

import PrivateRoute from './PrivateRoute'

import ForgotPassword from 'pages/ForgotPassword'
import ConfirmPassword from 'pages/ForgotPassword/ConfirmPassword'
import Home from 'pages/Home'
import Login from 'pages/Home/Login'
import Signup from 'pages/Home/Signup'

import validateSession from 'utils/validateSession'

import { UserActions } from 'store/user'
import { useDispatch } from 'store'

import { AnimatePresence } from 'framer-motion'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'

const Routes: React.FC = () => {
  const [firstTime, setFirstTime] = useState(true)

  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    validateSession().then(response => {
      if (response) {
        dispatch(UserActions.setValidated(true))
        setFirstTime(false)
        location.pathname === '/' && history.push('/session/main')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history])

  const homeRoutes = [
    { path: '/', exact: true, slider: () => <Login />, restOfHome: () => <Home /> },
    { path: '/signup', slider: () => <Signup />, restOfHome: () => <Home /> },
  ]

  if (firstTime) return <></>

  return (
    <>
      {/* <AnimatePresence initial={false}>
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
      </AnimatePresence> */}

      <Switch>
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/reset-password' component={ConfirmPassword} />
        <Route path='/session' component={PrivateRoute} />
      </Switch>
    </>
  )
}

export default Routes
