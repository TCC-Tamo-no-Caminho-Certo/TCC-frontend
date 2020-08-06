import React, { useContext, useRef, useEffect, useState } from 'react'

import Style, { Content, ThemeSwitch, Register, Google, Permanence } from './styles'

import loginSchema from 'validations/login'

import Button from 'components/Button'

import InputText from 'components/InputText/'

import { useTheme } from 'hooks/useTheme'

import { useAuth } from 'hooks/useAuth'

import { useRegisterSlide } from 'hooks/useRegisterSlide'

import getValidationErrors from 'utils/getValidationErrors'

import Logo from 'assets/Logo'

import sun from 'assets/sun.svg'

import google from 'assets/google.png'

import * as Yup from 'yup'

import anime from 'animejs'

import Switch from 'react-switch'

import { Form } from '@unform/web'

import { useHistory } from 'react-router-dom'

import { ThemeContext } from 'styled-components'

import { FiUser, FiLock } from 'react-icons/fi'

import { GoogleReCaptcha } from 'react-google-recaptcha-v3'

import { SubmitHandler, FormHandles } from '@unform/core'

export interface LoginData {
  email: string

  password: string

  captcha: string
}

const Login: React.FC = () => {
  const history = useHistory()

  const contentRef = useRef(null)

  const loginFormRef = useRef<FormHandles>(null)

  const { themeState, setThemeState } = useTheme()

  const themes = useContext(ThemeContext)

  const { login } = useAuth()

  const { registerSlide, setRegisterSlide } = useRegisterSlide()

  const [showLogin, setShowLogin] = useState(true)

  const [disabled, setDisabled] = useState(true)

  const [captchaToken, setCaptchaToken] = useState('')

  useEffect(() => {
    setDisabled(true)

    setTimeout(() => {
      setDisabled(false)
    }, 2010)

    registerSlide
      ? setTimeout(() => {
          setShowLogin(false)
        }, 2000)
      : setShowLogin(true)
  }, [registerSlide])

  useEffect(() => {
    anime({
      targets: contentRef.current,

      translateX: [300, 0],

      translateY: [-10, 0],

      opacity: [0, 1],

      duration: 900,

      easing: 'easeInOutSine',
    })
  }, [])

  const onLoginSubmit: SubmitHandler<LoginData> = async (data, { reset }, event) => {
    event?.preventDefault()

    try {
      await loginSchema.validate(data, { abortEarly: false })

      loginFormRef.current?.setErrors({})

      console.log({ ...data, captcha: captchaToken })

      await login({ ...data, captcha: captchaToken })

      reset()

      history.push('/map')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)

        loginFormRef.current?.setErrors(errorList)
      }
    }
  }

  const onSignupClick = () => {
    setRegisterSlide(true)
  }

  return (
    <>
      {showLogin && (
        <Style>
          {/* <ThemeSwitch>
            <label htmlFor='switch'>Darkmode</label>

            <Switch
              onChange={() => setThemeState(!themeState)}
              checked={themeState}
              offColor={themes.primary}
              offHandleColor={themes.secondary}
              onColor={themes.primary}
              onHandleColor={themes.secondary}
              uncheckedIcon={false}
              checkedIcon={false}
              height={18}
              width={35}
              id='switch'
            />

            <img src={sun} alt='theme switch' />
          </ThemeSwitch> */}

          <Content ref={contentRef}>
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

              <GoogleReCaptcha onVerify={token => setCaptchaToken(token)} />

              <Button type='submit'>Efetuar Login</Button>
            </Form>

            <Permanence htmlFor='permanence'>
              <input type='checkbox' id='permanence' />
              Permanecer conectado
            </Permanence>

            <Register>
              Ainda não possui uma conta ?
              <br />
              <button type='button' disabled={disabled} onClick={onSignupClick}>
                Registre-se aqui!
              </button>
            </Register>
          </Content>
        </Style>
      )}
    </>
  )
}

export default Login
