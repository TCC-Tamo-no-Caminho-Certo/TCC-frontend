import React, { ReactElement } from 'react'
import Style, { Header } from './styles'

import { Role } from 'store/AsyncThunks/roles'

interface CardProps {
  children: (ReactElement | ReactElement[])[] | ReactElement
  headerText: string
  role?: Role
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
