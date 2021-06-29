import React, { useState } from 'react'
import Style from './styles'

import CloseIcon from 'assets/global/CloseIcon'
import CalendarIcon from 'assets/global/CalendarIcon'
import PencilIcon from 'assets/Inputs/PencilIcon'

import { Text } from 'components/Form'

interface DateFieldProps {
  name: string
  default: number
  isAdmin: boolean
}

const DateField = ({
  name,
  isAdmin,
  default: defaultValue
}: DateFieldProps) => {
  const [editing, setEditing] = useState(false)

  return (
    <Style onClick={() => isAdmin && !editing && setEditing(true)}>
      {name === 'dispatch' && <td>Envio de projetos</td>}
      {name === 'evaluate' && <td>Avaliação de projetos</td>}
      {name === 'confirm' && <td>Confirmação de participação</td>}
      {name === 'in_progress' && <td>Início do projeto</td>}

      <td>
        <div id='field'>
          {editing ? (
            <div>
              <CalendarIcon className='calendar' />

              <Text name={name} />

              <CloseIcon id='close' onClick={() => setEditing(false)} />
            </div>
          ) : (
            <div style={{ cursor: isAdmin ? 'pointer' : 'default' }}>
              {isAdmin && <PencilIcon id='pencil' />}
              {`${defaultValue} dias.`}
            </div>
          )}
        </div>
      </td>
    </Style>
  )
}

export default DateField
