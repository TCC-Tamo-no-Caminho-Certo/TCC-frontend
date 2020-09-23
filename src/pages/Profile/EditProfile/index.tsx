import React from 'react'
import Style from './styles'

import Slider from './Slider'
import ulData from '../ulData'

import LeftMenuPage from 'components/LeftMenuPage'

const EditProfile: React.FC = () => {
  return (
    <LeftMenuPage ulData={ulData} selected='editProfile'>
      <Style>
        <Slider />
      </Style>
    </LeftMenuPage>
  )
}

export default EditProfile
