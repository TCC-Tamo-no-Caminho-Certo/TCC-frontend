import React from 'react'
import Style from './styles'

import Navbar from './Navbar'

const Profile: React.FC = () => {
  return (
    <>
      <Navbar selected='home' />
      <Style>
        <h1>Profile</h1>
      </Style>
    </>
  )
}

export default Profile
