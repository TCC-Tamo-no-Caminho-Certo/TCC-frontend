import React from 'react'

import Map from './Map'
import RightMenu from './RightMenu'
import Projects from './Projects/index'

import map from 'assets/MainSidebar/map.svg'
import projects from 'assets/MainSidebar/projects.svg'

import Sidebar from 'components/Sidebar'

const Profile: React.FC = () => {
  const profileRoutes = [
    {
      path: '/session/main/map',
      icon: map,
      label: 'Mapa',
    },
    {
      path: '/session/main/projects',
      icon: projects,
      label: 'Projetos',
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
