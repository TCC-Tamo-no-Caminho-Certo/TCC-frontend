import React, { useEffect } from 'react'

import Main from 'pages/Main'
import Profile from 'pages/Profile'

import api from 'services/api'

import { UserActions } from 'store/user'
import { useDispatch } from 'store'

import { Route, Switch } from 'react-router-dom'

const PrivateRoutes: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('@SLab_ac_token')
    api
      .get('user/get', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        dispatch(UserActions.setUserInfo(res.user))
      })

    window.history.pushState(null, '', document.URL)
  }, [])

  return (
    <Switch>
      <Route path='/session/main' component={Main} />

      <Route path='/session/profile' component={Profile} />
    </Switch>
  )
}

export default PrivateRoutes
