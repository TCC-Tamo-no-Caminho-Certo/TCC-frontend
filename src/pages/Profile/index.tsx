import React from 'react'

import ProfileHome from './Home'
import EditProfile from './EditProfile'

import home from 'assets/ProfileNavbar/home.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'

import Sidebar from 'components/Sidebar'

import { AnimatePresence } from 'framer-motion'
import { Route, Switch, useLocation } from 'react-router-dom'

const Profile: React.FC = () => {
  const location = useLocation()

  const profileRoutes = [
    {
      icon: home,
      label: 'Perfil',
      path: '/session/profile',
      exact: true,
      component: () => <ProfileHome />,
    },
    {
      icon: editProfile,
      label: 'Editar Perfil',
      path: '/session/profile/edit-profile',
      exact: false,
      component: () => <EditProfile />,
    },
  ]

  return (
    <>
      <Sidebar routes={profileRoutes} />

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
