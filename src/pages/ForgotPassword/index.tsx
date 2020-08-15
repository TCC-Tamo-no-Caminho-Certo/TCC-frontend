import React from 'react'

import Logo from '../../assets/Logo'

import InputText from '../../components/InputText'
import { Style, Container, InputBlock } from './styles'
import { FiUser } from 'react-icons/fi'

import { Form } from '@unform/web'

const ForgotPassword: React.FC = () => {
  return (
    <Style>
      <Container>
        <div>
          <Logo />
        </div>

        <InputBlock>
          <Form onSubmit={() => {}}>
            <h3>Digite seu email para recuperar a senha</h3>
            <InputText name='email' placeholder='E-mail' icon={FiUser} size={23} />
            <p>
              Enviaremos uma email para o seguinte endereço contendo instruções para
              renovação da senha
            </p>

            <button type='submit'>Enviar</button>
          </Form>
        </InputBlock>
      </Container>
    </Style>
  )
}

export default ForgotPassword
