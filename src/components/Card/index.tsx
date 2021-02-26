import React, { ReactElement } from 'react'
import Style, { Header } from './styles'

interface CardProps {
  children: (ReactElement | ReactElement[])[] | ReactElement
  headerText: string
}

const Card = ({ headerText, children }: CardProps) => {
  return (
    <Style className='Card'>
      <Header>{headerText}</Header>

      {children}
    </Style>
  )
}

export default Card
