import React, { ButtonHTMLAttributes } from 'react'
import Style from './styles'

import { ThemeState } from 'store/Theme'
import { useSelector, RootState } from 'store'

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
