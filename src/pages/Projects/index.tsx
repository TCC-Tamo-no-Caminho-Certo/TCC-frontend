import React, { useContext, useMemo, useRef } from 'react'

import AboutProject from './AboutProject'
import Members from './Members'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { ThemeContext } from 'styled-components'

const Profile = () => {
  const { sidebar } = useContext(ThemeContext)

  const aboutProject = useRef(null)
  const members = useRef(null)

  const profileRoutes: RouteProps[] = useMemo(
    () => [
      {
        label: 'Projeto',
        icon: () => <ProjectIcon />,
        component: () => <AboutProject ref={aboutProject} />,
        ref: aboutProject,
        paths: ['/session/project']
      },
      {
        label: 'Participantes',
        icon: () => <ProjectIcon />,
        component: () => <Members ref={members} />,
        ref: members,
        paths: ['/session/project/members']
      },
      {
        label: 'Voltar ao mapa',
        bottom: true,
        icon: () => <MapIcon />,
        paths: ['/session/main/map']
      }
    ],
    []
  )

  return (
    <Sidebar
      title='Perfil'
      samePage={true}
      routes={profileRoutes}
      letters={sidebar.letters}
      selected={sidebar.selected}
      background={sidebar.background}
    />
  )
}

export default Profile
