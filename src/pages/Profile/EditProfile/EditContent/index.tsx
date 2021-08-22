import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Buttons, ConfirmForm } from './styles'

import Field, { InputData } from '../Field'

import CloseIcon from 'assets/global/CloseIcon'

import Card from 'components/Card'
import DotsLoader from 'components/DotsLoader'
import Form, { Submit, Text } from 'components/Form'
import Modal, { ModalForwardeds } from 'components/Modal'
import Popup, { PopupForwardeds } from 'components/Popup'

import { RoleType } from 'types/Responses/user/roles'

import { ThemeContext } from 'styled-components'
import { ObjectSchema } from 'yup'

interface EditContentProps {
  path?: string
  role?: RoleType
  loading?: boolean
  headerText: string
  fields: InputData[]
  children?: ReactNode
  schema?: ObjectSchema
  onSaveClick?: () => void
  onSuccess?: (_res: any) => void
  manipulateData?: (_data: any) => any
}

const EditContent = ({
  role,
  path,
  schema,
  fields,
  loading,
  children,
  onSuccess,
  headerText,
  onSaveClick,
  manipulateData
}: EditContentProps) => {
  const theme = useContext(ThemeContext)

  const popupRef = useRef<PopupForwardeds>(null)
  const modalRef = useRef<ModalForwardeds>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [password, setPassword] = useState()
  const [globalEditing, setGlobalEditing] = useState<boolean>()

  const onGetConfirmForm = ({ password }: any) => {
    modalRef?.current?.toggle(false)
    setPassword(password)
  }

  const afterResData = (res: any) => {
    if (res.success)
      popupRef?.current?.configPopup({
        open: true,
        type: 'success',
        message: 'Dados alterados',
        onClick: () => {
          setGlobalEditing(false)
          onSuccess && onSuccess(res)
        }
      })
    else
      switch (res.error) {
        case 'Incorrect password!':
          popupRef?.current?.configPopup({
            open: true,
            type: 'error',
            message: 'Senha inválida!'
          })
          break
        default:
          popupRef?.current?.configPopup({
            open: true,
            type: 'error',
            message: 'Ops, algo deu errado :('
          })
      }
  }

  const defaultManipulateData = (formData: any) => {
    const data = manipulateData ? manipulateData(formData) : formData
    return { ...data, password }
  }

  useEffect(() => {
    if (password) {
      formRef.current?.dispatchEvent(new Event('submit', { cancelable: true }))
      setPassword(undefined)
    }
  }, [password, setPassword])

  return (
    <>
      <Card headerText={headerText} role={role}>
        {children}

        {loading ? (
          <DotsLoader color={theme.colors.primary} />
        ) : (
          <Form
            path={path}
            ref={formRef}
            method='patch'
            schema={schema}
            afterResData={afterResData}
            manipulateData={defaultManipulateData}
          >
            {fields.map(data => (
              <Field
                data={data}
                key={data.name}
                globalEditing={globalEditing}
                setGlobalEditing={setGlobalEditing}
              />
            ))}

            <Submit
              type='button'
              onClick={() => {
                modalRef.current?.toggle()
                onSaveClick && onSaveClick()
              }}
            >
              Salvar alterações
            </Submit>
          </Form>
        )}
      </Card>

      <Modal ref={modalRef}>
        <ConfirmForm getData={onGetConfirmForm}>
          <CloseIcon onClick={() => modalRef.current?.toggle(false)} />

          <span>Você precisa digitar sua senha para salvar as alterações!</span>

          <Text eye name='password' placeholder='Senha (Atual)' />

          <Buttons>
            <button
              id='cancel'
              type='button'
              onClick={() => modalRef?.current?.toggle(false)}
            >
              Cancelar
            </button>

            <Submit>Confirmar</Submit>
          </Buttons>
        </ConfirmForm>
      </Modal>

      <Popup ref={popupRef} />
    </>
  )
}

export default EditContent
