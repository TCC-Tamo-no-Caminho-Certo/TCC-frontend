import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style from './styles'

import tokenSchema from 'utils/validations/tokenSchema'

import { Response } from 'store'

import Form, { Submit, Text } from 'components/Form'
import { PopupProps } from 'components/Popup'
import Modal, { ModalMethods } from 'components/Modal'

import { GlobalContext } from 'App'
import * as Yup from 'yup'

export interface RegisterEmailMethods {
  toggleRegister: (_setRegister?: boolean) => void
}

interface RegisterEmailProps {
  modal: PopupProps
  addData?: {}
  regex?: string
  title?: string
  placeholder?: string
  onSuccess?: () => void
}

const RegisterEmail = forwardRef<RegisterEmailMethods, RegisterEmailProps>(
  ({ title, addData, regex, onSuccess, placeholder, modal }, ref) => {
    const { popup } = useContext(GlobalContext)

    const modalRef = useRef<ModalMethods>(null)

    const [codeSend, setCodeSend] = useState(false)

    const regexToMach = new RegExp(regex || '')

    const emailSchema = Yup.object({
      email: Yup.string()
        .email('O e-mail deve ser válido!')
        .matches(regexToMach, 'E-mail inválido!')
        .required('Você esqueceu de informar o email!')
    })

    const afterEmailSubmit = (res: Response<any>) => {
      if (res.success) setCodeSend(true)
      else
        switch (res.error) {
          case 'Email already in use!':
            popup?.popupRef?.current?.configPopup({
              setModal: true,
              type: 'error',
              message: 'E-mail já cadastrado!'
            })
            break

          default:
            popup?.popupRef?.current?.configPopup({
              setModal: true,
              type: 'error',
              message: 'Código não enviado!'
            })
        }
    }

    const afterTokenSubmit = (res: Response<any>) => {
      if (res.success) {
        popup?.popupRef?.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'E-mail confirmado, termine a solicitação!'
        })

        onSuccess && onSuccess()
        toggleRegister()
      } else
        popup?.popupRef?.current?.configPopup({
          setModal: true,
          type: 'error',
          message: 'Código inválido!'
        })
    }

    const toggleRegister = (open?: boolean) =>
      modalRef.current?.toggleModal(open)

    useImperativeHandle(ref, () => ({ toggleRegister }))

    return (
      <Modal ref={modalRef} {...modal}>
        <Style>
          <Form
            loading
            path='user/email'
            addData={addData}
            schema={emailSchema}
            afterResData={afterEmailSubmit}
          >
            {!codeSend && (
              <>
                <span>{title}</span>

                <Text name='email' placeholder={placeholder} />

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
                  Digite o código de confirmação que foi enviado ao seu e-mail.
                </p>

                <Text name='token' placeholder='Código' />

                <Submit>Validar</Submit>
              </>
            )}
          </Form>
        </Style>
      </Modal>
    )
  }
)

export default RegisterEmail
