import React, { useContext, useMemo } from 'react'

import Map from './Map'
import RightMenu from './RightMenu'

// import Projects from './Projects/index'
import { RootState } from 'store'
import { UserState } from 'store/user'

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
        icon: () => <MapIcon />,
        paths: ['/session/main', '/session/main/map'],
        label: 'Mapa',
        component: () => <Map />
      }
      // {
      //   icon: () => <ProjectIcon />,
      //   paths: ['/session/main/projects'],
      //   label: 'Projetos',
      //   component: () => <Projects />
      // }
    ]

    if (selectedRole === 'moderator')
      sidebarSections.push({
        icon: () => <ProjectIcon />,
        paths: ['/session/moderator'],
        label: 'Moderador',
        bottom: true
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
