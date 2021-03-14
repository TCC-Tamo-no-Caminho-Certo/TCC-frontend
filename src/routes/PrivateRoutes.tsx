import React, { useCallback, useEffect } from 'react'

import Main from 'pages/Main'
import Profile from 'pages/Profile'
import Moderator from 'pages/Moderator'

import { getUser } from 'store/user'

import { useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

const PrivateRoutes = () => {
  const dispatch = useDispatch()

  const onStartInPrivateRoute = useCallback(() => {
    dispatch(getUser())
    window.history.pushState(null, '', document.URL)
  }, [dispatch])

  useEffect(() => {
    onStartInPrivateRoute()
  }, [onStartInPrivateRoute])

  return (
    <Switch>
      <Route path='/session/profile' exact>
        <Redirect to='/session/profile/home' />
      </Route>

      <Route path='/session/profile' component={Profile} />
      <Route path='/session/main' component={Main} />

      <Route path='/session/moderator' component={Moderator} />
    </Switch>
  )
}

export default PrivateRoutes
