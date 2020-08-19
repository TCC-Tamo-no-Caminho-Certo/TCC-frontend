import React, { useRef, useEffect, useState, useCallback } from 'react'
import Style, { Register, Google, Permanence, Recaptcha } from './styles'

import Loader from 'styles/Loader'

import loginSchema from 'validations/login'

import Button from 'components/Button'
import Modal from 'components/Modal'
import InputText from 'components/InputText/'
import ThemeSwitch from 'components/ThemeSwitch'

import { useAuth } from 'hooks/useAuth'
import { useRegisterSlide } from 'hooks/useRegisterSlide'

import getValidationErrors from 'utils/getValidationErrors'

import Logo from 'assets/Logo'
import google from 'assets/google.png'

import anime from 'animejs'
import ReCAPTCHA from 'react-google-recaptcha'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { useHistory, Link } from 'react-router-dom'
import { FiUser, FiLock } from 'react-icons/fi'
import { SubmitHandler, FormHandles } from '@unform/core'

export interface LoginData {
  email: string
  password: string
  captcha: string
}

const Login: React.FC = () => {
  const loginFormRef = useRef<FormHandles>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const loginRef = useRef(null)

  const history = useHistory()
  const { login } = useAuth()

  const { registerSlide, setRegisterSlide } = useRegisterSlide()
  const [showLogin, setShowLogin] = useState(true)
  const [disabled, setDisabled] = useState(true)
  const [loadingLogin, setLoadingLogin] = useState(false)

  const onRegisterClick = () => {
    setRegisterSlide(true)
  }

  const onLoginSubmit: SubmitHandler<LoginData> = async (data, { reset }, event) => {
    event?.preventDefault()
    setLoadingLogin(true)
    try {
      let captchaToken
      if (recaptchaRef.current) captchaToken = await recaptchaRef.current.executeAsync()
      else throw new Error('recaptcha is equal null or undefined')
      await loginSchema.validate(data, { abortEarly: false })

      console.log('login:', { ...data, captcha: captchaToken })
      await login({ ...data, captcha: captchaToken as string })

      loginFormRef.current?.setErrors({})
      reset()
      setLoadingLogin(false)
      history.push('/map')
    } catch (error) {
      setLoadingLogin(false)
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)
        loginFormRef.current?.setErrors(errorList)
      }
    }
  }

  const loginAppearAnimation = () =>
    anime({
      targets: loginRef.current,
      translateX: [300, 0],
      translateY: [-10, 0],
      opacity: [0, 1],
      duration: 900,
      easing: 'easeInOutSine',
    })

  const loginSliderAnimation = useCallback(() => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 1000)

    if (registerSlide) {
      setTimeout(() => {
        setShowLogin(false)
      }, 1000)
    } else setShowLogin(true)
  }, [registerSlide])

  useEffect(() => {
    loginAppearAnimation()
  }, [])

  useEffect(() => {
    loginSliderAnimation()
  }, [loginSliderAnimation])

  return (
    <>
      <Recaptcha
        ref={recaptchaRef}
        size='invisible'
        sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
      />
      <Modal />
      {showLogin && (
        <Style ref={loginRef}>
          <ThemeSwitch />
          <Logo />
          <Google>
            <img src={google} alt='google' />
            Entrar com o Google
          </Google>
          <Form ref={loginFormRef} onSubmit={onLoginSubmit}>
            <InputText name='email' placeholder='E-mail' icon={FiUser} size={23} />

            <InputText
              name='password'
              placeholder='Senha'
              icon={FiLock}
              size={23}
              type='password'
              eye
            />

            <Button type='submit'>
              <div>Efetuar Login</div>
              <span>{loadingLogin && <Loader size='18px' border='3px' />}</span>
            </Button>
          </Form>

          <Link to='/forgot-password'>Esqueci minha senha</Link>

          <Permanence htmlFor='permanence'>
            <input type='checkbox' id='permanence' />
            Permanecer conectado
          </Permanence>

          <Register>
            Ainda não possui uma conta ?
            <br />
            <button type='button' disabled={disabled} onClick={onRegisterClick}>
              Registre-se aqui!
            </button>
          </Register>
        </Style>
      )}
    </>
  )
}

export default Login
