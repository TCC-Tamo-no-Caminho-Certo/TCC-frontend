import React, { useRef, useState } from 'react'
import Style from './styles'

import signupSchema from 'utils/validations/signup'

import { HomeActions } from 'store/home'

import WorldIcon from 'assets/Inputs/WorldIcon'
import UserLockedIcon from 'assets/Inputs/UserLockedIcon'
import Logo from 'assets/Logo'

import ThemeSwitch from 'components/ThemeSwitch'
import { Datepicker, Form, Submit, Text } from 'components/Form'
import BackButton from 'components/BackButton'
import Popup, { PopupMethods } from 'components/Popup'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

const FormSignup = () => {
  const popupRef = useRef<PopupMethods>(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const [disable, setDisable] = useState(false)

  const onSuccessClose = () => {
    dispatch(HomeActions.update({ initial: false, page: 'login' }))
    history.push('/')
  }

  const afterFormResData = (res: any) => {
    if (res.success)
      popupRef.current?.configPopup({
        setModal: true,
        type: 'success',
        message: 'Cadastrado com sucesso! Confirme seu e-mail para fazer login',
        onClick: onSuccessClose
      })
    else if (res.error === 'User already exists')
      popupRef.current?.configPopup({
        setModal: true,
        type: 'error',
        message: 'Usuário ja cadastrado, tente fazer login!'
      })
    else
      popupRef.current?.configPopup({
        setModal: true,
        type: 'error',
        message: 'Erro ao cadastrar, tente novamente.'
      })
  }

  return (
    <>
      <Style>
        <nav>
          <BackButton
            to='/home'
            disabled={disable}
            onTap={() => {
              setDisable(true)
              dispatch(HomeActions.update({ initial: true, page: 'login' }))
            }}
          />

          <ThemeSwitch />
        </nav>

        <Logo />

        <Form
          captcha
          loading
          path='register'
          schema={signupSchema}
          afterResData={afterFormResData}
          getData={e => console.log(e)}
        >
          <Text
            name='name'
            className='dual'
            placeholder='Nome'
            autoComplete='given-name'
            icon={WorldIcon}
          />

          <Text
            name='surname'
            className='dual'
            placeholder='Sobrenome'
            autoComplete='family-name'
            icon={WorldIcon}
          />

          <span>
            Certifique-se de que corresponde ao nome no seu documento de
            identificação oficial
          </span>

          <Datepicker
            isBirthday
            name='birthday'
            placeholder='Data de nascimento'
            icon={UserLockedIcon}
          />

          <span>Você precisa ter pelo menos 18 anos</span>

          <Text
            name='email'
            placeholder='E-mail'
            autoComplete='email'
            icon={UserLockedIcon}
          />

          <span>Enviaremos um e-mail para confirmação</span>

          <Text
            eye
            name='password'
            type='password'
            className='dual'
            placeholder='Senha'
            autoComplete='new-password'
            icon={UserLockedIcon}
          />

          <Text
            type='password'
            className='dual'
            name='confirmPassword'
            placeholder='Confirmar Senha'
            autoComplete='new-password'
            icon={UserLockedIcon}
          />

          <span id='terms'>
            {/* Ao clicar em Concordar e concluir, concordo com os{' '}
             <a href='.link'>Termos de uso</a>, os{' '}
            <a href='.link'>Termos de Serviço e Pagamentos</a>, a{' '}
            <a href='.link'>Política de Privacidade</a> e a{' '}
            <a href='.link'>Política de Não Discriminação</a>
             do Steams Lab. */}
          </span>

          <Submit>Concordar e concluir</Submit>
        </Form>

        <Popup ref={popupRef} bgHeight='300vh' top='50vh' />
      </Style>
    </>
  )
}

export default FormSignup
