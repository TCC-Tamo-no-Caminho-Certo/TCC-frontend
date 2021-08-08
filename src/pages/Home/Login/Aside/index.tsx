import React, { useContext, useState } from 'react'
import Style, { Content, LoginFailure, Register } from './styles'

import loginSchema from 'utils/validations/login'

import { HomeActions, HomeState } from 'store/Sync/home'
import { getValidation } from 'store/Async/validation'
import { RootState } from 'store'

import MailIcon from 'assets/Inputs/MailIcon'
import PadlockIcon from 'assets/Inputs/PadlockIcon'
import AlertIcon from 'assets/Inputs/AlertIcon'

import FullLogo from 'components/FullLogo'
// import Logo from 'components/Logo'
import Form, { Checkbox, Submit, Text } from 'components/Form'
import Presence from 'components/Presence'

// import ThemeSwitch from 'components/ThemeSwitch'
import { GlobalContext } from 'App'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

export interface LoginData {
  email: string
  captcha: string
  password: string
  remember?: boolean
}

const Aside = () => {
  const { overflow } = useContext(GlobalContext)

  const home = useSelector<RootState, HomeState>(({ home }) => home)

  const [loginFailed, setLoginFailed] = useState('')
  const [disabled, setDisabled] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const afterSubmit = (res: any) => {
    if (res.success) {
      localStorage.setItem('@SLab_ac_token', res.access_token)
      dispatch(getValidation())
    } else {
      switch (res.error) {
        case 'User not found!':
          setLoginFailed('E-mail não encontrado')
          break

        case 'Incorrect password!':
          setLoginFailed('Senha incorreta')
          break

        default:
          setLoginFailed('Ops, algo deu errado :(')
      }

      setTimeout(() => setLoginFailed(''), 3000)
    }
  }

  const onRegisterClick = () => {
    setDisabled(true)

    overflow?.setOverflow &&
      overflow?.setOverflow({ x: 'hidden', overflow: undefined })

    dispatch(
      HomeActions.update({ initial: true, page: 'signup', disable: true })
    )

    history.push('/home/signup')

    setTimeout(() => {
      dispatch(HomeActions.update({ disable: false }))

      overflow?.setOverflow && overflow?.setOverflow({ overflow: 'auto' })
    }, 1300)
  }

  return (
    <Style>
      {/* <ThemeSwitch /> */}

      <Content>
        <header>
          <FullLogo />
        </header>

        <Form
          captcha
          loading
          path='sign-in'
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

        <Register>
          <span>Ainda não possui uma conta ?</span>

          <button
            type='button'
            onClick={onRegisterClick}
            disabled={disabled || home.disable}
          >
            Registre-se aqui!
          </button>
        </Register>
      </Content>
    </Style>
  )
}

export default Aside
