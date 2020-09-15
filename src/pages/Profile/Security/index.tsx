import React from 'react'
import Style from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import ulData from '../ulData'

const Security: React.FC = () => {
  return (
    <LeftMenuPage ulData={ulData} selected='security'>
      <Style>
        <h1>Security</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default Security
