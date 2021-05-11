import React, { useContext, useState } from 'react'
import Style from './styles'

import CloseIcon from 'assets/Inputs/CloseIcon'
import CalendarIcon from 'assets/global/CalendarIcon'
import PencilIcon from 'assets/Inputs/PencilIcon'

import { Datepicker } from 'components/Form'

import { darken } from 'polished'
import { ThemeContext } from 'styled-components'

interface DateFieldProps {
  name: string
  isAdmin: boolean
}

const DateField = ({ name, isAdmin }: DateFieldProps) => {
  const theme = useContext(ThemeContext)

  const [editing, setEditing] = useState(false)

  return (
    <Style onClick={() => isAdmin && !editing && setEditing(true)}>
      {editing ? (
        <div>
          <CalendarIcon className='calendar' />
          <Datepicker
            withoutStyle
            arrow='top'
            name={name}
            dateColors={{
              disabled: theme.colors.red,
              body: theme.colors.secondary,
              selected: theme.colors.tertiary,
              header: darken(0.06, theme.colors.tertiary)
            }}
          />
          <CloseIcon id='close' onClick={() => setEditing(false)} />
        </div>
      ) : (
        <div style={{ cursor: isAdmin ? 'pointer' : 'default' }}>
          {isAdmin && <PencilIcon id='pencil' />}
          {'19/08/2001'}
        </div>
      )}
    </Style>
  )
}

export default DateField
