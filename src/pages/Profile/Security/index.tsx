import React from 'react'
import Style from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import ulData from '../ulData'

import { useSelector, RootState, ThemeState } from 'store'

const Security: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <LeftMenuPage ulData={ulData} selected='security'>
      <Style theme={theme}>
        <h1>Security</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default Security
