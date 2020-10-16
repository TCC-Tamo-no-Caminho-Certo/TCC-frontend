import React from 'react'
import Style from './styles'

import { ThemeState } from 'store/theme'
import { useSelector, RootState } from 'store'

const About: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style theme={theme}>
      <h1>ABOUT</h1>
    </Style>
  )
}

export default About
