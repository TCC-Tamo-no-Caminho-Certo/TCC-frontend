import React from 'react'
import Style from './styles'

import navbarList from '../navbarList'

import { useSelector, RootState, ThemeState } from 'store'

import LeftMenuPage from 'components/LeftMenuPage'

const Security: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <LeftMenuPage ulData={navbarList} selected='security'>
      <Style theme={theme}>
        <h1>Security</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default Security
