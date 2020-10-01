import React from 'react'
import Style from './styles'

import Slider from './Slider'

import { useSelector, RootState, ThemeState } from 'store'

const EditProfile: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style theme={theme}>
      <Slider />
    </Style>
  )
}

export default EditProfile
