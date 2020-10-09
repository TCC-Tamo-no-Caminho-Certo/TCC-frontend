import React from 'react'
import { Input } from 'components/Form'
import Style, { Label, Value, Change } from './styles'

import editPencil from 'assets/editPencil.svg'

interface ChangeSetterProps {
  label: string
  name: string
  value: string
}

const ChangeSetter: React.FC<ChangeSetterProps> = ({ label, name, value }) => {
  return (
    <Style>
      <Label>
        <span>{label}</span>
      </Label>

      <Value>
        <Input name={name} defaultValue={value} noStyle />
      </Value>

      <Change>
        <img src={editPencil} alt='edit/cancel' />
      </Change>
    </Style>
  )
}

export default ChangeSetter
