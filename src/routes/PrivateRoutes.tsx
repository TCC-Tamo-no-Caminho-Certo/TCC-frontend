import React, { useEffect } from 'react'

import Main from 'pages/Main'
import Profile from 'pages/Profile'
import Moderator from 'pages/Moderator'
import Projects from 'pages/Project'

import { getUser } from 'store/Async/user'

import { useDispatch } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router-dom'

const PrivateRoutes = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const id = Number(localStorage.getItem('@SLab_ac_token')?.split('-')[0])
    id && dispatch(getUser({ id }))
  }, [dispatch])

  return (
    <Switch>
      <Route path='/session/profile' exact>
        <Redirect to='/session/profile/home' />
      </Route>

      <Route path='/session/main' component={Main} />
      <Route path='/session/profile' component={Profile} />
      <Route path='/session/moderator' component={Moderator} />
      <Route path='/session/project/:id' component={Projects} />
    </Switch>
  )
}

export default PrivateRoutes
