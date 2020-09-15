import React from 'react'
import Style from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import ulData from '../ulData'

const Financial: React.FC = () => {
  return (
    <LeftMenuPage ulData={ulData} selected='financial'>
      <Style>
        <h1>Financial</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default Financial
