import React, { useRef, useState } from 'react'
import Style, { ConfirmCode } from './styles'

import { emailSchema } from 'utils/validations/forgotPassword'

import { HomeActions } from 'store/Sync/home'

import SendEmailIcon from 'assets/global/SendEmailIcon'
import PadlockIcon from 'assets/Inputs/PadlockIcon'
import MailIcon from 'assets/Inputs/MailIcon'

import Popup, { PopupForwardeds } from 'components/Popup'
import { Form, Submit, Text } from 'components/Form'
import FullLogo from 'components/FullLogo'
import BackButton from 'components/BackButton'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Content = () => {
  const popupRef = useRef<PopupForwardeds>(null)

  const [userEmail, setUserEmail] = useState<string>()
  const [codeSend, setCodeSend] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const onBackButtonClick = () => {
    if (codeSend) setCodeSend(false)
    else {
      dispatch(HomeActions.update({ initial: false, page: 'login' }))
      history.push('/home')
    }
  }

  const afterEmailSubmit = ({ success }: any) => {
    success
      ? setCodeSend(true)
      : popupRef?.current?.configPopup({
          open: true,
          type: 'error',
          message: 'Email não cadastrado em nossa plataforma.'
        })
  }

  const afterCodeSubmit = ({ success }: any) => {
    success
      ? setTimeout(() => history.push('/reset-password'), 1)
      : popupRef?.current?.configPopup({
          open: true,
          type: 'error',
          message: 'Código inválido!'
        })
  }

  const afterCodeResent = ({ success }: any) => {
    success
      ? popupRef?.current?.configPopup({
          open: true,
          type: 'success',
          message: 'Código reenviado!'
        })
      : popupRef?.current?.configPopup({
          open: true,
          type: 'error',
          message: 'Ops, algo deu errado :('
        })
  }

  return (
    <>
      <BackButton onClick={onBackButtonClick} />

      <Style>
        <FullLogo />

        {!codeSend && (
          <Form
            loading
            captcha
            method='get'
            id='sendE-mail'
            schema={emailSchema}
            addToPath={['email']}
            path='api/forgot-password/*%'
            afterResData={afterEmailSubmit}
            getData={({ email }) => setUserEmail(email)}
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
              addToPath={['email']}
              className='resendModal'
              path='api/forgot-password/*%'
              afterResData={afterCodeResent}
            >
              <Text hidden readOnly name='email' value={userEmail} />

              <Submit>
                <SendEmailIcon />

                <div>Reenviar código</div>
              </Submit>
            </Form>

            <Form
              loading
              captcha
              addToPath={['code']}
              path='api/reset-password/*%'
              afterResData={afterCodeSubmit}
              getData={({ code }) => localStorage.setItem('@SLab_code', code)}
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
