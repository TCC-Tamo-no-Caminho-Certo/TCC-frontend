import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

const Proponent: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  useEffect(() => document.getElementById('Proponent')?.scrollIntoView(), [])

  return (
    <Style theme={theme} id='Proponent'>
      <h1>Proponent</h1>

      <ScrollButton />
    </Style>
  )
}

export default Proponent
