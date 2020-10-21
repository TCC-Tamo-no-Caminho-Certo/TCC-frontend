import React from 'react'

import Map from './Map'
import RightMenu from './RightMenu'

import home from 'assets/ProfileNavbar/home.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'

import Sidebar from 'components/Sidebar'
import Content from 'components/Sidebar/Content'

const Profile: React.FC = () => {
  const profileRoutes = [
    {
      path: '/session/main',
      exact: true,
      icon: home,
      label: 'Mapa',
      content: () => <Map />,
    },
    {
      path: '/session/main/projects',
      icon: editProfile,
      label: 'Projetos',
      content: () => <Map />,
    },
  ]

  return (
    <>
      <Sidebar routes={profileRoutes} />
      <Content routes={profileRoutes} />
      <RightMenu />
    </>
  )
}

export default Profile
