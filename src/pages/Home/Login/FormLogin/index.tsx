import React, { useState } from 'react'
import Style, { ContentForm, LoginFailed, Permanence, Register } from './styles'

import loginSchema from 'utils/validations/login'

import { useDispatch } from 'store'
import { HomeActions } from 'store/home'

import MailIcon from 'assets/Inputs/MailIcon'
import PadlockIcon from 'assets/Inputs/PadlockIcon'
import AlertIcon from 'assets/Inputs/AlertIcon'

import { Button, Input } from 'components/Form'
import Logo from 'components/Logo'
import ThemeSwitch from 'components/ThemeSwitch'

import { AnimatePresence, motion } from 'framer-motion'
import { Link, useHistory } from 'react-router-dom'

export interface LoginData {
  email: string
  password: string
  captcha: string
  remember?: boolean
}

const FormLogin: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [disable, setDisable] = useState(false)

  const [loginFailed, setLoginFailed] = useState('')

  const handleSubmit = (resData: any) => {
    if (resData.success) {
      localStorage.setItem('@SLab_ac_token', resData.access_token)
      history.push('/session/main')
    } else {
      setLoginFailed(
        resData.error === 'Incorrect password!'
          ? 'Senha incorreta, tente novamente'
          : 'E-mail não encontrado'
      )

      setTimeout(() => setLoginFailed(''), 3000)
    }
  }

  const onRegisterClick = () => {
    setDisable(true)
    dispatch(HomeActions.initial(true))
    dispatch(HomeActions.page('signup'))
    history.push('/home/signup')
  }

  return (
    <Style>
      <ThemeSwitch />

      <ContentForm callback={handleSubmit} valSchema={loginSchema} path='login' loading captcha>
        <Logo />

        <motion.div id='fail' animate={{ height: loginFailed !== '' ? 32 : 0 }}>
          <AnimatePresence>
            {loginFailed !== '' && (
              <LoginFailed
                animate={{ x: ['-10%', '0%'], opacity: [0, 1] }}
                exit={{ x: '-10%', opacity: [1, 0] }}
                transition={{ type: 'tween', duration: 0.7 }}
              >
                <AlertIcon /> <div>{loginFailed}</div>
              </LoginFailed>
            )}
          </AnimatePresence>
        </motion.div>

        <Input name='email' placeholder='E-mail' icon={() => <MailIcon />} autoComplete='email' />

        <Input
          name='password'
          type='password'
          placeholder='Senha'
          autoComplete='current-password'
          icon={() => <PadlockIcon />}
          eye
        />

        <Link to='/forgot-password' onClick={() => dispatch(HomeActions.initial(false))}>
          Não consegue fazer login?
        </Link>

        <Button id='login'>Efetuar Login</Button>

        <Permanence>
          <Input type='checkbox' name='remember' />

          <label htmlFor='remember'>Permanecer conectado</label>
        </Permanence>

        <Register>
          Ainda não possui uma conta ?
          <button type='button' onClick={onRegisterClick} disabled={disable}>
            Registre-se aqui!
          </button>
        </Register>
      </ContentForm>
    </Style>
  )
}

export default FormLogin
