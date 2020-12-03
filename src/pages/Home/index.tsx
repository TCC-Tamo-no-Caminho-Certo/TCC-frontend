import React, { useEffect } from 'react'

import Login from './Login'
import Signup from './Signup'
import RestOfHome from './RestOfHome'

import { RootState, useDispatch, useSelector } from 'store'
import { HomeActions } from 'store/home'

import { AnimatePresence, motion } from 'framer-motion'
import { Route, Switch, useLocation } from 'react-router-dom'

const Home: React.FC = () => {
  const page = useSelector<RootState, string>(state => state.home.page)
  const initial = useSelector<RootState, boolean>(state => state.home.initial)
  const dispatch = useDispatch()
  const location = useLocation()

  window.history.pushState(null, '', document.URL)

  const transition = {
    type: 'tween',
    duration: 2,
  }

  const loginAnimation = {
    initial: {
      x: initial ? '-100vw' : '0vw',
    },
    default: {
      x: '0vw',
    },
    exit: {
      x: '-100vw',
    },
  }

  const signupAnimation = {
    initial: {
      x: initial ? '100vw' : '0vw',
    },
    default: {
      x: '0vw',
    },
    exit: {
      x: '100vw',
    },
  }

  useEffect(() => {
    location.pathname === '/home/signup'
      ? dispatch(HomeActions.page('signup'))
      : dispatch(HomeActions.page('login'))
  }, [dispatch, location.pathname])

  return (
    <>
      <motion.div
        style={{
          backgroundColor: 'transparent',
          width: '76vw',
          height: '100vh',
          position: 'absolute',
          borderRadius: 24,
          boxShadow: '-8px 8px 6px 4px rgba(0,0,0,0.14)',
        }}
        initial={false}
        animate={{ left: page === 'login' ? '62vw' : '-38vw' }}
        transition={transition}
      />

      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route path='/home' exact>
            {page !== 'signup' && (
              <motion.div
                variants={loginAnimation}
                transition={transition}
                initial='initial'
                animate='default'
                exit='exit'
              >
                <Login />
              </motion.div>
            )}
          </Route>

          <Route path='/home/signup'>
            {page === 'signup' && (
              <motion.div
                variants={signupAnimation}
                transition={transition}
                initial='initial'
                animate='default'
                exit='exit'
              >
                <Signup />
              </motion.div>
            )}
          </Route>
        </Switch>
      </AnimatePresence>

      <RestOfHome />
    </>
  )
}

export default Home
