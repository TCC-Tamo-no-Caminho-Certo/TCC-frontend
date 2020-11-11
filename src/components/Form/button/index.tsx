import React, { FC, HTMLProps, useContext } from 'react'

import FormContext, { FormState } from '../Form/FormContext'

import DotsLoader from 'components/DotsLoader'

interface Props extends HTMLProps<HTMLButtonElement> {
  type?: never
}

const Button: FC<Props> = ({ children, ...rest }) => {
  const form = useContext<FormState | null>(FormContext)

  return (
    <button type='submit' {...rest}>
      {children}
      {/* {form?.loader && */}

      <DotsLoader dotSize={6} />
    </button>
  )
}

export default Button
