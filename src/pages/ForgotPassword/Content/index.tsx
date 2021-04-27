import React, { useState } from 'react'
import Style, { ConfirmCode } from './styles'

import { emailSchema } from 'utils/validations/forgotPassword'

import { Response, RootState } from 'store'
import { PopupState } from 'store/Sync/popup'

import SendEmailIcon from 'assets/global/SendEmailIcon'
import PadlockIcon from 'assets/Inputs/PadlockIcon'
import MailIcon from 'assets/Inputs/MailIcon'
import Logo from 'assets/FullLogo'

import { Form, Submit, Text } from 'components/Form'

import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Content = () => {
  const { popupRef } = useSelector<RootState, PopupState>(({ popup }) => popup)

  const [userEmail, setUserEmail] = useState<string>()
  const [codeSend, setCodeSend] = useState(false)

  const history = useHistory()

  const afterEmailSubmit = (res: Response<any>) => {
    res.success
      ? setTimeout(() => setCodeSend(true), 1)
      : popupRef?.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Email não cadastrado em nossa plataforma.'
        })
  }

  const afterCodeSubmit = (res: Response<any>) => {
    res.success
      ? setTimeout(() => history.push('/reset-password'), 1)
      : popupRef?.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Código inválido!'
        })
  }

  const afterCodeResent = (res: Response<any>) => {
    res.success
      ? popupRef?.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Código reenviado!'
        })
      : popupRef?.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Ops, algo deu errado :('
        })
  }

  return (
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
          afterResData={afterEmailSubmit}
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
            method='get'
            className='resendModal'
            path='forgot-password/*%'
            afterResData={afterCodeResent}
            addToPath={['email']}
          >
            <Text hidden readOnly name='email' value={userEmail} />

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
            afterResData={afterCodeSubmit}
            getData={value => localStorage.setItem('@SLab_code', value.code)}
          >
            <Text name='code' placeholder='Código' icon={PadlockIcon} />

            <Submit>Confirmar</Submit>
          </Form>
        </ConfirmCode>
      )}
    </Style>
  )
}

export default Content
