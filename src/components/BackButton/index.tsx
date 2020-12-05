import React, { ButtonHTMLAttributes } from 'react'
import Style from './styles'

import { RootState, ThemeState, useSelector } from 'store'

import { RiArrowLeftSLine } from 'react-icons/ri'
import { useHistory } from 'react-router-dom'

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string
  onTap(): void
}

const BackButton: React.FC<BackButtonProps> = ({ to, onTap, ...props }) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const history = useHistory()

  const onButtonClick = () => {
    onTap()
    history.push(to)
  }

  return (
    <Style theme={theme} onClick={onButtonClick} {...props}>
      <RiArrowLeftSLine />
      Voltar
    </Style>
  )
}

export default BackButton
