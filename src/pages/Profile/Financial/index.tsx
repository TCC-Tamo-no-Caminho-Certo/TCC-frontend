import React from 'react'
import Style from './styles'

import LeftMenuPage from 'components/LeftMenuPage'
import ulData from '../ulData'

import { useSelector, RootState, ThemeState } from 'store'

const Financial: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <LeftMenuPage ulData={ulData} selected='financial'>
      <Style theme={theme}>
        <h1>Financial</h1>
      </Style>
    </LeftMenuPage>
  )
}

export default Financial
