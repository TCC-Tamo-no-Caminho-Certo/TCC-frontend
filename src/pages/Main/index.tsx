import React from 'react'

import Map from './Map'
import RightMenu from './RightMenu'
import Projects from './Projects/index'
import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'
import Sidebar from 'components/Sidebar'

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

const Profile: React.FC = () => {
  return (
    <>
      <Sidebar routes={mainRoutes} samePage />

      <RightMenu />

      <Map />

      <Projects />
    </>
  )
}

export default Profile
