import React, { useEffect } from 'react'

import PrivateRoutes from './PrivateRoutes'

import ForgotPassword from 'pages/ForgotPassword'
import ResetPassword from 'pages/ResetPassword'
import Home from 'pages/Home'

import { AsyncValidationState, getValidation } from 'store/Async/validation'
import { RootState } from 'store'

import { useDispatch, useSelector } from 'react-redux'
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom'

const Routes = () => {
  const { logged } = useSelector<RootState, AsyncValidationState>(
    ({ asyncValidation }) => asyncValidation
  )

  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getValidation())
  }, [dispatch])

  useEffect(() => {
    const path = location.pathname.split('/')[1]

    if (logged) path !== 'session' && history.push('/session/main')
    else path === 'session' && history.push('/home')
  }, [location, history, logged])

  return (
    <Switch>
      <Route path='/' exact>
        <Redirect to='/home' />
      </Route>

      <Route path='/home' component={Home} />
      <Route path='/session' component={PrivateRoutes} />
      <Route path='/reset-password' component={ResetPassword} />
      <Route path='/forgot-password' component={ForgotPassword} />
    </Switch>
  )
}

export default Routes
