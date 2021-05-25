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

import { UserActions } from 'store/Async/user'
import { Response } from 'store'

import { Form, Submit, Text } from 'components/Form'
import Modal, { ModalMethods } from 'components/Modal'

import { GlobalContext } from 'App'
import { useDispatch } from 'react-redux'

interface EditProfileContextProps {
  globalChange?: boolean
  setGlobalChange?: Dispatch<SetStateAction<boolean>>
}

export const EditProfileContext = createContext<EditProfileContextProps>({})

const EditProfile = () => {
  const { popupRef } = useContext(GlobalContext)

  const confirmModal = useRef<ModalMethods>(null)

  const [globalChange, setGlobalChange] = useState(false)

  const dispatch = useDispatch()

  const afterSubmit = (res: Response<any>) => {
    if (res.success) {
      dispatch(UserActions.update(res.user))
      confirmModal.current?.toggle()
      popupRef?.current?.configPopup({
        type: 'success',
        setModal: true,
        message: 'Dados alterados',
        onClick: () => setGlobalChange(false)
      })
    } else
      switch (res.error) {
        case 'Incorrect password!':
          popupRef?.current?.configPopup({
            type: 'error',
            message: 'Senha inválida!',
            setModal: true
          })
          break
        default:
          popupRef?.current?.configPopup({
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
          error.message !== 'Você esqueceu de informar a senha!' &&
            confirmModal.current?.toggle(false)
        }}
      >
        <div id='submits'>
          <button type='button' onClick={() => setGlobalChange(false)}>
            Descartar alterações
          </button>

          <button
            type='button'
            onClick={() => {
              confirmModal.current?.toggle(true)
            }}
          >
            Salvar
          </button>
        </div>

        <EditProfileContext.Provider value={{ globalChange, setGlobalChange }}>
          <Containers />
        </EditProfileContext.Provider>

        <Modal ref={confirmModal}>
          <ConfirmForm>
            <span>
              Você precisa digitar sua senha para salvar as alterações!
            </span>

            <Text eye name='password' placeholder='Senha (Atual)' />

            <div id='buttons'>
              <button
                id='cancel'
                type='button'
                onClick={() => confirmModal.current?.toggle(false)}
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
