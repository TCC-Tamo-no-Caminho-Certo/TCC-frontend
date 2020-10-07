import React, { useRef } from 'react'
import Style, { Content, Register, Google, Permanence } from './styles'

import google from 'assets/google.png'

import loginSchema from 'utils/validations/login'

import { useSelector, RootState, ThemeState } from 'store'

import Checkbox from 'components/Forms/Checkbox'
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
  const loginRef = useRef(null)

  const history = useHistory()

  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  return (
    <Style theme={theme} ref={loginRef}>
      <header>
        <ThemeSwitch />
      </header>

      <Content theme={theme}>
        <Google theme={theme}>
          <img src={google} alt='google' />
          <span>Entrar com o Google</span>
        </Google>

        <Form cb={(resData: any) => history.push('/main')} valSchema={loginSchema} path='login' loaderFB captcha>
          <Input
            name='email'
            placeholder='E-mail'
            icon={AiOutlineMail}
            autoComplete='email'
          />

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
            <Input type='checkbox' name='rememberTwo' />
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
  )
}

export default FormLogin
