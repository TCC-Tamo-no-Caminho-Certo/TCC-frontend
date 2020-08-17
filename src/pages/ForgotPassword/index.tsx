import React, { useState } from 'react'
import { Form } from '@unform/web'
import { FiUser, FiLock } from 'react-icons/fi'

import Logo from '../../assets/Logo'
import InputText from '../../components/InputText'

import { Loader } from '../../styles/GlobalStyle'
import { Style, Container, InputBlock, ConfirmToken, Button } from './styles'

const ForgotPassword: React.FC = () => {
  const [tokenIsSend, setTokenIsSend] = useState(false)
  const [confirmToken, setConfirmToken] = useState(false)

  return (
    <Style>
      <Container>
        <header>
          <Logo />
        </header>

        {tokenIsSend ? (
          <ConfirmToken>
            <Form onSubmit={() => {}}>
              <h3>Confirme o código enviado para o seu email</h3>
              <InputText name='email' placeholder='Ex: 1234' icon={FiLock} size={23} />

              <div className='reSendContainer'>
                <button className='reSend' type='button'>
                  Envie novamente
                </button>
              </div>

              <Button type='submit' onClick={() => setConfirmToken(true)}>
                Confirmar
                {confirmToken && (
                  <span>
                    <Loader size='18px' border='3px' />
                  </span>
                )}
              </Button>
            </Form>
          </ConfirmToken>
        ) : (
          <InputBlock>
            <Form onSubmit={() => {}}>
              <h3>Digite seu email para recuperar a senha</h3>
              <InputText name='email' placeholder='E-mail' icon={FiUser} size={23} />
              <p>
                Enviaremos uma email para o seguinte endereço contendo instruções para
                renovação da senha
              </p>

              <Button type='submit' onClick={() => setTokenIsSend(true)}>
                Enviar
              </Button>
            </Form>
          </InputBlock>
        )}
      </Container>
    </Style>
  )
}

export default ForgotPassword
