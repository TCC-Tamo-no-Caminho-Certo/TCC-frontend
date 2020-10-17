import React from 'react'

import Map from './Map'

import home from 'assets/ProfileNavbar/home.svg'
import editProfile from 'assets/ProfileNavbar/editProfile.svg'

import Sidebar from 'components/Sidebar'

const Profile: React.FC = () => {
  const profileRoutes = [
    {
      path: '/main',
      exact: true,
      icon: home,
      label: 'Mapa',
      content: () => <Map />,
    },
    {
      path: '/main/projects',
      icon: editProfile,
      label: 'Projetos',
      content: () => <Map />,
    },
  ]

  return <Sidebar routes={profileRoutes} />
}

export default Profile
