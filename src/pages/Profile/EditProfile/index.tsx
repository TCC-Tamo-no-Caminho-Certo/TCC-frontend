import React from 'react'
import Style from './styles'

import Slider from './Slider'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

import Content from 'components/Sidebar/Content'

const EditProfile: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  return (
    <Content>
      <Style theme={theme}>
        <Slider />
      </Style>
    </Content>
  )
}

export default EditProfile
