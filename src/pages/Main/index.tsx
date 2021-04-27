import React, { useContext, useMemo } from 'react'

import Map from './Map'
import RightMenu from './RightMenu'

// import Projects from './Projects/index'
import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

const Profile = () => {
  const { sidebar } = useContext(ThemeContext)
  const { selectedRole } = useSelector<RootState, UserState>(({ user }) => user)

  const mainRoutes = useMemo((): RouteProps[] => {
    const sidebarSections: RouteProps[] = [
      {
        label: 'Mapa',
        icon: () => <MapIcon />,
        component: () => <Map />,
        paths: ['/session/main', '/session/main/map']
      }
      // {
      //   label: 'Projetos',
      //   icon: () => <ProjectIcon />,
      //   component: () => <Projects />,
      //   paths: ['/session/main/projects']
      // }
    ]

    if (selectedRole === 'moderator' || selectedRole === 'admin')
      sidebarSections.push({
        label: 'Moderador',
        bottom: true,
        icon: () => <ProjectIcon />,
        paths: ['/session/moderator']
      })

    return sidebarSections
  }, [selectedRole])

  return (
    <>
      <Sidebar
        samePage
        title='Principal'
        routes={mainRoutes}
        letters={sidebar.letters}
        selected={sidebar.selected}
        background={sidebar.background}
      />

      <RightMenu />
    </>
  )
}

export default Profile
