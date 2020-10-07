import React from 'react'
import Style, { Content, Register, Google, Permanence } from './styles'

import google from 'assets/google.png'

import loginSchema from 'utils/validations/login'

import { ThemeState } from 'store/Theme'
import { HomeActions } from 'store/Home'
import { useSelector, useDispatch, RootState } from 'store'

import ThemeSwitch from 'components/ThemeSwitch'

import { FiLock } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'
import { useHistory, Link } from 'react-router-dom'
import { Form, Input, Button } from 'components/Form'

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

  return (
    <Style theme={theme}>
      <header>
        <ThemeSwitch />
      </header>

      <Content theme={theme}>
        <Google theme={theme}>
          <img src={google} alt='google' />
          <span>Entrar com o Google</span>
        </Google>

        <Form
          cb={() => history.push('/main')}
          valSchema={loginSchema}
          path='login'
          loaderFB
          captcha
        >
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

          <Link to='/signup' onClick={() => dispatch(HomeActions.animation(true))}>
            Registre-se aqui!
          </Link>
        </Register>
      </Content>
    </Style>
  )
}

export default FormLogin
