import React from 'react'

import Map from './Map'
import RightMenu from './RightMenu'
import Projects from './Projects/index'

import home from 'assets/ProfileNavbar/home.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'

import Sidebar from 'components/Sidebar'

const Profile: React.FC = () => {
  const profileRoutes = [
    {
      path: '/session/main/map',
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

      <Map />
      <Projects />
    </>
  )
}

export default Profile
