import React from 'react'

import { Form } from '@unform/web'
import { FiLock } from 'react-icons/fi'

import Logo from 'assets/Logo'
import InputText from 'components/InputText'

import { Container, Style } from '../styles'
import { PasswordBlock, ButtonPassword } from './styles'

const ConfirmPassword = () => {
  return (
    <Style>
      <Container>
        <header>
          <Logo />
        </header>

        <PasswordBlock>
          <Form onSubmit={() => {}}>
            <h3>Digite sua nova senha</h3>
            <InputText
              name='password'
              type='password'
              placeholder='Senha'
              eye
              icon={FiLock}
              size={23}
            />
            <h3>Confirme sua nova senha</h3>
            <InputText
              eye
              type='password'
              name='password'
              placeholder='Confirmar senha'
              icon={FiLock}
              size={23}
            />

            <ButtonPassword type='submit'>Redefinir</ButtonPassword>
          </Form>
        </PasswordBlock>
      </Container>
    </Style>
  )
}

export default ConfirmPassword
