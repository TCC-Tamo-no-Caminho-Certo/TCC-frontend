import React, { useRef } from 'react'
import Style, { Content } from './styles'

import { passwordSchema } from 'utils/validations/forgotPassword'

import PadlockIcon from 'assets/Inputs/PadlockIcon'
import Logo from 'assets/Logo'

import { Form, Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'

import { useHistory } from 'react-router'

const ConfirmPassword = () => {
  const history = useHistory()
  const popupRef = useRef<PopupMethods>(null)
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

  const onResetSubmit = (res: any) => {
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
        <Content>
          <Logo />

          <Form
            loading
            captcha
            path='reset-password/*%'
            addToPath={['code']}
            schema={passwordSchema}
            afterResData={onResetSubmit}
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
