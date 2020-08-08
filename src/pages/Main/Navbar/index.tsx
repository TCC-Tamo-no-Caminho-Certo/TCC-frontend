import React from 'react'
import Style from './styles'

import Profile from './Profile'
import Menu from './Menu'

const Navbar: React.FC = () => {
  return (
    <Style>
      <Menu />
      <Profile />
    </Style>
  )
}

export default Navbar
