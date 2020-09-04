import React from 'react'
import Style from './styles'

import Navbar from './Navbar'

import { useNavbarOpen } from 'hooks/useNavbarOpen'

const Profile: React.FC = () => {
  const { navbarOpen } = useNavbarOpen()

  return (
    <>
      <Navbar selected='home' />
      <Style navbarOpen={navbarOpen}>
        <h1>Profile</h1>
      </Style>
    </>
  )
}

export default Profile
