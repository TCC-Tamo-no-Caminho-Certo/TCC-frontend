import React, { useEffect } from 'react'

import Login from './Login'
import Signup from './Signup'

import { RootState } from 'store'
import { HomeActions, HomeState } from 'store/Sync/home'

import { AnimatePresence, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'

const transition = { type: 'tween', duration: 1 }

const loginAnimation: Variants = {
  enter: { x: '0vw' },
  exit: { x: '-100vw', transition }
}

const signupAnimation: Variants = {
  enter: { x: '0vw' },
  exit: { x: '100vw', transition }
}

const Home = () => {
  const { initial } = useSelector<RootState, HomeState>(({ home }) => home)

  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    location.pathname === '/home/signup'
      ? dispatch(HomeActions.update({ page: 'signup', initial: false }))
      : dispatch(HomeActions.update({ page: 'login', initial: false }))
  }, [dispatch, location.pathname])

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route path='/home' exact>
            <Login
              exit='exit'
              animate='enter'
              transition={transition}
              variants={loginAnimation}
              initial={initial ? 'exit' : 'enter'}
            />
          </Route>

          <Route path='/home/signup'>
            <Signup
              exit='exit'
              animate='enter'
              transition={transition}
              variants={signupAnimation}
              initial={initial ? 'exit' : 'enter'}
            />
          </Route>
        </Switch>
      </AnimatePresence>
    </div>
  )
}

export default Home
