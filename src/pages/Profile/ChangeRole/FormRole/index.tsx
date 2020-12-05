import React from 'react'

import { Style } from './styles'

interface Props {
  formTitle: string
}

const FormRole: React.FC<Props> = ({ formTitle }) => {
  return (
    <Style>
      <h1>{formTitle}</h1>
    </Style>
  )
}

export default FormRole
