import React from 'react'
import Style from './styles'

import signupSchema from 'utils/validations/signup'

import { useSelector, RootState, ThemeState } from 'store'

import ThemeSwitch from 'components/ThemeSwitch'

import { Form, Input, Button } from 'components/Form'
import { MdPublic } from 'react-icons/md'
import { FaUserLock } from 'react-icons/fa'
import { RiArrowLeftSLine } from 'react-icons/ri'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { Link } from 'react-router-dom'

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

  const onSignupSubmit = (resData: any) => {
      // const old = data.birthday.split('/')
      // const birthday = `${old[2]}-${old[1]}-${old[0]}`

      // ADD BIRTHDAY
  }

  return (
    <Style theme={theme}>
      <nav>
        <button type='button'>
          <RiArrowLeftSLine />

          <Link to='/'>Voltar</Link>
        </button>

        <ThemeSwitch />
      </nav>

      <Form valSchema={signupSchema} path='register' loaderFB captcha>
        <Input
          className='dual'
          name='name'
          placeholder='Nome'
          icon={MdPublic}
          autoComplete='given-name'
        />

        <Input
          name='surname'
          placeholder='Sobrenome'
          icon={MdPublic}
          autoComplete='family-name'
        />

        <span>
          Certifique-se de que corresponde ao nome no seu documento de identificação oficial
        </span>

        {/* <InputDate name='birthday' icon={FaUserLock} /> */}

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
          <a href='.'>Termos de Serviço e Pagamentos</a>, a{' '}
          <a href='.'>Política de Privacidade</a> e a{' '}
          <a href='.'>Política de Não Discriminação</a> do Steams Lab.
        </span>

        <Button>Concordar e concluir</Button>
      </Form>
    </Style>
  )
}

export default FormSignup
