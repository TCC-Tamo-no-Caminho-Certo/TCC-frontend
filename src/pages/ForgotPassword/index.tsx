import React, { useState } from 'react'

import Logo from 'styles/Logo'

import { emailSchema } from 'utils/validations/forgotPassword'

import { useSelector, RootState, ThemeState } from 'store'

import { Form, Input, Button } from 'components/Form'
import Modal, { ModalAttributes } from 'components/Modal'

import { useHistory } from 'react-router-dom'
import { FiUser, FiLock } from 'react-icons/fi'
import { RiArrowLeftSLine } from 'react-icons/ri'

import Style, { ConfirmToken } from './styles'

const ForgotPassword: React.FC = () => {

  const [userEmail, setUserEmail] = useState<string>()
  const [tokenIsSend, setTokenIsSend] = useState(false)
  const [modalAttributes, setModalAttributes] = useState<ModalAttributes>({ visible: false })
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const history = useHistory()

  const handleEmailSubmit = (result: any) => {
    result.success ?
    setTokenIsSend(true) :
    setModalAttributes({
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
    result.success ?
    setModalAttributes({
        visible: true,
        title: 'Sucesso',
        message: 'Código reenviado!',
        color: '#13c47c',
      })
    :
    setModalAttributes({
        visible: true,
        title: 'Erro',
        message: 'Algo inesperado ocorreu',
        color: '#e8423f',
      })
  }

  return (
    <>
      <Modal {...modalAttributes} onOKClick={() => setModalAttributes({ visible: false })} />

      <Style theme={theme}>
        <button className='backButton' onClick={() => history.goBack()}>
          <RiArrowLeftSLine size={30} />
          <span>Voltar</span>
        </button>

        <article>
          <header>
            <Logo />
          </header>

          {tokenIsSend ? (
            <ConfirmToken theme={theme}>
              <Form cb={handleTokenSubmit} path='reset-password' loaderFB captcha>
                <h3>Confirme o código enviado para o seu email</h3>

                <Input name='token' placeholder='Código' icon={FiLock} />

                <Button className='submit'>Confirmar</Button>
              </Form>

              <Form className='resendContainer' cb={handleTokenResent} path='forgot-password' captcha>
                <Input name='email' hidden value={userEmail}></Input>
                <Button>Envie novamente</Button>
              </Form>
            </ConfirmToken>
          ) : (
            <section>
              <Form cb={handleEmailSubmit} valSchema={emailSchema} path='forgot-password' loaderFB captcha>
                <h3>Digite seu email para recuperar a senha</h3>

                <Input name='email' placeholder='E-mail' icon={FiUser} handleValue={setUserEmail} />

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
