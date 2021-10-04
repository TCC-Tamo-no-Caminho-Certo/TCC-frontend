import React, { useRef } from 'react'
import Style from './styles'

import { passwordSchema } from 'utils/validations/forgotPassword'

import PadlockIcon from 'assets/Inputs/PadlockIcon'

import { Form, Submit, Text } from 'components/Form'
import FullLogo from 'components/FullLogo'
import Popup, { PopupForwardeds } from 'components/Popup'

import { useHistory } from 'react-router'

const Content = () => {
  const popupRef = useRef<PopupForwardeds>(null)

  const history = useHistory()

  const path = window.location.pathname.split('/')
  const code = path[2] || localStorage.getItem('@SLab_code')

  if (!code) {
    popupRef?.current?.configPopup({
      open: true,
      type: 'error',
      message: 'Código não fornecido',
      onOkClick: () => history.push('/'),
      onCloseClick: () => history.push('/')
    })

    throw new Error('No code provided')
  }

  const afterResetSubmit = (res: any) => {
    res.success
      ? popupRef?.current?.configPopup({
          open: true,
          type: 'success',
          message: 'Senha alterada!'
        })
      : popupRef?.current?.configPopup({
          open: true,
          type: 'error',
          message: 'Código inválido!'
        })
  }

  return (
    <>
      <Style>
        <FullLogo />

        <Form
          loading
          captcha
          push='home'
          addToPath={['code']}
          schema={passwordSchema}
          path='api/reset-password/*%'
          afterResData={afterResetSubmit}
        >
          <p>Digite sua nova senha</p>

          <Text readOnly hidden name='code' value={code} />

          <Text
            eye
            name='password'
            type='password'
            icon={PadlockIcon}
            placeholder='Senha'
          />

          <p>Confirme sua nova senha</p>

          <Text
            eye
            type='password'
            icon={PadlockIcon}
            name='confirmPassword'
            placeholder='Confirmar senha'
          />

          <Submit>Redefinir</Submit>
        </Form>
      </Style>

      <Popup ref={popupRef} />
    </>
  )
}

export default Content
