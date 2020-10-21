import React, { useEffect } from 'react'

import Main from 'pages/Main'
import Profile from 'pages/Profile'

import api from 'services/api'

import { UserActions, UserState } from 'store/user'
import { RootState, useDispatch, useSelector } from 'store'

import { Route, Switch, useHistory } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { validated } = useSelector<RootState, UserState>(state => state.user)

  useEffect(() => {
    console.log('t', validated)
    validated || history.push('/')

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
  }, [validated, history])

  if (!validated) return <></>

  return (
    <Switch>
      <Route path='/session/main' component={Main} />
      <Route path='/session/profile' component={Profile} />
    </Switch>
  )
}

export default PrivateRoute
