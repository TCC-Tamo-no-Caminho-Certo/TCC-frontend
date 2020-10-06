import React, { useRef, useState } from 'react'
import Style, { Content, Register, Google, Recaptcha, Permanence } from './styles'

import google from 'assets/google.png'

import loginSchema from 'utils/validations/login'
import getValidationErrors from 'utils/getValidationErrors'

import { useAuth } from 'hooks/useAuth'
import { useSelector, RootState, ThemeState } from 'store'

import Button from 'components/Forms/Button'
import InputText from 'components/Forms/InputText/'
import Checkbox from 'components/Forms/Checkbox'
import ThemeSwitch from 'components/ThemeSwitch'

import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { Form } from '@unform/web'
import { FiLock } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'
import { useHistory, Link } from 'react-router-dom'
import { SubmitHandler, FormHandles } from '@unform/core'

export interface LoginData {
  email: string
  password: string
  captcha: string
  remember?: boolean
}

const FormLogin: React.FC = () => {
  const loginFormRef = useRef<FormHandles>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const loginRef = useRef(null)

  const history = useHistory()
  const { login } = useAuth()

  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const onLoginSubmit: SubmitHandler<LoginData> = async (data, { reset }, event) => {
    event?.preventDefault()

    try {
      let captchaToken

      if (recaptchaRef.current) {
        captchaToken = await recaptchaRef.current.executeAsync()
      } else {
        throw new Error('recaptcha is equal null or undefined')
      }

      await loginSchema.validate(data, { abortEarly: false })
      await login({ ...data, captcha: captchaToken as string })

      loginFormRef.current?.setErrors({})
      reset()
      history.push('/main')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)
        loginFormRef.current?.setErrors(errorList)
      }
    }
  }

  return (
    <>
      <Recaptcha
        ref={recaptchaRef}
        size='invisible'
        sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
      />

      <Style theme={theme} ref={loginRef}>
        <header>
          <ThemeSwitch />
        </header>

        <Content theme={theme}>
          <Google theme={theme}>
            <img src={google} alt='google' />
            <span>Entrar com o Google</span>
          </Google>

          <Form ref={loginFormRef} onSubmit={onLoginSubmit}>
            <InputText
              name='email'
              placeholder='E-mail'
              icon={AiOutlineMail}
              iconSize='65%'
              autoComplete='email'
            />

            <InputText
              name='password'
              type='password'
              placeholder='Senha'
              icon={FiLock}
              iconSize='65%'
              eye
              autoComplete='current-password'
            />

            <Button type='submit'>
              <div>Efetuar Login</div>
            </Button>

            <Permanence theme={theme}>
              <Checkbox name='remember' />
              <label htmlFor='remember'>Permanecer conectado</label>
            </Permanence>
          </Form>

          <Link to='/forgot-password'>Não consegue fazer login?</Link>

          <Register theme={theme}>
            <span>Ainda não possui uma conta ?</span>

            <Link to='/signup'>Registre-se aqui!</Link>
          </Register>
        </Content>
      </Style>
    </>
  )
}

export default FormLogin
