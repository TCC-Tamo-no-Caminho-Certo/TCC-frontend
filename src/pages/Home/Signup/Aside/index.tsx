import React, { useContext, useState } from 'react'
import Style from './styles'

import signupSchema from 'utils/validations/signup'

import { HomeActions } from 'store/Sync/home'
import { Response } from 'store'

import WorldIcon from 'assets/Inputs/WorldIcon'
import UserLockedIcon from 'assets/Inputs/UserLockedIcon'
import Logo from 'assets/FullLogo'

// import ThemeSwitch from 'components/ThemeSwitch'
import { Datepicker, Form, Submit, Text } from 'components/Form'
import BackButton from 'components/BackButton'

import { GlobalContext } from 'App'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

const Aside = () => {
  const { popupRef } = useContext(GlobalContext)

  const [disable, setDisable] = useState(false)

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  const onSuccessClose = () => {
    dispatch(HomeActions.update({ initial: true, page: 'login' }))
    history.push('/home')
  }

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      popupRef?.current?.configPopup({
        setModal: true,
        type: 'success',
        message: t('signup.popup.success'),
        onClick: onSuccessClose
      })
    else
      switch (res.error) {
        case 'User already exists':
          popupRef?.current?.configPopup({
            setModal: true,
            type: 'error',
            message: t('signup.popup.userExists'),
            onClick: () => {
              setDisable(true)
              dispatch(HomeActions.update({ initial: true, page: 'login' }))
              history.push('/home')
            }
          })
          break

        default:
          popupRef?.current?.configPopup({
            setModal: true,
            type: 'error',
            message: t('signup.popup.defaultError')
          })
      }
  }

  return (
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

        {/* <ThemeSwitch /> */}
      </nav>

      <div id='content'>
        <header>
          <Logo />
        </header>

        <Form
          captcha
          loading
          path='register'
          schema={signupSchema}
          afterResData={afterSubmit}
        >
          <Text
            name='name'
            className='dual'
            placeholder='Nome'
            autoComplete='given-name'
            data-cy='input-signup-name'
            icon={WorldIcon}
          />

          <Text
            name='surname'
            className='dual'
            placeholder='Sobrenome'
            autoComplete='family-name'
            data-cy='input-signup-surname'
            icon={WorldIcon}
          />

          <span className='aditionalInfo'>
            Certifique-se de que corresponde ao nome no seu documento de
            identificação oficial
          </span>

          <Datepicker
            isBirthday
            arrow='bottom'
            name='birthday'
            data-cy='input-signup-birthday'
            placeholder='Data de nascimento'
            icon={UserLockedIcon}
          />

          <span className='aditionalInfo'>
            Você precisa ter pelo menos 18 anos
          </span>

          <Text
            name='email'
            placeholder='E-mail'
            autoComplete='email'
            data-cy='input-signup-email'
            icon={UserLockedIcon}
          />

          <span className='aditionalInfo'>
            Enviaremos um e-mail para confirmação
          </span>

          <Text
            eye
            name='password'
            type='password'
            className='dual'
            placeholder='Senha'
            autoComplete='new-password'
            data-cy='input-signup-password'
            icon={UserLockedIcon}
          />

          <Text
            eye
            type='password'
            className='dual'
            name='confirmPassword'
            autoComplete='new-password'
            placeholder='Confirmar Senha'
            data-cy='input-signup-confirmPassword'
            icon={UserLockedIcon}
          />

          {/* <span className='aditionalInfo' id='terms'>
            Ao clicar em Concordar e concluir, concordo com os{' '}
            <a href='.link'>Termos de uso</a>, os{' '}
            <a href='.link'>Termos de Serviço e Pagamentos</a>, a{' '}
            <a href='.link'>Política de Privacidade</a> e a{' '}
            <a href='.link'>Política de Não Discriminação</a>
            do Steams Lab.
          </span> */}

          <Submit data-cy='button-signup-submit'>Concordar e concluir</Submit>
        </Form>
      </div>
    </Style>
  )
}

export default Aside
