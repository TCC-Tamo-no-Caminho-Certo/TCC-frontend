import React, { useContext } from 'react'
import Style from './styles'

import { FormContext, FormState } from '../'

import { RootState } from 'store'
import { ThemeState } from 'store/theme'

import DotsLoader from 'components/DotsLoader'

import { useSelector } from 'react-redux'

type SubmitProps = React.HTMLProps<HTMLButtonElement>

const Submit: React.FC<SubmitProps> = ({ children, disabled }) => {
  const form = useContext<FormState | null>(FormContext)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style type='submit' className='Submit' disabled={disabled}>
      {children}

      {form?.loader && (
        <DotsLoader dotSize={6} color={theme.colors.secondary} />
      )}
    </Style>
  )
}

export default Submit
