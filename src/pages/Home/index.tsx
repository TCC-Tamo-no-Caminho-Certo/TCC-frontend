import React, { useEffect } from 'react'

import Login from './Login'
import Signup from './Signup'

import { RootState } from 'store'
import { HomeActions, HomeState } from 'store/Sync/home'

import { AnimatePresence, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'

const transition = { type: 'tween', duration: 1 }

const Home = () => {
  const { initial } = useSelector<RootState, HomeState>(({ home }) => home)

  const dispatch = useDispatch()
  const location = useLocation()

  const loginAnimation: Variants = {
    exit: { x: '-100vw' },
    default: { x: '0vw' },
    initial: { x: initial ? '-100vw' : '0vw' }
  }

  const signupAnimation: Variants = {
    exit: { x: '100vw' },
    default: { x: '0vw' },
    initial: { x: initial ? '100vw' : '0vw' }
  }

  useEffect(() => {
    location.pathname === '/home/signup'
      ? dispatch(HomeActions.update({ page: 'signup', initial: false }))
      : dispatch(HomeActions.update({ page: 'login', initial: false }))
  }, [dispatch, location.pathname])

  return (
    <AnimatePresence>
      <Switch location={location} key={location.key}>
        <Route path='/home' exact>
          <Login
            exit='exit'
            animate='default'
            initial='initial'
            transition={transition}
            variants={loginAnimation}
          />
        </Route>

        <Route path='/home/signup'>
          <Signup
            exit='exit'
            initial='initial'
            animate='default'
            transition={transition}
            variants={signupAnimation}
          />
        </Route>
      </Switch>
    </AnimatePresence>
  )
}

export default Home
