import React from 'react'
import Style, { Content } from './styles'

import { passwordSchema } from 'utils/validations/forgotPassword'

import PadlockIcon from 'assets/Inputs/PadlockIcon'

import Logo from 'components/Logo'
import { Form, Submit, Text } from 'components/Form'
import Modal from 'components/Modal'

const ConfirmPassword = () => {
  const path = window.location.pathname.split('/')
  const token = path[2] || localStorage.getItem('reset-password-token')

  if (!token) throw new Error('No token provided')

  const onResetSubmit = () => console.log('Senha alterada')

  return (
    <Style>
      <Modal>
        <div id='modal'></div>
      </Modal>

      <Content>
        <Logo />

        <Form
          loading
          captcha
          path='reset-password'
          // addData={{ token }}
          schema={passwordSchema}
          afterResData={onResetSubmit}
        >
          <p>Digite sua nova senha</p>

          <Text
            eye
            name='password'
            type='password'
            placeholder='Senha'
            icon={PadlockIcon}
          />

          <p>Confirme sua nova senha</p>

          <Text
            eye
            type='password'
            name='confirmPassword'
            placeholder='Confirmar senha'
            icon={PadlockIcon}
          />

          <Submit>Redefinir</Submit>
        </Form>
      </Content>
    </Style>
  )
}

export default ConfirmPassword
