import React, { ReactNode, useContext } from 'react'
import Style from './styles'

import DotsLoader from 'components/DotsLoader'

import { ThemeContext } from 'styled-components'

interface FieldProps {
  label: string
  value?: any
  component?: () => ReactNode
}

const Field = ({ label, value, component }: FieldProps) => {
  const theme = useContext(ThemeContext)

  return (
    <Style>
      {value || component ? (
        <>
          <span>{label}</span>

          {component ? <div>{component()}</div> : <div>{value}</div>}
        </>
      ) : (
        <DotsLoader color={theme.colors.secondary} />
      )}
    </Style>
  )
}

export default Field
