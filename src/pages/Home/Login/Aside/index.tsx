import React, { useState } from 'react'
import Style, { LoginFailure } from './styles'

import loginSchema from 'utils/validations/login'

import { HomeActions } from 'store/home'
import { Response } from 'store'
import { getValidation } from 'store/AsyncThunks/validation'

import MailIcon from 'assets/Inputs/MailIcon'
import PadlockIcon from 'assets/Inputs/PadlockIcon'
import AlertIcon from 'assets/Inputs/AlertIcon'
import Logo from 'assets/Logo'

import Form, { Checkbox, Submit, Text } from 'components/Form'
import Presence from 'components/Presence'

// import ThemeSwitch from 'components/ThemeSwitch'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

export interface LoginData {
  email: string
  captcha: string
  password: string
  remember?: boolean
}

const Aside = () => {
  const [loginFailed, setLoginFailed] = useState('')
  const [disabled, setDisabled] = useState(false)
  const history = useHistory()

  const dispatch = useDispatch()

  const afterSubmit = (res: Response<any>) => {
    if (res.success) {
      localStorage.setItem('@SLab_ac_token', res.access_token)
      dispatch(getValidation())
    } else {
      switch (res.error) {
        case 'User not found!':
          setLoginFailed('E-mail não encontrado')
          break
        default:
          setLoginFailed('Ops, algo deu errado :(')
      }

      setTimeout(() => setLoginFailed(''), 9000)
    }
  }

  const onRegisterClick = () => {
    setDisabled(true)
    dispatch(HomeActions.update({ initial: true, page: 'signup' }))
    history.push('/home/signup')
  }

  return (
    <Style>
      {/* <ThemeSwitch /> */}

      <div id='content'>
        <header>
          <Logo />
        </header>

        <Form
          captcha
          loading
          path='login'
          schema={loginSchema}
          afterResData={afterSubmit}
        >
          <Presence
            condition={loginFailed !== ''}
            exit={{ x: '-10%', opacity: [1, 0] }}
            transition={{ type: 'tween', duration: 0.7 }}
            animate={{ x: ['-10%', '0%'], opacity: [0, 1] }}
          >
            <LoginFailure>
              <AlertIcon />

              <span>{loginFailed}</span>
            </LoginFailure>
          </Presence>

          <Text
            name='email'
            placeholder='E-mail'
            autoComplete='email'
            data-cy='input-login-email'
            icon={MailIcon}
          />

          <Text
            eye
            name='password'
            type='password'
            placeholder='Senha'
            data-cy='input-login-password'
            autoComplete='current-password'
            icon={PadlockIcon}
          />

          <div id='submit'>
            <Link to='/forgot-password'>Não consegue fazer login?</Link>

            <Submit data-cy='button-login-submit'>Efetuar Login</Submit>
          </div>

          <Checkbox name='remember' label='Permanecer conectado' />
        </Form>

        <footer>
          <span>Ainda não possui uma conta ?</span>

          <button
            type='button'
            data-cy='button-login-register'
            disabled={disabled}
            onClick={onRegisterClick}
          >
            Registre-se aqui!
          </button>
        </footer>
      </div>
    </Style>
  )
}

export default Aside
