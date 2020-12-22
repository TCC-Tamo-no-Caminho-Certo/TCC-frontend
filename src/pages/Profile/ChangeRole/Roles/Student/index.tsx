import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'
import FormRole from '../../FormRole'

const Student: React.FC = () => {
  useEffect(() => document.getElementById('Student')?.scrollIntoView(), [])

  return (
    <Style id='Student'>
      <FormRole formTitle='Estudante' />
      <ScrollButton />
    </Style>
  )
}

export default Student
