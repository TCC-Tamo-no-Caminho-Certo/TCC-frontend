import React, { useEffect } from 'react'

import PrivateRoutes from './PrivateRoutes'

import ForgotPassword from 'pages/ForgotPassword'
import ResetPassword from 'pages/ResetPassword'
import Home from 'pages/Home'

import validateSession from 'utils/validateSession'

import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom'

const Routes = () => {
  const { pathname } = useLocation()
  const history = useHistory()

  useEffect(() => {
    ;(async function validateAndRedirect() {
      const response = await validateSession()

      response
        ? pathname.split('/')[1] !== 'session' && history.push('/session/main')
        : pathname.split('/')[1] === 'session' && history.push('/home')
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Switch>
      <Route path='/' exact>
        <Redirect to='/home' />
      </Route>

      <Route path='/home' component={Home} />

      <Route path='/forgot-password' component={ForgotPassword} />
      <Route path='/reset-password' component={ResetPassword} />

      <Route path='/session' component={PrivateRoutes} />
    </Switch>
  )
}

export default Routes
