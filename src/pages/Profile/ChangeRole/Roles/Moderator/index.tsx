import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'
import FormRole from '../../FormRole'

const Moderator: React.FC = () => {
  useEffect(() => document.getElementById('Moderator')?.scrollIntoView(), [])

  return (
    <Style id='Moderator'>
      <FormRole formTitle='Moderador' />
      <ScrollButton />
    </Style>
  )
}

export default Moderator
