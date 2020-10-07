import React from 'react'
import Style from './styles'

import Slider from './Slider'

import { ThemeState } from 'store/Theme'
import { useSelector, RootState } from 'store'

const EditProfile: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style theme={theme}>
      <Slider />
    </Style>
  )
}

export default EditProfile
