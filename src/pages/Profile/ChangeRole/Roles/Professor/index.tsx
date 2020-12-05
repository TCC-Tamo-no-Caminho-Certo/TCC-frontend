import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'
import FormRole from '../../FormRole'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'

const Professor: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  useEffect(() => document.getElementById('Professor')?.scrollIntoView(), [])

  return (
    <Style theme={theme} id='Professor'>
      <FormRole formTitle='Professor' />
      <ScrollButton />
    </Style>
  )
}

export default Professor
