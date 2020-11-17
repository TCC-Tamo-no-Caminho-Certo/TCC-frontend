import React, { useMemo } from 'react'

import ProfileHome from './ProfileHome'
import EditProfile from './EditProfile'
import Historic from './Historic'
import Financial from './Financial'
import Customization from './Customization'
import Security from './Security'
import ChangeRole from './ChangeRole'

import CardIcon from 'assets/ProfileSidebar/CardIcon'
import EditUserIcon from 'assets/ProfileSidebar/EditUserIcon'
import HistoryIcon from 'assets/ProfileSidebar/HistoryIcon'
import PalleteIcon from 'assets/ProfileSidebar/PalleteIcon'
import SecurityIcon from 'assets/ProfileSidebar/SecurityIcon'
import UserIcon from 'assets/ProfileSidebar/UserIcon'
import MapIcon from 'assets/MainSidebar/MapIcon'
import ChangeIcon from 'assets/RightMenuOpen/ChangeIcon'

import Sidebar from 'components/Sidebar'
import Content from 'components/Sidebar/Content'

import { Route } from 'react-router-dom'

const Profile: React.FC = () => {
  const profileRoutes = useMemo(
    () => [
      {
        icon: () => <UserIcon />,
        label: 'Perfil',
        path: '/session/profile/home',
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
        icon: () => <ChangeIcon />,
        label: 'Mudar Papel',
        path: '/session/profile/change-role',
        component: () => <ChangeRole />,
      },
      {
        icon: () => <CardIcon />,
        label: 'Financeiro',
        path: '/session/profile/financial',
        component: () => <Financial />,
      },
      {
        icon: () => <SecurityIcon />,
        label: 'Segurança',
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

      {profileRoutes.map(route => (
        <Content key={route.label}>
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        </Content>
      ))}
    </>
  )
}

export default Profile
