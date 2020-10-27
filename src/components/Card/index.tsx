import React, { ReactElement } from 'react'
import Style, { Header } from './styles'

interface Props {
  children: (ReactElement | ReactElement[])[] | ReactElement
  headerText: string
}

const Card: React.FC<Props> = ({ headerText, children }) => {
  return (
    <Style>
      <Header>{headerText}</Header>
      {children}
    </Style>
  )
}

export default Card
