import React, { FC, HTMLProps, useContext } from 'react'

import FormContext, { FormState } from '../Form/FormContext'

import Loader from 'components/Form/Button/Loader'

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: never
}

const Button: FC<Props> = ({ children, ...rest }) => {
  const form = useContext<FormState | null>(FormContext)

  return (
    <button type='submit' {...rest}>
      {children}

      {form?.loader && <Loader theme={form?.theme} />}
    </button>
  )
}

export default Button
