import React, { useEffect } from 'react'

import Main from 'pages/Main'
import Profile from 'pages/Profile'

import api from 'services/api'

import { UserActions } from 'store/user'
import { useDispatch } from 'store'

import { Redirect, Route, Switch } from 'react-router-dom'

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
        dispatch(
          UserActions.updateUserInfo({
            ...res.user,
            roles: [
              'guest',
              'aris',
              'student',
              'customer',
              'professor',
              'evaluator',
              'moderator',
              'admin',
            ],
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
    </Switch>
  )
}

export default PrivateRoutes
