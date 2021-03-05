import React, { useRef, useState } from 'react'
import Style, { ConfirmToken } from './styles'

import { emailSchema } from 'utils/validations/forgotPassword'

import SendEmailIcon from 'assets/SendEmailIcon'
import PadlockIcon from 'assets/Inputs/PadlockIcon'
import MailIcon from 'assets/Inputs/MailIcon'

import Logo from 'components/Logo'
import { Form, Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'

import { useHistory } from 'react-router-dom'

const Content = () => {
  const popupRef = useRef<PopupMethods>(null)
  const history = useHistory()
  const [userEmail, setUserEmail] = useState<string>()
  const [tokenIsSend, setTokenIsSend] = useState(false)

  const onEmailSubmit = (result: any) => {
    result.success
      ? setTokenIsSend(true)
      : popupRef.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Email não cadastrado em nossa plataforma'
        })
  }

  const onTokenSubmit = (result: any) => {
    if (result.success) {
      localStorage.setItem('reset-password-token', result.token)
      history.push('/reset-password')
    } else
      popupRef.current?.configPopup({
        setModal: true,
        type: 'error',
        message: 'Token inválido!'
      })
  }

  const onTokenResent = (result: any) => {
    result.success
      ? popupRef.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Código reenviado!'
        })
      : popupRef.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Algo inesperado ocorreu'
        })
  }

  return (
    <>
      <Style>
        <Logo />

        {!tokenIsSend ? (
          <ConfirmToken>
            <p>Confirme o código enviado para o seu email</p>

            <Form
              captcha
              path='forgot-password'
              className='resendModal'
              afterResData={onTokenResent}
            >
              <Text hidden name='email' value={userEmail} />

              <Submit>
                <SendEmailIcon />
                Reenviar código
              </Submit>
            </Form>

            <Form
              loading
              captcha
              path='reset-password'
              afterResData={onTokenSubmit}
            >
              <Text
                name='token'
                placeholder='Código'
                icon={PadlockIcon}
                getValue={value =>
                  localStorage.setItem('reset-password-token', value)
                }
              />

              <Submit className='submit'>Confirmar</Submit>
            </Form>
          </ConfirmToken>
        ) : (
          <Form
            loading
            captcha
            path='forgot-password'
            schema={emailSchema}
            afterResData={onEmailSubmit}
          >
            <p>Digite seu email para recuperar a senha</p>

            <Text
              name='email'
              placeholder='E-mail'
              icon={MailIcon}
              getValue={setUserEmail}
            />

            <p>
              Enviaremos uma email para o seguinte endereço contendo instruções
              para renovação da senha
            </p>

            <Submit>Enviar</Submit>
          </Form>
        )}
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default Content
