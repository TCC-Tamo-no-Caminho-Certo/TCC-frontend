import React from 'react'
import Style, { Label, Value, Change } from './styles'

interface ContainerChangeProps {
  label: string
  value: string
}

const ContainerChange: React.FC<ContainerChangeProps> = ({ label, value }) => {
  return (
    <Style className='ContainerChange'>
      <Label>
        <span>{label}</span>
      </Label>
      <Value>
        <span>{value}</span>
      </Value>
      <Change>
        <span>Alterar</span>
      </Change>
    </Style>
  )
}

export default ContainerChange
