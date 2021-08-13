import React, { useMemo } from 'react'

import EditProfile from './EditProfile'
import AddRole from './AddRole'

import EditUserIcon from 'assets/ProfileSidebar/EditUserIcon'
import MapIcon from 'assets/MainSidebar/MapIcon'
import ChangeIcon from 'assets/RightMenuOpen/ChangeIcon'

import Sidebar, { RouteProps } from 'components/Sidebar'

const Profile = () => {
  const profileRoutes: RouteProps[] = useMemo(
    () => [
      {
        label: 'Editar Perfil',
        icon: () => <EditUserIcon />,
        component: () => <EditProfile />,
        paths: ['/session/profile/edit-profile']
      },
      {
        label: 'Adicionar Papel',
        exact: true,
        isBigInOther: true,
        icon: () => <ChangeIcon />,
        component: () => <AddRole />,
        paths: [
          '/session/profile/change-role',
          '/session/profile/change-role/student',
          '/session/profile/change-role/customer',
          '/session/profile/change-role/professor',
          '/session/profile/change-role/evaluator',
          '/session/profile/change-role/moderator',
          '/session/profile/change-role/administrator'
        ]
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

  return <Sidebar title='Perfil' routes={profileRoutes} />
}

export default Profile
