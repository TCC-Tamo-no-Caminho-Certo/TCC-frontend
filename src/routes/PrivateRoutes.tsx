import React, { useCallback, useEffect } from 'react'

import Main from 'pages/Main'
import Profile from 'pages/Profile'
import Moderator from 'pages/Moderator'

import api from 'services/api'

import { Role, UserActions } from 'store/user'

import { useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

const getRole = (roles: Role[]): Role => {
  const localRole = localStorage.getItem('@SLab_selected_role') as Role

  if (localRole) {
    const haveHole = roles.filter(role => role === localRole)
    if (haveHole.length !== 0) return haveHole[0]
  }

  localStorage.setItem('@SLab_selected_role', roles[0])
  return roles[0]
}

const PrivateRoutes: React.FC = () => {
  const dispatch = useDispatch()

  const onStartInPrivateRoute = useCallback(async () => {
    const { user } = await api.get('user/get')
    const initialRole = getRole(user.roles)

    dispatch(UserActions.updateUserInfo({ ...user, selectedRole: initialRole }))
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
