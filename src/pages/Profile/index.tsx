import React from 'react'

import ProfileHome from './Home'
import EditProfile from './EditProfile'

import home from 'assets/ProfileNavbar/home.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'

import Sidebar from 'components/Sidebar'
import Content from 'components/Sidebar/Content'

const Profile: React.FC = () => {
  const profileRoutes = [
    {
      path: '/profile',
      icon: home,
      exact: true,
      label: 'Perfil',
      content: () => <ProfileHome />,
    },
    {
      path: '/profile/edit-profile',
      icon: editProfile,
      label: 'Editar Perfil',
      content: () => <EditProfile />,
    },
  ]

  return (
    <>
      <Sidebar routes={profileRoutes} />
      <Content routes={profileRoutes} />
    </>
  )
}

export default Profile
