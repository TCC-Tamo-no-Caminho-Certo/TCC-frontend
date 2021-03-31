import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Style from './styles'

import tokenSchema from 'utils/validations/tokenSchema'

import Form, { Submit, Text } from 'components/Form'
import Popup, { PopupMethods, PopupProps } from 'components/Popup'
import Modal, { ModalMethods } from 'components/Modal'

import * as Yup from 'yup'

export interface RegisterEmailMethods {
  toggleRegister: () => void
}

interface RegisterEmailProps {
  addData?: {}
  regex?: string
  title?: string
  onSuccess?: () => void
  placeholder?: string
  modal: PopupProps
}

const RegisterEmail = forwardRef<RegisterEmailMethods, RegisterEmailProps>(
  ({ title, addData, regex, onSuccess, placeholder, modal }, ref) => {
    const popupRef = useRef<PopupMethods>(null)
    const modalRef = useRef<ModalMethods>(null)
    const [codeSend, setCodeSend] = useState(false)
    const regexToMach = new RegExp(regex || '')

    const emailSchema = Yup.object({
      email: Yup.string()
        .email('O e-mail deve ser válido!')
        .matches(regexToMach, 'E-mail inválido!')
        .required('Você esqueceu de informar o email!')
    })

    const onEmailSubmit = (result: any) => {
      if (result.success) setCodeSend(true)
      else if (result.error === 'Email already in use!')
        popupRef.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'E-mail já cadastrado!'
        })
      else
        popupRef.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Código não enviado!'
        })
    }

    const onTokenSubmit = (result: any) => {
      if (result.success) {
        popupRef.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'E-mail confirmado, termine a solicitação!'
        })

        toggleRegister()
        onSuccess && onSuccess()
      } else
        popupRef.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Código inválido!'
        })
    }

    const toggleRegister = () => modalRef.current?.toggleModal()

    useImperativeHandle(ref, () => ({ toggleRegister }))

    return (
      <>
        <Modal ref={modalRef} {...modal}>
          <Style>
            {!codeSend && (
              <>
                <span>{title}</span>

                <Form
                  loading
                  path='user/email'
                  addData={addData}
                  schema={emailSchema}
                  afterResData={onEmailSubmit}
                >
                  <Text name='email' placeholder={placeholder} />

                  <Submit>Enviar código de confirmação</Submit>
                </Form>
              </>
            )}

            {codeSend && (
              <Form
                loading
                method='get'
                id='tokenForm'
                path='confirm/email/*%'
                addToPath={['token']}
                schema={tokenSchema}
                afterResData={onTokenSubmit}
              >
                <p>
                  Digite o código de confirmação que foi enviado ao seu e-mail.
                </p>

                <Text name='token' placeholder='Código' />

                <Submit>Validar</Submit>
              </Form>
            )}
          </Style>
        </Modal>

        <Popup {...modal} ref={popupRef} />
      </>
    )
  }
)

export default RegisterEmail
