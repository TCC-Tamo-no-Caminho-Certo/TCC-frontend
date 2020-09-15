import React from 'react'
import Style from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import ulData from '../ulData'

const ProfileHome: React.FC = () => {
  return (
    <LeftMenuPage ulData={ulData} selected='profile'>
      <Style>
        <h1>Home</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default ProfileHome
