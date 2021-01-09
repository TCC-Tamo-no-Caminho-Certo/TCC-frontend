import React, { useContext, useMemo } from 'react'

import Map from './Map'
import RightMenu from './RightMenu'
import Projects from './Projects/index'

import { RootState } from 'store'
import { UserState } from 'store/user'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

const Profile: React.FC = () => {
  const { sidebar } = useContext(ThemeContext)
  const { selectedRole } = useSelector<RootState, UserState>(({ user }) => user)

  const mainRoutes = useMemo((): RouteProps[] => {
    const sidebarSections: RouteProps[] = [
      {
        icon: () => <MapIcon />,
        path: '/session/main',
        path2: '/session/main/map',
        label: 'Mapa',
        component: () => <Map />,
      },
      {
        icon: () => <ProjectIcon />,
        path: '/session/main/projects',
        label: 'Projetos',
        component: () => <Projects />,
      },
    ]

    if (selectedRole === 'moderator')
      sidebarSections.push({
        icon: () => <ProjectIcon />,
        path: '/session/moderator',
        label: 'Moderador',
      })

    return sidebarSections
  }, [selectedRole])

  return (
    <>
      <Sidebar
        title='Principal'
        routes={mainRoutes}
        selected={sidebar.selected}
        background={sidebar.background}
        letters={sidebar.letters}
        samePage
      />

      <RightMenu />
    </>
  )
}

export default Profile
