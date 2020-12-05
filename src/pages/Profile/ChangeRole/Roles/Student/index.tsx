import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'
import FormRole from '../../FormRole'

const Student: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  useEffect(() => document.getElementById('Student')?.scrollIntoView(), [])

  return (
    <Style theme={theme} id='Student'>
      <FormRole formTitle='Estudante' />
      <ScrollButton />
    </Style>
  )
}

export default Student
