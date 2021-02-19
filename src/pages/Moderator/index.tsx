import React, { useContext, useMemo } from 'react'

import Solicitation from './Solicitation'
import List from './List'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

import { ThemeContext } from 'styled-components'

const Moderator = () => {
  const { sidebar } = useContext(ThemeContext)

  const moderatorRoutes = useMemo(
    (): RouteProps[] => [
      {
        icon: () => <ProjectIcon />,
        component: () => <Solicitation />,
        paths: ['/session/moderator', '/session/moderator/solicitation'],
        label: 'Solicitações',
        exact: true
      },
      {
        icon: () => <ProjectIcon />,
        component: () => <List />,
        paths: ['/session/moderator/list'],
        label: 'Lista de alunos'
      },
      {
        icon: () => <MapIcon />,
        paths: ['/session/main'],
        label: 'Voltar ao mapa',
        bottom: true
      }
    ],
    []
  )

  return (
    <Sidebar
      title='Moderador'
      routes={moderatorRoutes}
      selected={sidebar.selected}
      background={sidebar.background}
      letters={sidebar.letters}
    />
  )
}

export default Moderator
