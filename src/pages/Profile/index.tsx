import React from 'react'

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

const Profile: React.FC = () => {
  const profileRoutes = [
    {
      icon: home,
      label: 'Perfil',
      path: '/session/profile',
    },
    {
      icon: editProfile,
      label: 'Editar Perfil',
      path: '/session/profile/edit-profile',
    },
    {
      icon: financial,
      label: 'Financeiro',
      path: '/session/profile/financial',
    },
    {
      icon: historic,
      label: 'Histórico',
      path: '/session/profile/historic',
    },
    {
      icon: customization,
      label: 'Customização',
      path: '/session/profile/customization',
    },
    {
      icon: map,
      label: 'Voltar ao mapa',
      path: '/session/main/map',
      bottom: true,
    },
  ]

  return (
    <>
      <Sidebar routes={profileRoutes} />

      <Content>
        <ProfileHome />
        <EditProfile />
        <Financial />
        <Historic />
        <Customization />
      </Content>
    </>
  )
}

export default Profile
