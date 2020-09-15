import React from 'react'
import Style from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import ulData from '../ulData'

const Customization: React.FC = () => {
  return (
    <LeftMenuPage ulData={ulData} selected='customization'>
      <Style>
        <h1>Customization</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default Customization
