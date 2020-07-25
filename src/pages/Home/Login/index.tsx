import React, { useContext, useRef, useEffect, useCallback } from 'react'
import { FiUser, FiLock } from 'react-icons/fi'
import loginSchema from 'validations/login'
import InputText from 'components/InputText/'
import facebook from 'assets/facebook.png'
import google from 'assets/google.png'
import Github from 'assets/Github'
import Logo from 'assets/Logo'
import { useTheme } from 'hooks/useTheme'
import { Form } from '@unform/web'
import { SubmitHandler, FormHandles } from '@unform/core'
import Switch from 'react-switch'
import { ThemeContext } from 'styled-components'
import { useHistory } from 'react-router-dom'
import Joi from '@hapi/joi'
// import api from 'services/api'
import anime from 'animejs'
import { useAuth } from 'hooks/useAuth'
import getValidationErrors from 'utils/getValidationErrors'
import { useRegister } from 'hooks/useRegister'
import {
  Row,
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

  useEffect(() => {
    anime({
      targets: contentRef.current,
      translateX: [300, 0],
      translateY: [-10, 0],
      opacity: [0, 1],
      duration: 2000,
      easing: 'easeInOutSine',
    })
    anime({
      targets: themeSwitchRef.current,
      translateY: [-300, 0],
      opacity: [0, 1],
      duration: 2600,
      easing: 'easeInOutSine',
    })
  }, [])

  useEffect(() => {
    if (register !== 'starting') {
      anime({
        targets: loginRef.current,
        duration: 1000,
        easing: 'easeInOutCirc',
        translateX: register === 'registering' ? [0, '-70vw'] : ['-70vw', 0],
      })
    }
  }, [register])

  const onSignupButtonClick = useCallback(() => {
    if (register !== 'starting') {
      register === 'registering'
        ? setRegister('notRegistering')
        : setRegister('registering')
    } else setRegister('registering')
  }, [register, setRegister])

  const onLoginSubmit: SubmitHandler<FormData> = useCallback(
    async (data, { reset }, event) => {
      event?.preventDefault()
      try {
        Joi.assert(data, loginSchema, { abortEarly: false })
        await login(data)
        loginFormRef.current?.setErrors({})
        reset()
        history.push('/map')
      } catch (error) {
        if (error instanceof Joi.ValidationError) {
          const errorList = getValidationErrors(error)
          loginFormRef.current?.setErrors(errorList)
        }
      }
    },
    [history, login]
  )

  return (
    <Style ref={loginRef}>
      <ThemeSwitch ref={themeSwitchRef}>
        <span>Darkmode</span>
        <Switch
          onChange={() => setThemeState(!themeState)}
          checked={themeState}
          offColor={themes.primary}
          offHandleColor={themes.background}
          onColor={themes.primary}
          onHandleColor={themes.background}
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
          <Row>
            <ul>
              <li>
                <img src={facebook} alt='facebook' />
              </li>
              <li>
                <Github />
              </li>
              <li>
                <img src={google} alt='google' />
              </li>
            </ul>
            <LoginButton type='submit'>Entrar</LoginButton>
          </Row>
        </Form>
        <SignupButton onClick={onSignupButtonClick}>Cadastrar</SignupButton>
      </Content>
    </Style>
  )
}
export default Login
