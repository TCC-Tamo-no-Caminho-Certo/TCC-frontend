import React, { useEffect } from 'react'

import Login from './Login'
import Signup from './Signup'

// import RestOfHome from './RestOfHome'
import { RootState } from 'store'
import { HomeActions } from 'store/home'

import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'

const Home = () => {
  const page = useSelector<RootState, string>(state => state.home.page)
  const initial = useSelector<RootState, boolean>(state => state.home.initial)

  const dispatch = useDispatch()
  const location = useLocation()

  window.history.pushState(null, '', document.URL)

  const transition = {
    type: 'tween',
    duration: 1
  }

  const loginAnimation = {
    initial: {
      x: initial ? '-100vw' : '0vw'
    },
    default: {
      x: '0vw'
    },
    exit: {
      x: '-100vw'
    }
  }

  const signupAnimation = {
    initial: {
      x: initial ? '100vw' : '0vw'
    },
    default: {
      x: '0vw'
    },
    exit: {
      x: '100vw'
    }
  }

  useEffect(() => {
    location.pathname === '/home/signup'
      ? dispatch(HomeActions.update({ page: 'signup', initial: false }))
      : dispatch(HomeActions.update({ page: 'login', initial: false }))
  }, [dispatch, location.pathname])

  return (
    <>
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

      {/*
      <section>
        <RestOfHome />
      </section>
       */}
    </>
  )
}

export default Home
