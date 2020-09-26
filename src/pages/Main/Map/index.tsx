import React from 'react'
import Style from './styles'

import ulData from '../ulData'
import RightMenu from '../RightMenu'
import LeftMenuPage from 'components/LeftMenuPage'
import { useSelector, RootState, ThemeState } from 'store'

const Map: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <LeftMenuPage ulData={ulData} width={237} selected='main'>
      <Style theme={theme}>
        <RightMenu />
      </Style>
    </LeftMenuPage>
  )
}

export default Map
