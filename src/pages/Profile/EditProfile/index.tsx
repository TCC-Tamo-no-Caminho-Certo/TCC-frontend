import React from 'react'
import Style from './styles'

import Slider from './Slider'
import navbarList from '../navbarList'

import LeftMenuPage from 'components/LeftMenuPage'

const EditProfile: React.FC = () => {
  return (
    <LeftMenuPage ulData={navbarList} selected='editProfile'>
      <Style>
        <Slider />
      </Style>
    </LeftMenuPage>
  )
}

export default EditProfile
