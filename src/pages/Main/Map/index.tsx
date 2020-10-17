import React from 'react'
import Style from './styles'

import RightMenu from '../RightMenu'

import { ThemeState } from 'store/theme'
import { useSelector, RootState } from 'store'

const Map: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return <Style theme={theme}>Mapa</Style>
}

export default Map
