import React from 'react'
import Style from './styles'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

const ProfileHome: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style theme={theme}>
      <h1>Profile Home</h1>
    </Style>
  )
}

export default ProfileHome
