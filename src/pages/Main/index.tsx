import React from 'react'

import Map from './Map'
import RightMenu from './RightMenu'
import Projects from './Projects/index'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar from 'components/Sidebar'

const Profile: React.FC = () => {
  const mainRoutes = [
    {
      icon: () => <MapIcon />,
      path: '/session/main/map',
      label: 'Mapa',
    },
    {
      icon: () => <ProjectIcon />,
      path: '/session/main/projects',
      label: 'Projetos',
    },
  ]

  return (
    <>
      <Sidebar routes={mainRoutes} />

      <RightMenu />

      <Map />
      <Projects />
    </>
  )
}

export default Profile
