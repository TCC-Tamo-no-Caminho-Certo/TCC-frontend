import React from 'react'
import Style from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import ulData from '../ulData'

const Historic: React.FC = () => {
  return (
    <LeftMenuPage ulData={ulData} selected='historic'>
      <Style>
        <h1>Historic</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default Historic
