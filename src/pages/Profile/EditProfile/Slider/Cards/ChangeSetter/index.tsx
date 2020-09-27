import React from 'react'
import Style, { Label, Value, Change } from './styles'

import editPencil from 'assets/editPencil.svg'

interface ChangeSetterProps {
  label: string
  value: string
}

const ChangeSetter: React.FC<ChangeSetterProps> = ({ label, value }) => {
  return (
    <Style>
      <Label>
        <span>{label}</span>
      </Label>

      <Value>
        <span>{value}</span>
      </Value>

      <Change>
        <img src={editPencil} alt='edit' />
      </Change>
    </Style>
  )
}

export default ChangeSetter
