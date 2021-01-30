import React, { useEffect } from 'react'
import Style, { Content, Form, Header, Input } from './styles'

import makeRoleLabel from 'utils/makeRoleLabel'

import { Role } from 'store/user'

import { Button } from 'components/Form'

interface AddRoleFormProps {
  role: Role
}

const AddRoleForm: React.FC<AddRoleFormProps> = ({ role }) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 100)
  }, [])

  return (
    <Style>
      <Content role={role}>
        <Header>Solicitação de perfil</Header>

        <div id='body'>
          <span>{makeRoleLabel(role)}</span>

          <Form path='user/complete-register' loading>
            <Input name='cpf' placeholder='CPF' />

            <p className='form-role-text'>
              A solicitação pode demorar um tempo pois será avaliada manualmente por um moderador
            </p>

            <Button>Enviar solicitação</Button>
          </Form>

          <button id='scrollButton' type='button' onClick={() => window.scrollTo(0, 0)}>
            Escolher outro papel
          </button>
        </div>
      </Content>
    </Style>
  )
}

export default AddRoleForm
