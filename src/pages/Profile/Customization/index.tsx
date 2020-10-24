import React from 'react'
import Style from './styles'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

import Content from 'components/Sidebar/Content'

const Customization: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Content>
      <Style theme={theme}>
        <h1>Customization</h1>
      </Style>
    </Content>
  )
}

export default Customization
