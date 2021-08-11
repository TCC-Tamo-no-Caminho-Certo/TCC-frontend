import React, { ReactNode } from 'react'
import Style, { Header } from './styles'

import { RoleType } from 'types/Responses/user/roles'

interface CardProps {
  role?: RoleType
  headerText: string
  children: ReactNode
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
