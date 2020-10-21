import React from 'react'
import Style from './styles'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

const RestOfHome: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return <Style theme={theme}>Rest of Home</Style>
}

export default RestOfHome
