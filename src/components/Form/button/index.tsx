import React, { FC, HTMLProps, useContext } from 'react'
import Style from './styles'

import FormContext, { FormState } from '../Form/FormContext'

import { RootState } from 'store'
import { ThemeState } from 'store/theme'

import DotsLoader from 'components/DotsLoader'

import { useSelector } from 'react-redux'

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: never
}

const Button: FC<Props> = ({ children }) => {
  const form = useContext<FormState | null>(FormContext)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style type='submit'>
      {children}
      {form?.loader && <DotsLoader dotSize={6} color={theme.colors.secondary} />}
    </Style>
  )
}

export default Button
