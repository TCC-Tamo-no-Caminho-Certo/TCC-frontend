import React from 'react'
import Style from './styles'

import { ThemeState } from 'store/theme'
import { useSelector, RootState } from 'store'

const Subscribe: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style theme={theme}>
      <h1>SUBSCRIBE</h1>
    </Style>
  )
}

export default Subscribe
