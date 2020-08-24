import React, { useEffect } from 'react'

import { Form } from '@unform/web'
import { FiLock } from 'react-icons/fi'

import api from 'services/api'
import Logo from 'assets/Logo'
import InputText from 'components/InputText'

import { Container, Style } from '../styles'
import { PasswordBlock, ButtonPassword } from './styles'
import { SubmitHandler } from '@unform/core'
import { useHistory } from 'react-router-dom'

interface ResetPassword {
  password: string
  token: string | null
}

const ConfirmPassword: React.FC = () => {
  const history = useHistory()
  let token: string

  useEffect(() => {
    const path = window.location.pathname.split('/')
    // eslint-disable-next-line
    token = path[2]
  }, [])

  const handleResetPassSubmit: SubmitHandler<ResetPassword> = async (data, { reset }, event) => {
    event?.preventDefault()
    try {
      const resetToken = token || localStorage.getItem('reset-password-token')
      // eslint-disable-next-line no-param-reassign
      data.token = resetToken
      await api.post('reset-password', data)
      alert('Senha alterada')
      history.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Style>
      <Container>
        <header>
          <Logo />
        </header>

        <PasswordBlock>
          <Form onSubmit={handleResetPassSubmit}>
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
              name='confirm_password'
              placeholder='Confirmar senha'
              icon={FiLock}
              size={23}
            />

            <ButtonPassword type='submit'> Redefinir</ButtonPassword>
          </Form>
        </PasswordBlock>
      </Container>
    </Style>
  )
}

export default ConfirmPassword
