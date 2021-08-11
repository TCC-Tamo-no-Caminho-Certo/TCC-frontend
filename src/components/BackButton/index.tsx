import React, { ButtonHTMLAttributes } from 'react'
import Style from './styles'

import { RiArrowLeftSLine } from 'react-icons/ri'
import { useHistory } from 'react-router-dom'

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string
  onClick: () => void
}

const BackButton = ({
  to,
  onClick,
  className = 'BackButton',
  ...props
}: BackButtonProps) => {
  const history = useHistory()

  const onBackButtonClick = () => {
    onClick()
    to && history.push(to)
  }

  return (
    <Style
      type='button'
      className={className}
      onClick={onBackButtonClick}
      {...props}
    >
      <RiArrowLeftSLine />
      Voltar
    </Style>
  )
}

export default BackButton
