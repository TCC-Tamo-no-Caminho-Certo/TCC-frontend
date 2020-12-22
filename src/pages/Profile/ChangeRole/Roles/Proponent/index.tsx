import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'
import FormRole from '../../FormRole'

const Proponent: React.FC = () => {
  useEffect(() => document.getElementById('Proponent')?.scrollIntoView(), [])

  return (
    <Style id='Proponent'>
      <FormRole formTitle='Proponente' />

      <ScrollButton />
    </Style>
  )
}

export default Proponent
