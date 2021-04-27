import React from 'react'
import Style, { Content } from './styles'

import { passwordSchema } from 'utils/validations/forgotPassword'

import { HomeActions } from 'store/Sync/home'
import { Response, RootState } from 'store'
import { PopupState } from 'store/Sync/popup'

import PadlockIcon from 'assets/Inputs/PadlockIcon'
import Logo from 'assets/FullLogo'

import { Form, Submit, Text } from 'components/Form'
import BackButton from 'components/BackButton'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const ConfirmPassword = () => {
  const { popupRef } = useSelector<RootState, PopupState>(({ popup }) => popup)

  const dispatch = useDispatch()
  const history = useHistory()

  const path = window.location.pathname.split('/')
  const code = path[2] || localStorage.getItem('@SLab_code')

  if (!code) {
    popupRef?.current?.configPopup({
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
      ? popupRef?.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Senha alterada!',
          onOkClick: () => history.push('/'),
          onCloseClick: () => history.push('/')
        })
      : popupRef?.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Código inválido!',
          onCloseClick: () => history.push('/'),
          onOkClick: () => history.push('/')
        })
  }

  return (
    <Style>
      <BackButton
        to='/home'
        onTap={() =>
          dispatch(
            HomeActions.update({
              initial: false,
              page: 'login'
            })
          )
        }
      />

      <Content>
        <Logo />

        <Form
          loading
          captcha
          path='reset-password/*%'
          schema={passwordSchema}
          afterResData={afterResetSubmit}
          addToPath={['code']}
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
  )
}

export default ConfirmPassword
