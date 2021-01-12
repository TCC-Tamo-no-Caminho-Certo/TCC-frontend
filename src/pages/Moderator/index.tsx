import React, { useContext, useMemo } from 'react'

import Solicitation from './Solicitation'
import List from './List'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { ThemeContext } from 'styled-components'

const Profile: React.FC = () => {
  const { sidebar } = useContext(ThemeContext)

  const mainRoutes = useMemo(
    (): RouteProps[] => [
      {
        icon: () => <ProjectIcon />,
        component: () => <Solicitation />,
        path: '/session/moderator',
        path2: '/session/moderator/solicitation',
        label: 'Solicitações',
        exact: true,
      },
      {
        icon: () => <ProjectIcon />,
        component: () => <List />,
        path: '/session/moderator/list',
        label: 'Lista de alunos',
      },
      {
        icon: () => <MapIcon />,
        path: '/session/main',
        label: 'Voltar ao mapa',
        bottom: true,
      },
    ],
    []
  )

  return (
    <Sidebar
      title='Moderador'
      routes={mainRoutes}
      selected={sidebar.selected}
      background={sidebar.background}
      letters={sidebar.letters}
    />
  )
}

export default Profile
