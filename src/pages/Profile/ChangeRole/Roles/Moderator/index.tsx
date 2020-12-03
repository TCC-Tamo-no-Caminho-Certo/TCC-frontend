import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'
import FormRole from '../../FormRole'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

const Moderator: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  useEffect(() => document.getElementById('Moderator')?.scrollIntoView(), [])

  return (
    <Style theme={theme} id='Moderator'>
      <FormRole formTitle='Moderador' />
      <ScrollButton />
    </Style>
  )
}

export default Moderator
