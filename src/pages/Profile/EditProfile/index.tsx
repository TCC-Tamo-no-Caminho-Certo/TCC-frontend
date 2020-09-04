import React from 'react'
import Style from './styles'

import Navbar from '../Navbar'

const EditProfile: React.FC = () => {
  return (
    <>
      <Navbar selected='editProfile' />
      <Style>
        <h1>Profile</h1>
      </Style>
    </>
  )
}

export default EditProfile
