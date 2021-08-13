import React, { HTMLProps, ReactNode, useContext } from 'react'
import Style from './styles'

import DotsLoader from 'components/DotsLoader'

import { ThemeContext } from 'styled-components'

interface FieldProps extends HTMLProps<HTMLDivElement> {
  label: string
  value?: any
  component?: () => ReactNode
}

const Field = ({ label, value, component, ...props }: FieldProps) => {
  const theme = useContext(ThemeContext)

  return (
    <Style {...(props as any)}>
      {value || component ? (
        <>
          <span>{label}</span>

          {component ? <div>{component()}</div> : <div id='value'>{value}</div>}
        </>
      ) : (
        <DotsLoader color={theme.colors.secondary} />
      )}
    </Style>
  )
}

export default Field
