import React, { ButtonHTMLAttributes } from 'react'
import Style from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Style className='Button' {...rest}>
      {children}
    </Style>
  )
}

export default Button
