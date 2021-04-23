import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState
} from 'react'
import Style, { ConfirmForm } from './styles'

import Containers from './Containers'

import editProfileSchema from 'utils/validations/editProfile'

import { UserActions } from 'store/AsyncThunks/user'
import { Response } from 'store'

import { Form, Submit, Text } from 'components/Form'
import Modal, { ModalMethods } from 'components/Modal'

import { GlobalContext, GlobalContextProps } from 'App'
import { useDispatch } from 'react-redux'

interface EditProfileContextProps {
  globalChange?: boolean
  setGlobalChange?: Dispatch<SetStateAction<boolean>>
}

export const EditProfileContext = createContext<EditProfileContextProps>({})

const EditProfile = () => {
  const confirmModal = useRef<ModalMethods>(null)
  const { popup } = useContext<GlobalContextProps>(GlobalContext)

  const [globalChange, setGlobalChange] = useState(false)

  const dispatch = useDispatch()

  const afterSubmit = (res: Response<any>) => {
    if (res.success) {
      dispatch(UserActions.update(res.user))
      confirmModal.current?.toggleModal()

      popup?.popupRef?.current?.configPopup({
        type: 'success',
        setModal: true,
        message: 'Dados alterados',
        onClick: () => setGlobalChange(false)
      })
    } else
      switch (res.error) {
        case 'Incorrect password!':
          popup?.popupRef?.current?.configPopup({
            type: 'error',
            message: 'Senha inválida!',
            setModal: true
          })
          break
        default:
          popup?.popupRef?.current?.configPopup({
            type: 'error',
            message: 'Ops, algo deu errado :(',
            setModal: true
          })
      }
  }

  return (
    <Style>
      <Form
        loading
        path='user'
        method='patch'
        schema={editProfileSchema}
        afterResData={afterSubmit}
        onError={(error: any) => {
          if (error.message !== 'Você esqueceu de informar a senha!')
            confirmModal.current?.toggleModal(false)
        }}
      >
        <EditProfileContext.Provider value={{ globalChange, setGlobalChange }}>
          <Containers />
        </EditProfileContext.Provider>

        <div id='submits'>
          <button type='button' onClick={() => setGlobalChange(false)}>
            Descartar alterações
          </button>

          <button
            type='button'
            onClick={() => {
              confirmModal.current?.toggleModal(true)
            }}
          >
            Salvar
          </button>
        </div>

        <Modal ref={confirmModal}>
          <ConfirmForm>
            <span>
              Você precisa digitar sua senha para salvar as alterações!
            </span>

            <Text eye name='password' placeholder='Senha (Atual)' />

            <div id='buttons'>
              <button
                type='button'
                id='cancel'
                onClick={() => confirmModal.current?.toggleModal(false)}
              >
                Cancelar
              </button>

              <Submit>Confirmar</Submit>
            </div>
          </ConfirmForm>
        </Modal>
      </Form>
    </Style>
  )
}

export default EditProfile
