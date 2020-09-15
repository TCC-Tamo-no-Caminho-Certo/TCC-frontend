import React from 'react'
import Style from './styles'

import ulData from '../ulData'
import RightMenu from '../RightMenu'
import LeftMenuPage from 'components/LeftMenuPage'

const Map: React.FC = () => {
  return (
    <LeftMenuPage ulData={ulData} width={237} selected='main'>
      <Style>
        <RightMenu />
      </Style>
    </LeftMenuPage>
  )
}

export default Map
