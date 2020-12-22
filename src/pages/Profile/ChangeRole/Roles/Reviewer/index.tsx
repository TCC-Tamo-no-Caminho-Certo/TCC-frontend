import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'
import FormRole from '../../FormRole'

const Reviewer: React.FC = () => {
  useEffect(() => document.getElementById('Reviewer')?.scrollIntoView(), [])

  return (
    <Style id='Reviewer'>
      <FormRole formTitle='Revisor' />
      <ScrollButton />
    </Style>
  )
}

export default Reviewer
