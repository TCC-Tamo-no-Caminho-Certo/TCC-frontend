import React from 'react'
import Style from './styles'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

const Financial: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style theme={theme}>
      <h1>Financial</h1>
    </Style>
  )
}

export default Financial
