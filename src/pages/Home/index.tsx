import React from 'react'

import Login from './Login'
import Signup from './Signup'
import RestOfHome from './RestOfHome'

import { AnimatePresence } from 'framer-motion'
import { Route, Switch, useLocation } from 'react-router-dom'

const Home: React.FC = () => {
  const location = useLocation()

  const homeRoutes = [
    {
      path: '/home',
      exact: true,
      component: () => <Login />,
    },
    {
      path: '/home/signup',
      exact: false,
      component: () => <Signup />,
    },
  ]

  window.history.pushState(null, '', document.URL)

  return (
    <>
      <AnimatePresence initial={false}>
        <Switch location={location} key={location.pathname}>
          {homeRoutes.map(route => (
            <Route
              path={route.path}
              key={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </AnimatePresence>

      <RestOfHome />
    </>
  )
}

export default Home
