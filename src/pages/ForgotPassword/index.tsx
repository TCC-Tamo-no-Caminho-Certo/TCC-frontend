import React, { useState, useRef } from 'react'

import Loader from 'styles/Loader'
import Logo from 'styles/Logo'

import { emailSchema } from 'utils/validations/forgotPassword'
import getValidationErrors from 'utils/getValidationErrors'

import api from 'services/api'

import { useSelector, RootState, ThemeState } from 'store'

import InputText from 'components/Forms/InputText'
import Modal, { ModalAttributes } from 'components/Modal'

import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { Form } from '@unform/web'
import { useHistory } from 'react-router-dom'
import { FiUser, FiLock } from 'react-icons/fi'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { SubmitHandler, FormHandles } from '@unform/core'

import Style, { InputBlock, ConfirmToken, Recaptcha } from './styles'

interface Email {
  email: string
  captcha: string
}

interface Token {
  token: string
}

const ForgotPassword: React.FC = () => {
  const [tokenIsSend, setTokenIsSend] = useState(false)
  const [confirmToken, setConfirmToken] = useState(false)
  const [userEmail, setUserEmail] = useState<Email>()
  const [modalAttributes, setModalAttributes] = useState<ModalAttributes>({ visible: false })
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const emailRef = useRef<FormHandles>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const history = useHistory()

  const handleModalOKClick = () => {
    setModalAttributes({ visible: false })
  }

  const handleEmailSubmit: SubmitHandler<Email> = async (data, { reset }, event) => {
    event?.preventDefault()

    try {
      await emailSchema.validate(data, { abortEarly: false })
      emailRef.current?.setErrors({})
      setUserEmail(data)
      let captchaToken
      if (recaptchaRef.current) {
        captchaToken = await recaptchaRef.current.executeAsync()
      } else {
        throw new Error('recaptcha is equal null or undefined')
      }

      await api.post('forgot-password', { ...data, captcha: captchaToken as string })
      setTokenIsSend(true)
      reset()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)
        emailRef.current?.setErrors(errorList)
      } else {
        setModalAttributes({
          visible: true,
          message: 'Email não cadastrado em nossa plataforma',
          title: 'Erro',
          color: '#e8423f',
        })
      }
    }
  }

  const handleTokenSubmit: SubmitHandler<Token> = async (data, { reset }, event) => {
    event?.preventDefault()
    setConfirmToken(true)

    try {
      let captchaToken
      if (recaptchaRef.current) {
        captchaToken = await recaptchaRef.current.executeAsync()
      } else {
        throw new Error('recaptcha is equal null or undefined')
      }

      await api.post('reset-password', { ...data, captcha: captchaToken as string })
      localStorage.setItem('reset-password-token', data.token)
      setConfirmToken(false)
      history.push('/reset-password')
    } catch (error) {
      setConfirmToken(false)
      setModalAttributes({
        visible: true,
        title: 'Erro',
        message: 'Token Inválido',
        color: '#e8423f',
      })
    }
  }

  const handleTokenResent = async () => {
    try {
      let captchaToken
      if (recaptchaRef.current) {
        captchaToken = await recaptchaRef.current.executeAsync()
      } else {
        throw new Error('recaptcha is equal null or undefined')
      }

      console.log(userEmail)

      await api.post('forgot-password', { ...userEmail, captcha: captchaToken as string })
      setModalAttributes({
        visible: true,
        title: 'Sucesso',
        message: 'Código reenviado!',
        color: '#13c47c',
      })
    } catch (e) {
      setModalAttributes({
        visible: true,
        title: 'Erro',
        message: 'Algo inesperado ocorreu',
        color: '#e8423f',
      })
    }
  }

  return (
    <>
      <Recaptcha
        ref={recaptchaRef}
        size='invisible'
        sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
      />

      <Modal {...modalAttributes} onOKClick={handleModalOKClick} />

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
              <Form onSubmit={handleTokenSubmit}>
                <h3>Confirme o código enviado para o seu email</h3>

                <InputText name='token' placeholder='Código' icon={FiLock} />

                <div className='resendContainer'>
                  <button className='resend' type='button' onClick={handleTokenResent}>
                    Envie novamente
                  </button>
                </div>

                <button className='submit' type='submit'>
                  Confirmar
                  {confirmToken && (
                    <span>
                      <Loader size='18px' border='3px' />
                    </span>
                  )}
                </button>
              </Form>
            </ConfirmToken>
          ) : (
            <InputBlock>
              <Form onSubmit={handleEmailSubmit} ref={emailRef}>
                <h3>Digite seu email para recuperar a senha</h3>

                <InputText name='email' placeholder='E-mail' icon={FiUser} iconSize='65%' />

                <p>
                  Enviaremos uma email para o seguinte endereço contendo instruções para renovação
                  da senha
                </p>

                <button className='submit' type='submit'>Enviar</button>
              </Form>
            </InputBlock>
          )}
        </article>
      </Style>
    </>
  )
}

export default ForgotPassword
