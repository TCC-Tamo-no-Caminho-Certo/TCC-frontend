import React, { useContext, useMemo } from 'react'

import Map from './Map'
import RightMenu from './RightMenu'
import Projects from './Projects/index'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { ThemeContext } from 'styled-components'

const Profile: React.FC = () => {
  const { sidebar } = useContext(ThemeContext)

  const mainRoutes: RouteProps[] = useMemo(
    () => [
      {
        icon: () => <MapIcon />,
        path: '/session/main/map',
        label: 'Mapa',
        component: () => <Map />,
      },
      {
        icon: () => <ProjectIcon />,
        path: '/session/main/projects',
        label: 'Projetos',
        component: () => <Projects />,
      },
    ],
    []
  )

  return (
    <>
      <Sidebar
        routes={mainRoutes}
        selected={sidebar.selected}
        background={sidebar.background}
        letters={sidebar.letters}
        title='Principal'
        samePage
      />

      <RightMenu />
    </>
  )
}

export default Profile
