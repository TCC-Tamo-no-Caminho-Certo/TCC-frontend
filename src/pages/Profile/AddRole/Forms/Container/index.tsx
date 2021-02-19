import React, { ReactNode, useEffect } from 'react'
import Style, { Content, Header } from './styles'

import makeRoleLabel from 'utils/makeRoleLabel'

import { Role } from 'store/user'

interface ContainerProps {
  role: Role
  children: ReactNode
}

const Container = ({ role, children }: ContainerProps) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 100)
  }, [])

  return (
    <Style>
      <Content role={role}>
        <Header>Solicitação de perfil</Header>

        <div id='role'>{makeRoleLabel(role)}</div>

        {children}

        <button
          id='scrollButton'
          type='button'
          onClick={() => window.scrollTo(0, 0)}
        >
          Escolher outro papel
        </button>
      </Content>
    </Style>
  )
}

export default Container
