import React from 'react'
import Style from './styles'

import { RootState, ThemeState, useSelector } from 'store'

import { RiArrowLeftSLine } from 'react-icons/ri'
import { LinkProps } from 'react-router-dom'

const BackButton: React.FC<LinkProps<unknown>> = props => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style {...props} theme={theme} className='BackButton'>
      <RiArrowLeftSLine />
      Voltar
    </Style>
  )
}

export default BackButton
