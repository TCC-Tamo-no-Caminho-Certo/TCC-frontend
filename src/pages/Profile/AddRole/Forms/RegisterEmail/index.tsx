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
  universityData?: University
  role: 'professor' | 'student'
}

const RegisterEmail = forwardRef<RegisterEmailMethods, RegisterEmailProps>(
  ({ universityData, role }, ref) => {
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
      inst_email: Yup.string()
        .email('O e-mail deve ser válido!')
        .matches(regex, 'E-mail inválido!')
        .required('Você esqueceu de informar o email!')
    })

    const onEmailSubmit = (result: any) => {
      result.success
        ? setTimeout(() => setCodeSend(true), 1)
        : popupRef.current?.configPopup({
            setModal: true,
            type: 'error',
            message: 'Código não enviado!'
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
            <span>{universityData?.label}</span>

            {!codeSend && (
              <Form
                path='user/email'
                addData={{ university_id: universityData?.value }}
                afterResData={onEmailSubmit}
                schema={emailSchema}
              >
                <Text name='inst_email' placeholder='E-mail institucional' />

                <Submit>Enviar código de confirmação</Submit>
              </Form>
            )}
          </Style>
        </Modal>

        <Popup ref={popupRef} />
      </>
    )
  }
)

export default RegisterEmail
