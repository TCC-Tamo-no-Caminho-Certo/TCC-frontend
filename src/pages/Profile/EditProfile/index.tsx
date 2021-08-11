import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useRef,
  useState
} from 'react'
import Style, { ConfirmForm } from './styles'

import Containers from './Containers'

import editProfileSchema from 'utils/validations/editProfile'

import { AsyncUserActions, AsyncUserState } from 'store/Async/user'
import { RootState } from 'store'

import { Form, Submit, Text } from 'components/Form'
import Modal, { ModalForwardeds } from 'components/Modal'
import Popup, { PopupForwardeds } from 'components/Popup'

import { useDispatch, useSelector } from 'react-redux'

interface EditProfileContextProps {
  globalChange?: boolean
  setGlobalChange?: Dispatch<SetStateAction<boolean>>
}

export const EditProfileContext = createContext<EditProfileContextProps>({})

const EditProfile = () => {
  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

  const modalRef = useRef<ModalForwardeds>(null)
  const popupRef = useRef<PopupForwardeds>(null)

  const [globalChange, setGlobalChange] = useState(false)

  const dispatch = useDispatch()

  const afterSubmit = (res: any) => {
    if (res.success) {
      dispatch(AsyncUserActions.update({ user: { ...user, ...res.user } }))

      modalRef?.current?.toggle()

      popupRef?.current?.configPopup({
        type: 'success',
        open: true,
        message: 'Dados alterados',
        onClick: () => setGlobalChange(false)
      })
    } else
      switch (res.error) {
        case 'Incorrect password!':
          popupRef?.current?.configPopup({
            type: 'error',
            message: 'Senha inválida!',
            open: true
          })
          break
        default:
          popupRef?.current?.configPopup({
            type: 'error',
            message: 'Ops, algo deu errado :(',
            open: true
          })
      }
  }

  return (
    <>
      <Style>
        <Form
          loading
          path='user'
          method='patch'
          schema={editProfileSchema}
          afterResData={afterSubmit}
          onError={(error: any) => {
            error.message !== 'Você esqueceu de informar a senha!' &&
              modalRef?.current?.toggle(false)
          }}
        >
          <div id='submits'>
            <button type='button' onClick={() => setGlobalChange(false)}>
              Descartar alterações
            </button>

            <button
              type='button'
              onClick={() => {
                modalRef?.current?.toggle(true)
              }}
            >
              Salvar
            </button>
          </div>

          <EditProfileContext.Provider
            value={{ globalChange, setGlobalChange }}
          >
            <Containers />
          </EditProfileContext.Provider>
        </Form>
      </Style>

      <Modal ref={modalRef}>
        <ConfirmForm>
          <span>Você precisa digitar sua senha para salvar as alterações!</span>

          <Text eye name='password' placeholder='Senha (Atual)' />

          <div id='buttons'>
            <button
              id='cancel'
              type='button'
              onClick={() => modalRef?.current?.toggle(false)}
            >
              Cancelar
            </button>

            <Submit>Confirmar</Submit>
          </div>
        </ConfirmForm>
      </Modal>

      <Popup ref={popupRef} />
    </>
  )
}

export default EditProfile
