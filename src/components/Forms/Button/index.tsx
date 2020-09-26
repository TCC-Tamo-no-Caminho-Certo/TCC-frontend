import React, { ButtonHTMLAttributes } from 'react'

import { useSelector, RootState, ThemeState } from 'store'
import Style from './styles'


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  return (
    <Style className='Button' theme={theme} {...rest}>
      {children}
    </Style>
  )
}

export default Button
