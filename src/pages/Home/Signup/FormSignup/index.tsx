import React, { useState } from 'react'
import Style from './styles'

import signupSchema from 'utils/validations/signup'

import { HomeActions } from 'store/home'
import { ThemeState } from 'store/theme'
import { RootState } from 'store'

import WorldIcon from 'assets/Inputs/WorldIcon'
import UserLockedIcon from 'assets/Inputs/UserLockedIcon'

import Logo from 'components/Logo'
import ThemeSwitch from 'components/ThemeSwitch'
import { Datepicker, Form, Submit, Text } from 'components/Form'
import BackButton from 'components/BackButton'

import { useDispatch, useSelector } from 'react-redux'

const FormSignup: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const dispatch = useDispatch()
  const [disable, setDisable] = useState(false)

  return (
    <Style>
      <nav>
        <BackButton
          to='/home'
          disabled={disable}
          onTap={() => {
            setDisable(true)
            dispatch(HomeActions.update({ initial: true }))
            dispatch(HomeActions.update({ page: 'login' }))
          }}
        />

        <ThemeSwitch />
      </nav>

      <Logo />

      <Form
        schema={signupSchema}
        path='register'
        getData={data => {
          if (data.birthday) {
            const old = data.birthday.split('/')
            data.birthday = old[0] ? `${old[2]}-${old[1]}-${old[0]}` : ''
          }
        }}
        loading
        captcha
      >
        <Text
          className='dual'
          name='name'
          placeholder='Nome'
          icon={WorldIcon}
          autoComplete='given-name'
        />

        <Text name='surname' placeholder='Sobrenome' icon={WorldIcon} autoComplete='family-name' />

        <span>
          Certifique-se de que corresponde ao nome no seu documento de identificação oficial
        </span>

        <Datepicker
          isBirthday
          name='birthday'
          placeholder='Data de nascimento'
          arrow='bottom'
          bodyColor={theme.colors.secondary}
          headerColor={theme.colors.tertiary}
          selectedColor={theme.colors.primary}
          icon={UserLockedIcon}
        />

        <span>Você precisa ter pelo menos 18 anos</span>

        <Text name='email' placeholder='E-mail' icon={UserLockedIcon} autoComplete='email' />

        <span>Enviaremos um e-mail para confirmação</span>

        <Text
          className='dual'
          name='password'
          type='password'
          placeholder='Senha'
          autoComplete='new-password'
          icon={UserLockedIcon}
          eye
        />

        <Text
          name='confirmPassword'
          type='password'
          placeholder='Confirmar Senha'
          icon={UserLockedIcon}
          autoComplete='new-password'
        />

        <span>
          Ao clicar em Concordar e concluir, concordo com os <a href='.'>Termos de uso</a>, os{' '}
          <a href='.'>Termos de Serviço e Pagamentos</a>, a <a href='.'>Política de Privacidade</a>{' '}
          e a <a href='.'>Política de Não Discriminação</a> do Steams Lab.
        </span>

        <Submit>Concordar e concluir</Submit>
      </Form>
    </Style>
  )
}

export default FormSignup
