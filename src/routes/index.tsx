import React, { useCallback, useEffect } from 'react'

import PrivateRoutes from './PrivateRoutes'

import ForgotPassword from 'pages/ForgotPassword'
import ConfirmPassword from 'pages/ForgotPassword/ConfirmPassword'
import Home from 'pages/Home'

import validateSession from 'utils/validateSession'

import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom'

const Routes: React.FC = () => {
  const { pathname } = useLocation()
  const history = useHistory()

  const onStartRoute = useCallback(async () => {
    const response = await validateSession()

    if (response)
      pathname.split('/')[1] !== 'session' && history.push('/session/main')
    else if (pathname.split('/')[1] === 'session') history.push('/home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onStartRoute()
  }, [onStartRoute])

  return (
    <Switch>
      <Route path='/' exact>
        <Redirect to='/home' />
      </Route>

      <Route path='/home' component={Home} />

      <Route path='/forgot-password' component={ForgotPassword} />
      <Route path='/reset-password' component={ConfirmPassword} />

      <Route path='/session' component={PrivateRoutes} />
    </Switch>
  )
}

export default Routes
