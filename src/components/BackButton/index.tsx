import React, { ButtonHTMLAttributes } from 'react'
import Style from './styles'

import { RiArrowLeftSLine } from 'react-icons/ri'
import { useHistory } from 'react-router-dom'

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string
  onTap(): void
}

const BackButton = ({ to, onTap, ...props }: BackButtonProps) => {
  const history = useHistory()

  const onButtonClick = () => {
    onTap()
    history.push(to)
  }

  return (
    <Style onClick={onButtonClick} {...props}>
      <RiArrowLeftSLine />
      Voltar
    </Style>
  )
}

export default BackButton
