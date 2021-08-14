import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Style from './styles'

import tokenSchema from 'utils/validations/tokenSchema'

import { RootState } from 'store'
import { AsyncUserState } from 'store/Async/user'

import Form, { Submit, Text } from 'components/Form'
import Modal, { ModalForwardeds } from 'components/Modal'
import Popup, { PopupForwardeds } from 'components/Popup'

import { useSelector } from 'react-redux'
import * as Yup from 'yup'

export interface RegisterEmailForwardeds {
  toggleRegister: (_setRegister?: boolean) => void
}

interface RegisterEmailProps {
  addData?: {}
  regex?: string
  title?: string
  placeholder?: string
  onSuccess?: () => void
}

const RegisterEmail = forwardRef<RegisterEmailForwardeds, RegisterEmailProps>(
  ({ title, addData, regex, onSuccess, placeholder }, ref) => {
    const { user } = useSelector<RootState, AsyncUserState>(
      ({ asyncUser }) => asyncUser
    )

    const modalRef = useRef<ModalForwardeds>(null)
    const popupRef = useRef<PopupForwardeds>(null)

    const [codeSend, setCodeSend] = useState(false)

    const regexToMach = new RegExp(regex || '')

    const emailSchema = Yup.object({
      address: Yup.string()
        .email('O e-mail deve ser válido!')
        .matches(regexToMach, 'E-mail inválido!')
        .required('Você esqueceu de informar o email!')
    })

    const afterEmailSubmit = (res: any) => {
      console.log(res)

      if (res.success) setCodeSend(true)
      else
        switch (res.error) {
          case 'Email already in use!':
            popupRef?.current?.configPopup({
              open: true,
              type: 'error',
              message: 'E-mail já cadastrado!'
            })
            break

          default:
            popupRef?.current?.configPopup({
              open: true,
              type: 'error',
              message: 'Código não enviado!'
            })
        }
    }

    const afterTokenSubmit = (res: any) => {
      if (res.success) {
        popupRef?.current?.configPopup({
          open: true,
          type: 'success',
          message: 'E-mail confirmado, termine a solicitação!'
        })

        onSuccess && onSuccess()
        toggleRegister()
      } else
        popupRef?.current?.configPopup({
          open: true,
          type: 'error',
          message: 'Código inválido!'
        })
    }

    const toggleRegister = (open?: boolean) => modalRef.current?.toggle(open)

    useImperativeHandle(ref, () => ({ toggleRegister }))

    return (
      <>
        <Popup ref={popupRef} />

        <Modal ref={modalRef}>
          <Style>
            <Form
              loading
              schema={emailSchema}
              path='api/users/emails'
              afterResData={afterEmailSubmit}
            >
              {!codeSend && (
                <>
                  <span>{title}</span>

                  <Text name='address' placeholder={placeholder} />

                  <Submit>Enviar código de confirmação</Submit>
                </>
              )}
            </Form>

            <Form
              loading
              method='get'
              id='tokenForm'
              addToPath={['token']}
              path='confirm/email/*%'
              schema={tokenSchema}
              afterResData={afterTokenSubmit}
            >
              {codeSend && (
                <>
                  <p>
                    Digite o código de confirmação que foi enviado ao seu
                    e-mail.
                  </p>

                  <Text name='token' placeholder='Código' />

                  <Submit>Validar</Submit>
                </>
              )}
            </Form>
          </Style>
        </Modal>
      </>
    )
  }
)

export default RegisterEmail
