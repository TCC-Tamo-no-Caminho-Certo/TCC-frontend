import React, { useEffect } from 'react'

import Login from './Login'
import Signup from './Signup'

// import RestOfHome from './RestOfHome'
import { RootState } from 'store'
import { HomeActions, HomeState } from 'store/Sync/home'

import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'

const Home = () => {
  const { page, initial } = useSelector<RootState, HomeState>(
    ({ home }) => home
  )

  const dispatch = useDispatch()
  const location = useLocation()

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
      ? dispatch(HomeActions.update({ page: 'signup', initial: true }))
      : dispatch(HomeActions.update({ page: 'login', initial: true }))
  }, [dispatch, location.pathname])

  useEffect(() => {
    location.pathname === '/home/signup'
      ? dispatch(HomeActions.update({ page: 'signup', initial: false }))
      : dispatch(HomeActions.update({ page: 'login', initial: false }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AnimatePresence>
        <Switch location={location} key={location.key}>
          <Route path='/home' exact>
            {page !== 'signup' && (
              <motion.div
                exit='exit'
                animate='default'
                initial='initial'
                transition={transition}
                variants={loginAnimation}
              >
                <Login />
              </motion.div>
            )}
          </Route>

          <Route path='/home/signup'>
            {page === 'signup' && (
              <motion.div
                exit='exit'
                initial='initial'
                animate='default'
                variants={signupAnimation}
                transition={transition}
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
