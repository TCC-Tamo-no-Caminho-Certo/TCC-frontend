import React, { useEffect, useState } from 'react'

import PrivateRoute from './PrivateRoute'

import ForgotPassword from 'pages/ForgotPassword'
import ConfirmPassword from 'pages/ForgotPassword/ConfirmPassword'
import Home from 'pages/Home'

import validateSession from 'utils/validateSession'

import { UserActions } from 'store/user'
import { useDispatch } from 'store'

import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'

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

  if (firstTime) return <></>

  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/home' />
      </Route>

      <Route path='/home' component={Home} />
      <Route path='/forgot-password' component={ForgotPassword} />
      <Route path='/reset-password' component={ConfirmPassword} />

      <Route path='/session' component={PrivateRoute} />
    </Switch>
  )
}

export default Routes
