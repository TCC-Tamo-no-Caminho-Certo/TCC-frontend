import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'
import FormRole from '../../FormRole'

const Reviewer: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  useEffect(() => document.getElementById('Reviewer')?.scrollIntoView(), [])

  return (
    <Style theme={theme} id='Reviewer'>
      <FormRole formTitle='Revisor' />
      <ScrollButton />
    </Style>
  )
}

export default Reviewer
