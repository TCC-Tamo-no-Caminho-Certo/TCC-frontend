import React, { useMemo, useRef } from 'react'

import RightMenu from './RightMenu'
import Season from './Seasons'
import MyProjects from '../Main/MyProjects'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { useSelector } from 'react-redux'

const Main = () => {
  const { user } = useSelector<RootState, UserState>(({ user }) => user)

  const projectsRef = useRef(null)
  const seasonRef = useRef(null)

  const sidebarSections: RouteProps[] = useMemo(() => {
    const routes: RouteProps[] = [
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
      routes.push({
        bottom: true,
        label: 'Universidade',
        icon: () => <ProjectIcon />,
        paths: ['/session/moderator']
      })

    return routes
  }, [user?.selectedRole])

  return (
    <>
      <Sidebar samePage title='Principal' routes={sidebarSections} />

      <RightMenu />
    </>
  )
}

export default Main
