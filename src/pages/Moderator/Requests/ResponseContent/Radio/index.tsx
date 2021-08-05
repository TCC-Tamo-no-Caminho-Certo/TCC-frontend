import React, { useContext } from 'react'
import Style from './styles'

import CheckboxIcon, { CheckboxIconMethods } from 'assets/CheckboxIcon'

import { ThemeContext } from 'styled-components'

interface RadioProps {
  name: any
  label: any
  onClick?: any
  onChange?: any
  id: any
}

const Radio = React.forwardRef<CheckboxIconMethods, RadioProps>(
  ({ onChange, onClick, name, label, id }, ref) => {
    const theme = useContext(ThemeContext)

    return (
      <Style className='Radio' id={`Radio-${id}`}>
        <input
          type='radio'
          id={id}
          name={name}
          value={id}
          onChange={onChange}
        />

        <label htmlFor={id} onClick={onClick}>
          <CheckboxIcon
            ref={ref}
            primary={theme.colors.secondary}
            secondary={theme.colors.primary}
          />
          {label}
        </label>
      </Style>
    )
  }
)

export default Radio
