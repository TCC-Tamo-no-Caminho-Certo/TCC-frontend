import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import Style from './styles'

import tokenSchema from 'utils/validations/tokenSchema'

import api from 'services/api'

import { RootState } from 'store'
import { EmailsState, getEmails } from 'store/Async/emails'
import { UserState } from 'store/Async/user'

import CloseIcon from 'assets/global/CloseIcon'

import Form, { Submit, Text } from 'components/Form'
import Modal, { ModalForwardeds } from 'components/Modal'
import Popup, { PopupForwardeds } from 'components/Popup'

import { useDispatch, useSelector } from 'react-redux'
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
    const { user } = useSelector<RootState, UserState>(({ user }) => user)
    const { emails } = useSelector<RootState, EmailsState>(
      ({ emails }) => emails
    )

    const modalRef = useRef<ModalForwardeds>(null)
    const popupRef = useRef<PopupForwardeds>(null)

    const [codeSend, setCodeSend] = useState(false)

    const dispatch = useDispatch()

    const regexToMach = new RegExp(regex || '')

    const emailSchema = Yup.object({
      address: Yup.string()
        .email('O e-mail deve ser válido!')
        .matches(regexToMach, 'E-mail inválido!')
        .required('Você esqueceu de informar o email!')
    })

    const afterEmailSubmit = (res: any) => {
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

    const removeAndUpdateEmails = async () => {
      const beforeEmail = emails?.find(({ main }) => main === 1)

      beforeEmail?.id &&
        (await api.delete(`api/users/emails/${beforeEmail?.id}`))

      user?.id && dispatch(getEmails({ userId: user.id, updated: true }))
    }

    const afterTokenSubmit = (res: any) => {
      if (res.success) {
        popupRef?.current?.configPopup({
          open: true,
          type: 'success',
          message: 'E-mail confirmado!'
        })

        if (addData) removeAndUpdateEmails()

        onSuccess && onSuccess()
        toggleRegister()
      } else
        popupRef?.current?.configPopup({
          open: true,
          type: 'error',
          message: 'Código inválido!'
        })
    }

    const onCloseModalCick = () => {
      modalRef.current?.toggle()
      setCodeSend(false)
    }

    const toggleRegister = (open?: boolean) => modalRef.current?.toggle(open)

    useImperativeHandle(ref, () => ({ toggleRegister }))

    return (
      <>
        <Popup ref={popupRef} />

        <Modal ref={modalRef}>
          <Style>
            <CloseIcon onClick={onCloseModalCick} />

            {!codeSend && (
              <Form
                loading
                addData={addData}
                schema={emailSchema}
                path='api/users/emails'
                afterResData={afterEmailSubmit}
              >
                <span>{title}</span>

                <Text name='address' placeholder={placeholder} />

                <Submit>Enviar código de confirmação</Submit>
              </Form>
            )}

            {codeSend && (
              <Form
                loading
                method='get'
                id='tokenForm'
                schema={tokenSchema}
                addToPath={['token']}
                path='confirm/email/*%'
                afterResData={afterTokenSubmit}
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
      </>
    )
  }
)

export default RegisterEmail
