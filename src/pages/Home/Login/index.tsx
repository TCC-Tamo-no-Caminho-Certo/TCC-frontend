import React, { useContext, useRef, useEffect, useCallback } from 'react'
import { FiUser, FiLock } from 'react-icons/fi'
import loginSchema from 'validations/login'
import InputText from 'components/InputText/'
import Anime from '@mollycule/react-anime'
import Logo from 'assets/Logo'
import { useTheme } from 'hooks/useTheme'
import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import Switch from 'react-switch'
import { ThemeContext } from 'styled-components'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import anime from 'animejs'
import { useAuth } from 'hooks/useAuth'
import getValidationErrors from 'utils/getValidationErrors'
import { useRegister } from 'hooks/useRegister'
import {
  Style,
  Content,
  ThemeSwitch,
  LoginButton,
  SignupButton,
} from './styles'

interface FormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const themeSwitchRef = useRef(null)
  const loginRef = useRef(null)
  const history = useHistory()
  const contentRef = useRef(null)
  const loginFormRef = useRef<FormHandles>(null)
  const { themeState, setThemeState } = useTheme()
  const themes = useContext(ThemeContext)
  const { login } = useAuth()
  const { register, setRegister } = useRegister()

  const onLoginSubmit: SubmitHandler<FormData> = useCallback(
    async (data, { reset }, event) => {
      event?.preventDefault()
      try {
        await loginSchema.validate(data, { abortEarly: false })
        await login(data)
        loginFormRef.current?.setErrors({})
        reset()
        history.push('/map')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errorList = getValidationErrors(error)
          loginFormRef.current?.setErrors(errorList)
        }
      }
    },
    [history, login]
  )

  useEffect(() => {
    anime({
      targets: contentRef.current,
      translateX: [300, 0],
      translateY: [-10, 0],
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeInOutSine',
    })
  }, [])

  return (
    <Anime
      in={!register}
      appear={false}
      duration={2010}
      onExiting={{
        easing: 'easeOutQuad',
        translateX: [0, '-100vw'],
      }}
      onEntering={{
        easing: 'easeOutQuad',
        translateX: ['-98vw', 0],
        duration: 1960,
      }}
    >
      <Style ref={loginRef}>
        <ThemeSwitch ref={themeSwitchRef}>
          <span>Darkmode</span>
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
          />
        </ThemeSwitch>
        <Content ref={contentRef}>
          <Logo />
          <Form ref={loginFormRef} onSubmit={onLoginSubmit}>
            <InputText name='email' placeholder='E-mail' icon={FiUser} />
            <InputText
              name='password'
              placeholder='Senha'
              icon={FiLock}
              type='password'
            />
            <LoginButton type='submit'>Entrar</LoginButton>
          </Form>
          <SignupButton onClick={() => setRegister(true)}>
            Cadastrar
          </SignupButton>
        </Content>
      </Style>
    </Anime>
  )
}
export default Login
