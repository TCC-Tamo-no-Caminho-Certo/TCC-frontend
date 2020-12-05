import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'
import FormRole from '../../FormRole'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

const Proponent: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  useEffect(() => document.getElementById('Proponent')?.scrollIntoView(), [])

  return (
    <Style theme={theme} id='Proponent'>
      <FormRole formTitle='Proponente' />

      <ScrollButton />
    </Style>
  )
}

export default Proponent
