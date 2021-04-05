import React, { forwardRef, HTMLProps, useContext } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import { RootState } from 'store'
import { ThemeState } from 'store/theme'

import DotsLoader from 'components/DotsLoader'

import { useSelector } from 'react-redux'

interface SubmitProps extends HTMLProps<HTMLButtonElement> {
  dataCy?: string
}

const Submit = forwardRef(
  ({ children, type = 'submit', ...rest }: SubmitProps, ref) => {
    const form = useContext<FormState | null>(FormContext)
    const theme = useSelector<RootState, ThemeState>(state => state.theme)

    return (
      <Style
        className='Submit'
        type={type as any}
        disabled={form?.loader}
        ref={ref as any}
        {...(rest as any)}
      >
        <div className='label'>{children}</div>

        {form?.loader && (
          <DotsLoader dotSize={6} color={theme.colors.secondary} />
        )}
      </Style>
    )
  }
)

export default Submit
