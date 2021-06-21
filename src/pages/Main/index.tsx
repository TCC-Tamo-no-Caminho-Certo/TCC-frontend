import React, { useContext, useMemo, useRef } from 'react'

import Map from './Map'
import RightMenu from './RightMenu'
import Season from './Season'
import MyProjects from '../Main/MyProjects'

// import Projects from './Projects/index'
import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { useSelector } from 'react-redux'
import { ThemeContext } from 'styled-components'

const Main = () => {
  const { selectedRole } = useSelector<RootState, UserState>(({ user }) => user)
  const { sidebar } = useContext(ThemeContext)
  const theme = useContext(ThemeContext)

  const projectsRef = useRef(null)
  const seasonRef = useRef(null)
  const mapRef = useRef(null)

  const mainRoutes = useMemo((): RouteProps[] => {
    const sidebarSections: RouteProps[] = [
      {
        label: 'Mapa',
        ref: mapRef,
        icon: () => <MapIcon />,
        component: () => <Map ref={mapRef} />,
        paths: ['/session/main', '/session/main/map']
      },
      {
        label: 'Temporadas',
        ref: seasonRef,
        icon: () => <MapIcon />,
        component: () => <Season ref={seasonRef} />,
        paths: ['/session/main/season']
      },
      {
        label: 'Meus Projetos',
        icon: () => <ProjectIcon />,
        component: () => <MyProjects ref={projectsRef} />,
        ref: projectsRef,
        paths: ['/session/main/myprojects']
      }
    ]

    if (selectedRole === 'moderator' || selectedRole === 'admin')
      sidebarSections.push({
        label: 'Universidade',
        bottom: true,
        icon: () => <ProjectIcon />,
        paths: ['/session/moderator']
      })

    return sidebarSections
  }, [selectedRole])

  return (
    <div style={{ backgroundColor: theme.colors.tertiary }}>
      <Sidebar
        samePage
        title='Principal'
        routes={mainRoutes}
        letters={sidebar.letters}
        selected={sidebar.selected}
        background={sidebar.background}
      />

      <RightMenu />
    </div>
  )
}

export default Main
