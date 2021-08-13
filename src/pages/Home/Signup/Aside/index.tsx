import React, { useContext, useRef, useState } from 'react'
import Style, { Content } from './styles'

import signupSchema from 'utils/validations/signup'

import { HomeActions, HomeState } from 'store/Sync/home'
import { RootState } from 'store'

import WorldIcon from 'assets/Inputs/WorldIcon'
import UserLockedIcon from 'assets/Inputs/UserLockedIcon'

import FullLogo from 'components/FullLogo'
// import ThemeSwitch from 'components/ThemeSwitch'
import { Datepicker, Form, Submit, Text } from 'components/Form'
import BackButton from 'components/BackButton'
import Popup, { PopupForwardeds } from 'components/Popup'

import { Response } from 'types/Responses'

import { GlobalContext } from 'App'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const Aside = () => {
  const home = useSelector<RootState, HomeState>(({ home }) => home)
  const { overflow } = useContext(GlobalContext)

  const popupRef = useRef<PopupForwardeds>(null)

  const [disable, setDisable] = useState(false)

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const history = useHistory()

  const onBackButtonClick = () => {
    setDisable(true)

    overflow?.setOverflow &&
      overflow?.setOverflow({ x: 'hidden', overflow: undefined })

    dispatch(
      HomeActions.update({
        initial: true,
        page: 'login',
        disable: true
      })
    )

    setTimeout(() => {
      dispatch(HomeActions.update({ disable: false }))

      overflow?.setOverflow &&
        overflow?.setOverflow({ x: undefined, overflow: 'auto' })
    }, 1300)
  }

  const onSuccessClose = () => {
    dispatch(HomeActions.update({ initial: true, page: 'login' }))
    history.push('/home')
  }

  const afterSubmit = (response: Response) => {
    console.log(response)

    if (response.success)
      popupRef?.current?.configPopup({
        open: true,
        type: 'success',
        message: t('signup.popup.success'),
        onClick: onSuccessClose
      })
    else
      switch (response.error) {
        case 'User already exists':
          popupRef?.current?.configPopup({
            open: true,
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
            open: true,
            type: 'error',
            message: t('signup.popup.defaultError')
          })
      }
  }

  return (
    <>
      <Style>
        <nav>
          <BackButton
            to='/home'
            onClick={onBackButtonClick}
            disabled={disable || home.disable}
          />

          {/* <ThemeSwitch /> */}
        </nav>

        <Content>
          <header>
            <FullLogo />
          </header>

          <Form
            captcha
            loading
            path='sign-up'
            schema={signupSchema}
            afterResData={afterSubmit}
            manipulateData={data => {
              delete data.confirmPassword
              return data
            }}
          >
            <Text
              name='name'
              className='dual'
              placeholder='Nome'
              autoComplete='given-name'
              data-cy='Signup-name'
              icon={WorldIcon}
            />

            <Text
              name='surname'
              className='dual'
              placeholder='Sobrenome'
              autoComplete='family-name'
              data-cy='Signup-surname'
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
              data-cy='Signup-birthday'
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
              data-cy='Signup-email'
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
              data-cy='Signup-password'
              icon={UserLockedIcon}
            />

            <Text
              eye
              type='password'
              className='dual'
              name='confirmPassword'
              autoComplete='new-password'
              placeholder='Confirmar Senha'
              data-cy='Signup-confirmPassword'
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

            <Submit data-cy='Signup-submit'>Concordar e concluir</Submit>
          </Form>
        </Content>
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default Aside
