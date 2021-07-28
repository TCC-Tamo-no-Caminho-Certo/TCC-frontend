import React, { ReactElement } from 'react'
import Style, { Header } from './styles'

import { RoleType } from 'types/Responses/user/roles'

interface CardProps {
  headerText: string
  children: (ReactElement | ReactElement[])[] | ReactElement
  role?: RoleType
}

const Card = ({ headerText, children, role }: CardProps) => {
  return (
    <Style className='Card'>
      <Header className='Header' role={role}>
        {headerText}
      </Header>

      {children}
    </Style>
  )
}

export default Card
