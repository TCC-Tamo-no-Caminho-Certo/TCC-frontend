import React, { forwardRef, HTMLProps, useContext } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import { RootState } from 'store'
import { ThemeState } from 'store/theme'

import DotsLoader from 'components/DotsLoader'

import { useSelector } from 'react-redux'

type SubmitProps = HTMLProps<HTMLButtonElement>

const Submit = forwardRef(({ children, disabled }: SubmitProps, ref) => {
  const form = useContext<FormState | null>(FormContext)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style
      type='submit'
      className='Submit'
      disabled={disabled}
      ref={ref as any}
    >
      {children}

      {form?.loader && (
        <DotsLoader dotSize={6} color={theme.colors.secondary} />
      )}
    </Style>
  )
})

export default Submit
