import React from 'react'
import Style from './styles'

import signupSchema from 'utils/validations/signup'

import { ThemeState } from 'store/theme'
import { HomeActions } from 'store/home'
import { RootState, useDispatch, useSelector } from 'store'

import Logo from 'components/Logo'
import ThemeSwitch from 'components/ThemeSwitch'
import { Button, Form, Input, InputDate } from 'components/Form'
import BackButton from 'components/BackButton'

import { FaUserLock } from 'react-icons/fa'
import { MdPublic } from 'react-icons/md'

const FormSignup: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const dispatch = useDispatch()

  return (
    <Style theme={theme}>
      <nav>
        <BackButton
          to='/home'
          onClick={() => {
            dispatch(HomeActions.initial(true))
            dispatch(HomeActions.page('login'))
          }}
        />

        <ThemeSwitch />
      </nav>

      <Logo />

      <Form
        valSchema={signupSchema}
        path='register'
        changeData={data => {
          const old = data.birthday.split('/')
          data.birthday = old[0] ? `${old[2]}-${old[1]}-${old[0]}` : ''
        }}
        loading
        captcha
      >
        <Input
          className='dual'
          name='name'
          placeholder='Nome'
          icon={MdPublic}
          autoComplete='given-name'
        />

        <Input name='surname' placeholder='Sobrenome' icon={MdPublic} autoComplete='family-name' />

        <span>
          Certifique-se de que corresponde ao nome no seu documento de identificação oficial
        </span>

        <InputDate name='birthday' placeholder='Data de nascimento' icon={FaUserLock} />

        <span>Você precisa ter pelo menos 18 anos</span>

        <Input name='email' placeholder='E-mail' icon={FaUserLock} autoComplete='email' />

        <span>Enviaremos um e-mail para confirmação</span>

        <Input
          className='dual'
          name='password'
          type='password'
          placeholder='Senha'
          autoComplete='new-password'
          icon={FaUserLock}
          eye
        />

        <Input
          name='confirmPassword'
          type='password'
          placeholder='Confirmar Senha'
          icon={FaUserLock}
          autoComplete='new-password'
        />

        <span>
          Ao clicar em Concordar e concluir, concordo com os <a href='.'>Termos de uso</a>, os{' '}
          <a href='.'>Termos de Serviço e Pagamentos</a>, a <a href='.'>Política de Privacidade</a>{' '}
          e a <a href='.'>Política de Não Discriminação</a> do Steams Lab.
        </span>

        <Button>Concordar e concluir</Button>
      </Form>
    </Style>
  )
}

export default FormSignup
