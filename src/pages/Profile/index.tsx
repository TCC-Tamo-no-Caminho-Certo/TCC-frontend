import React, { useMemo } from 'react'

import ProfileHome from './Home'
import EditProfile from './EditProfile'
import Historic from './Historic'
import Financial from './Financial'
import Customization from './Customization'
import Security from './Security'

import CardIcon from 'assets/ProfileSidebar/CardIcon'
import EditUserIcon from 'assets/ProfileSidebar/EditUserIcon'
import HistoryIcon from 'assets/ProfileSidebar/HistoryIcon'
import PalleteIcon from 'assets/ProfileSidebar/PalleteIcon'
import SecurityIcon from 'assets/ProfileSidebar/SecurityIcon'
import UserIcon from 'assets/ProfileSidebar/UserIcon'
import MapIcon from 'assets/MainSidebar/MapIcon'

import Sidebar from 'components/Sidebar'
import Content from 'components/Sidebar/Content'

import { Route } from 'react-router-dom'

const Profile: React.FC = () => {
  const profileRoutes = useMemo(
    () => [
      {
        icon: () => <UserIcon />,
        label: 'Perfil',
        path: '/session/profile',
        exact: true,
        component: () => <ProfileHome />,
      },
      {
        icon: () => <EditUserIcon />,
        label: 'Editar Perfil',
        path: '/session/profile/edit-profile',
        component: () => <EditProfile />,
      },
      {
        icon: () => <CardIcon />,
        label: 'Financeiro',
        path: '/session/profile/financial',
        component: () => <Financial />,
      },
      {
        icon: () => <SecurityIcon />,
        label: 'Financeiro',
        path: '/session/profile/security',
        component: () => <Security />,
      },
      {
        icon: () => <HistoryIcon />,
        label: 'Histórico',
        path: '/session/profile/historic',
        component: () => <Historic />,
      },
      {
        icon: () => <PalleteIcon />,
        label: 'Customização',
        path: '/session/profile/customization',
        component: () => <Customization />,
      },
      {
        icon: () => <MapIcon />,
        label: 'Voltar ao mapa',
        path: '/session/main/map',
        bottom: true,
      },
    ],
    []
  )

  return (
    <>
      <Sidebar routes={profileRoutes} />

      <Content>
        {profileRoutes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Content>
    </>
  )
}

export default Profile
