import React, { useMemo, useRef } from 'react'

import Map from './Map'
import RightMenu from './RightMenu'
import Season from './Seasons'
import MyProjects from '../Main/MyProjects'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { useSelector } from 'react-redux'

const Main = () => {
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

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
        ref: seasonRef,
        label: 'Temporadas',
        icon: () => <MapIcon />,
        paths: ['/session/main/season'],
        component: () => <Season ref={seasonRef} />
      },
      {
        ref: projectsRef,
        label: 'Meus Projetos',
        icon: () => <ProjectIcon />,
        paths: ['/session/main/myprojects'],
        component: () => <MyProjects ref={projectsRef} />
      }
    ]

    if (
      user?.selectedRole === 'moderator' ||
      user?.selectedRole === 'administrator'
    )
      sidebarSections.push({
        bottom: true,
        label: 'Universidade',
        icon: () => <ProjectIcon />,
        paths: ['/session/moderator']
      })

    return sidebarSections
  }, [user?.selectedRole])

  return (
    <>
      <Sidebar samePage title='Principal' routes={mainRoutes} />
      <RightMenu />
    </>
  )
}

export default Main
