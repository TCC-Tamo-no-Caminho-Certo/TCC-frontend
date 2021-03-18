import React, { useRef, useState } from 'react'
import Style, { ConfirmCode } from './styles'

import { emailSchema } from 'utils/validations/forgotPassword'

import SendEmailIcon from 'assets/SendEmailIcon'
import PadlockIcon from 'assets/Inputs/PadlockIcon'
import MailIcon from 'assets/Inputs/MailIcon'
import Logo from 'assets/Logo'

import { Form, Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'

import { useHistory } from 'react-router-dom'

const Content = () => {
  const history = useHistory()
  const popupRef = useRef<PopupMethods>(null)

  const [userEmail, setUserEmail] = useState<string>()
  const [codeSend, setCodeSend] = useState(false)

  const onEmailSubmit = (result: any) => {
    result.success
      ? setTimeout(() => setCodeSend(true), 1)
      : popupRef.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Email não cadastrado em nossa plataforma'
        })
  }

  const onCodeSubmit = (result: any) => {
    if (result.success) setTimeout(() => history.push('/reset-password'), 1)
    else
      popupRef.current?.configPopup({
        setModal: true,
        type: 'error',
        message: 'Código inválido!'
      })
  }

  const onCodeResent = (result: any) => {
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

        {!codeSend && (
          <Form
            id='sendE-mail'
            loading
            captcha
            path='forgot-password/*%'
            method='get'
            addToPath={['email']}
            schema={emailSchema}
            afterResData={onEmailSubmit}
            getData={value => setUserEmail(value.email)}
          >
            <p>Digite seu email para recuperar a senha</p>

            <Text name='email' placeholder='E-mail' icon={MailIcon} />

            <p>
              Enviaremos uma email para o seguinte endereço contendo instruções
              para renovação da senha
            </p>

            <Submit>Enviar</Submit>
          </Form>
        )}

        {codeSend && (
          <ConfirmCode>
            <p>Confirme o código enviado para o seu email</p>

            <Form
              captcha
              loading
              path='forgot-password/*%'
              method='get'
              className='resendModal'
              addToPath={['email']}
              afterResData={onCodeResent}
            >
              <Text hidden name='email' value={userEmail} readOnly />

              <Submit>
                <SendEmailIcon />
                Reenviar código
              </Submit>
            </Form>

            <Form
              loading
              captcha
              path='reset-password/*%'
              addToPath={['code']}
              afterResData={onCodeSubmit}
              getData={value => localStorage.setItem('@SLab_code', value.code)}
            >
              <Text name='code' placeholder='Código' icon={PadlockIcon} />

              <Submit>Confirmar</Submit>
            </Form>
          </ConfirmCode>
        )}
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default Content
