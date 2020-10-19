import React from 'react'
import Style from './styles'

import signupSchema from 'utils/validations/signup'

import { ThemeState } from 'store/theme'
import { HomeActions } from 'store/home'
import { useDispatch, useSelector, RootState } from 'store'

import Logo from 'components/Logo'
import ThemeSwitch from 'components/ThemeSwitch'
import { Form, Input, InputDate, Button } from 'components/Form'

import { Link } from 'react-router-dom'
import { MdPublic } from 'react-icons/md'
import { FaUserLock } from 'react-icons/fa'
import { RiArrowLeftSLine } from 'react-icons/ri'


export interface RegisterData {
  name: string
  surname: string
  email: string
  birthday: string
  password: string
  captcha: string
}

const FormSignup: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const dispatch = useDispatch()

  return (
    <Style theme={theme}>
      <nav>
        <button type='button'>
          <RiArrowLeftSLine />

          <Link to='/' onClick={() => dispatch(HomeActions.animation(true))}>
            Voltar
          </Link>
        </button>

        <ThemeSwitch />
      </nav>

      <Logo />

      <Form
        valSchema={signupSchema}
        path='register'
        changeData={data => {
          const old = data.birthday.split('/')
          data.birthday = `${old[2]}-${old[1]}-${old[0]}`
        }}
        loaderFB
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

        <InputDate name='birthday' icon={FaUserLock} />

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
