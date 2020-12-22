import React, { useEffect } from 'react'
import Style from './styles'

import ScrollButton from '../../ScrollButton'
import FormRole from '../../FormRole'

const Professor: React.FC = () => {
  useEffect(() => document.getElementById('Professor')?.scrollIntoView(), [])

  return (
    <Style id='Professor'>
      <FormRole formTitle='Professor' />
      <ScrollButton />
    </Style>
  )
}

export default Professor
