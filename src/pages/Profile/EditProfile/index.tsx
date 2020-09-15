import React from 'react'
import Style from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import ulData from '../ulData'

const EditProfile: React.FC = () => {
  return (
    <LeftMenuPage ulData={ulData} selected='editProfile'>
      <Style>
        <h1>EditProfile</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default EditProfile
