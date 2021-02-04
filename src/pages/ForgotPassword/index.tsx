import React, { useState } from 'react'
import Style, { ConfirmToken } from './styles'

import Modal, { ModalAttributes } from 'pages/ForgotPassword/Modal'

import { emailSchema } from 'utils/validations/forgotPassword'

import { HomeActions } from 'store/home'

import SendEmailIcon from 'assets/SendEmailIcon'
import PadlockIcon from 'assets/Inputs/PadlockIcon'
import MailIcon from 'assets/Inputs/MailIcon'

import Logo from 'components/Logo'
import { Button, Form, Input } from 'components/Form'
import BackButton from 'components/BackButton'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch()

  const [userEmail, setUserEmail] = useState<string>()
  const [tokenIsSend, setTokenIsSend] = useState(false)
  const [modalAttributes, setModalAttributes] = useState<ModalAttributes>({
    visible: false,
  })

  const history = useHistory()

  const handleEmailSubmit = (result: any) => {
    result.success
      ? setTokenIsSend(true)
      : setModalAttributes({
          visible: true,
          message: 'Email não cadastrado em nossa plataforma',
          title: 'Erro',
          color: '#e8423f',
        })
  }

  const handleTokenSubmit = (result: any) => {
    if (result.success) {
      localStorage.setItem('reset-password-token', result.token)
      history.push('/reset-password')
    } else {
      setModalAttributes({
        visible: true,
        title: 'Erro',
        message: 'Token Inválido',
        color: '#e8423f',
      })
    }
  }

  const handleTokenResent = (result: any) => {
    result.success
      ? setModalAttributes({
          visible: true,
          title: 'Sucesso',
          message: 'Código reenviado!',
          color: '#13c47c',
        })
      : setModalAttributes({
          visible: true,
          title: 'Erro',
          message: 'Algo inesperado ocorreu',
          color: '#e8423f',
        })
  }

  return (
    <>
      <Modal {...modalAttributes} onOKClick={() => setModalAttributes({ visible: false })} />

      <Style>
        <BackButton
          to='/home'
          onTap={() => {
            dispatch(HomeActions.update({ initial: false, page: 'login' }))
          }}
        />

        <article>
          <Logo />

          {tokenIsSend ? (
            <ConfirmToken>
              <h3>Confirme o código enviado para o seu email</h3>

              <Form
                className='resendContainer'
                afterResData={handleTokenResent}
                path='forgot-password'
                captcha
              >
                <Input name='email' hidden value={userEmail} />

                <Button>
                  <SendEmailIcon />
                  Reenviar código
                </Button>
              </Form>

              <Form afterResData={handleTokenSubmit} path='reset-password' loading captcha>
                <Input
                  name='token'
                  placeholder='Código'
                  handleValue={value => localStorage.setItem('reset-password-token', value)}
                  icon={PadlockIcon}
                />

                <Button className='submit'>Confirmar</Button>
              </Form>
            </ConfirmToken>
          ) : (
            <section>
              <Form
                afterResData={handleEmailSubmit}
                schema={emailSchema}
                path='forgot-password'
                loading
                captcha
              >
                <h3>Digite seu email para recuperar a senha</h3>

                <Input
                  name='email'
                  placeholder='E-mail'
                  icon={MailIcon}
                  handleValue={setUserEmail}
                />

                <p>
                  Enviaremos uma email para o seguinte endereço contendo instruções para renovação
                  da senha
                </p>

                <Button className='submit'>Enviar</Button>
              </Form>
            </section>
          )}
        </article>
      </Style>
    </>
  )
}

export default ForgotPassword
