import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import Style from './styles'

import { AddRoleContext } from '../../index'

import Form, { Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import Modal, { ModalMethods } from 'components/Modal'

import * as Yup from 'yup'

export interface University {
  value: string | number
  label: string
  studentRegex: string
  professorRegex: string
}

export interface RegisterEmailMethods {
  toggleRegister: () => void
}

interface RegisterEmailProps {
  onSuccess?: () => void
  universityData?: University
  role: 'professor' | 'student'
}

const RegisterEmail = forwardRef<RegisterEmailMethods, RegisterEmailProps>(
  ({ universityData, role, onSuccess }, ref) => {
    const popupRef = useRef<PopupMethods>(null)
    const modalRef = useRef<ModalMethods>(null)
    const { rolesHeight } = useContext(AddRoleContext)

    const [codeSend, setCodeSend] = useState(false)

    const professorRegex = new RegExp(
      universityData ? universityData.professorRegex : ''
    )

    const studentRegex = new RegExp(
      universityData ? universityData.studentRegex : ''
    )

    const regex = role === 'professor' ? professorRegex : studentRegex

    const emailSchema = Yup.object({
      email: Yup.string()
        .email('O e-mail deve ser válido!')
        .matches(regex, 'E-mail inválido!')
        .required('Você esqueceu de informar o email!')
    })

    const onEmailSubmit = (result: any) => {
      if (result.success) setTimeout(() => setCodeSend(true), 100)
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
          message: 'E-mail confirmado!'
        })

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
        <Modal
          ref={modalRef}
          bgHeight={`calc(${rolesHeight}px + 100vh)`}
          bottom='50vh'
          translateY='50%'
        >
          <Style>
            {codeSend && (
              <>
                <span>{universityData?.label}</span>
                <Form
                  path='user/email'
                  addData={{ university_id: universityData?.value }}
                  afterResData={onEmailSubmit}
                  schema={emailSchema}
                >
                  <Text name='email' placeholder='E-mail institucional' />

                  <Submit>Enviar código de confirmação</Submit>
                </Form>
              </>
            )}

            {!codeSend && (
              <Form
                method='get'
                id='tokenForm'
                path='confirm/email/*%'
                addToPath={['token']}
                afterResData={onTokenSubmit}
              >
                <p>
                  Digite o código de confirmação que foi enviado no seu e-mail.
                </p>

                <Text name='token' placeholder='Código' />

                <Submit>Validar</Submit>
              </Form>
            )}
          </Style>
        </Modal>

        <Popup
          translateY='50%'
          bottom='50vh'
          bgHeight={`calc(${rolesHeight}px + 100vh)`}
          ref={popupRef}
        />
      </>
    )
  }
)

export default RegisterEmail
