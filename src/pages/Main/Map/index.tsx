import React from 'react'
import Style from './styles'

import RightMenu from '../RightMenu'

import { useSelector, RootState, ThemeState } from 'store'

const Map: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style theme={theme}>
      <RightMenu />
    </Style>
  )
}

export default Map
