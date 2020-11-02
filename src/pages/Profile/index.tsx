import React, { useMemo } from 'react'

import ProfileHome from './Home'
import EditProfile from './EditProfile'
import Historic from './Historic'
import Financial from './Financial'
import Customization from './Customization'

import home from 'assets/ProfileSidebar/home.svg'
import editProfile from 'assets/ProfileSidebar/editProfile.svg'
import financial from 'assets/ProfileSidebar/financial.svg'
import historic from 'assets/ProfileSidebar/historic.svg'
import customization from 'assets/ProfileSidebar/customization.svg'
import map from 'assets/MainSidebar/map.svg'

import Sidebar from 'components/Sidebar'
import Content from 'components/Sidebar/Content'

import { Route } from 'react-router-dom'

const Profile: React.FC = () => {
  const profileRoutes = useMemo(
    () => [
      {
        icon: home,
        label: 'Perfil',
        path: '/session/profile',
        exact: true,
        component: () => <ProfileHome />,
      },
      {
        icon: editProfile,
        label: 'Editar Perfil',
        path: '/session/profile/edit-profile',
        component: () => <EditProfile />,
      },
      {
        icon: financial,
        label: 'Financeiro',
        path: '/session/profile/financial',
        component: () => <Financial />,
      },
      {
        icon: historic,
        label: 'Histórico',
        path: '/session/profile/historic',
        component: () => <Historic />,
      },
      {
        icon: customization,
        label: 'Customização',
        path: '/session/profile/customization',
        component: () => <Customization />,
      },
      {
        icon: map,
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
