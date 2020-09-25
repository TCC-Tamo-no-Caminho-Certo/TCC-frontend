import React from 'react'
import Style from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import navbarList from '../navbarList'

const Security: React.FC = () => {
  return (
    <LeftMenuPage ulData={navbarList} selected='security'>
      <Style>
        <h1>Security</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default Security
