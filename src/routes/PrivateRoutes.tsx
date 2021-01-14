import React, { useEffect } from 'react'

import Main from 'pages/Main'
import Profile from 'pages/Profile'
import Moderator from 'pages/Moderator'

import api from 'services/api'

import { UserActions } from 'store/user'

import { useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

const PrivateRoutes: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    api.get('user/get', {}).then(res => {
      dispatch(
        UserActions.updateUserInfo({
          ...res.user,
        })
      )
    })

    window.history.pushState(null, '', document.URL)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
