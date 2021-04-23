import React, { useEffect } from 'react'

import PrivateRoutes from './PrivateRoutes'

import ForgotPassword from 'pages/ForgotPassword'
import ResetPassword from 'pages/ResetPassword'
import Home from 'pages/Home'

import { getValidation, ValidationState } from 'store/AsyncThunks/validation'
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
  const validation = useSelector<RootState, ValidationState>(
    state => state.validation
  )

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    dispatch(getValidation())
  }, [dispatch])

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    console.log(path !== 'session')

    if (validation.logged) path !== 'session' && history.push('/session/main')
    else path === 'session' && history.push('/home')
  }, [location, history, validation.logged])

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
