import React, { useRef } from 'react'
import Style, { Content } from './styles'

import { passwordSchema } from 'utils/validations/forgotPassword'

import { HomeActions } from 'store/home'
import { Response } from 'store'

import PadlockIcon from 'assets/Inputs/PadlockIcon'
import Logo from 'assets/Logo'

import { Form, Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import BackButton from 'components/BackButton'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

const ConfirmPassword = () => {
  const popupRef = useRef<PopupMethods>(null)

  const dispatch = useDispatch()
  const history = useHistory()

  const path = window.location.pathname.split('/')
  const code = path[2] || localStorage.getItem('@SLab_code')

  if (!code) {
    popupRef.current?.configPopup({
      setModal: true,
      type: 'error',
      message: 'Código não fornecido',
      onOkClick: () => history.push('/'),
      onCloseClick: () => history.push('/')
    })

    throw new Error('No code provided')
  }

  const afterResetSubmit = (res: Response<any>) => {
    res.success
      ? popupRef.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Senha alterada!',
          onOkClick: () => history.push('/'),
          onCloseClick: () => history.push('/')
        })
      : popupRef.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Código inválido!',
          onCloseClick: () => history.push('/'),
          onOkClick: () => history.push('/')
        })
  }

  return (
    <>
      <Style>
        <BackButton
          to='/home'
          onTap={() => {
            dispatch(
              HomeActions.update({
                initial: false,
                page: 'login'
              })
            )
          }}
        />

        <Content>
          <Logo />

          <Form
            loading
            captcha
            path='reset-password/*%'
            addToPath={['code']}
            schema={passwordSchema}
            afterResData={afterResetSubmit}
          >
            <p>Digite sua nova senha</p>

            <Text readOnly hidden name='code' value={code} />

            <Text
              eye
              name='password'
              type='password'
              placeholder='Senha'
              icon={PadlockIcon}
            />

            <p>Confirme sua nova senha</p>

            <Text
              eye
              type='password'
              name='confirmPassword'
              placeholder='Confirmar senha'
              icon={PadlockIcon}
            />

            <Submit>Redefinir</Submit>
          </Form>
        </Content>
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default ConfirmPassword
