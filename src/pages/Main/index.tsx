import React from 'react'

import Map from './Map'
import RightMenu from './RightMenu'
import Projects from './Projects/index'

import home from 'assets/ProfileNavbar/home.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'

import Sidebar from 'components/Sidebar'

import { AnimatePresence } from 'framer-motion'
import { Route, Switch, useLocation } from 'react-router-dom'

const Profile: React.FC = () => {
  const location = useLocation()
  const profileRoutes = [
    {
      path: '/session/main',
      exact: true,
      icon: home,
      label: 'Mapa',
      component: () => <Map />,
    },
    {
      path: '/session/main/projects',
      icon: editProfile,
      label: 'Projetos',
      component: () => <Projects />,
    },
  ]

  return (
    <>
      <Sidebar routes={profileRoutes} />

      <RightMenu />

      <AnimatePresence exitBeforeEnter initial={false}>
        <Switch location={location} key={location.pathname}>
          {profileRoutes.map(route => (
            <Route
              path={route.path}
              key={route.path}
              exact={route.exact}
              component={route.component}
            />
          ))}
        </Switch>
      </AnimatePresence>
    </>
  )
}

export default Profile
