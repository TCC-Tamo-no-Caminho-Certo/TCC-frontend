import React, { useMemo } from 'react'

import Requests from './Requests'

import MapIcon from 'assets/MainSidebar/MapIcon'
import ProjectIcon from 'assets/MainSidebar/ProjectIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

const Moderator = () => {
  const moderatorRoutes = useMemo(
    (): RouteProps[] => [
      {
        label: 'Solicitações',
        exact: true,
        icon: () => <ProjectIcon />,
        component: () => <Requests />,
        paths: ['/session/moderator', '/session/moderator/solicitation']
      },
      {
        label: 'Voltar ao mapa',
        bottom: true,
        icon: () => <MapIcon />,
        paths: ['/session/main']
      }
    ],
    []
  )

  return <Sidebar title='Universidade' routes={moderatorRoutes} />
}

export default Moderator
