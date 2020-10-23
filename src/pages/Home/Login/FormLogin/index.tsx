import React from 'react'
import Style, { Content, Google, Permanence, Register } from './styles'

import loginSchema from 'utils/validations/login'

import { RootState, useDispatch, useSelector } from 'store'
import { HomeActions } from 'store/home'
import { ThemeState } from 'store/theme'

import google from 'assets/google.png'

import { Button, Form, Input } from 'components/Form'
import Logo from 'components/Logo'
import ThemeSwitch from 'components/ThemeSwitch'

import { AiOutlineMail } from 'react-icons/ai'
import { FiLock } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

export interface LoginData {
  email: string
  password: string
  captcha: string
  remember?: boolean
}

const FormLogin: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = (resData: any) => {
    if (resData.success) {
      localStorage.setItem('@SLab_ac_token', resData.access_token)
      history.push('/session/main')
    }
  }

  return (
    <Style theme={theme}>
      <header>
        <ThemeSwitch />
      </header>

      <Content theme={theme}>
        <Logo />

        <Google theme={theme}>
          <img src={google} alt='google' />
          <span>Entrar com o Google</span>
        </Google>

        <Form callback={handleSubmit} valSchema={loginSchema} path='login' loading captcha>
          <Input name='email' placeholder='E-mail' icon={AiOutlineMail} autoComplete='email' />

          <Input
            name='password'
            type='password'
            placeholder='Senha'
            autoComplete='current-password'
            icon={FiLock}
            eye
          />

          <Button>
            <div>Efetuar Login</div>
          </Button>

          <Permanence theme={theme}>
            <Input type='checkbox' name='remember' />

            <label htmlFor='remember'>Permanecer conectado</label>
          </Permanence>
        </Form>

        <Link to='/forgot-password' onClick={() => dispatch(HomeActions.animation(false))}>
          Não consegue fazer login?
        </Link>

        <Register theme={theme}>
          <span>Ainda não possui uma conta ?</span>

          <Link to='/home/signup' onClick={() => dispatch(HomeActions.animation(true))}>
            Registre-se aqui!
          </Link>
        </Register>
      </Content>
    </Style>
  )
}

export default FormLogin
