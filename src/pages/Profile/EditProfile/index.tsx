import React, {
  createContext,
  Dispatch,
  RefObject,
  SetStateAction,
  useRef,
  useState
} from 'react'
import Style, { ConfirmForm } from './styles'

import Containers from './Containers'
import ImageChanger from './ImageChanger'

import editProfileSchema from 'utils/validations/editProfile'

import { getUser, UserActions } from 'store/user'
import { Response } from 'store'

import { Form, Submit, Text } from 'components/Form'
import Modal, { ModalMethods } from 'components/Modal'
import Popup, { PopupMethods } from 'components/Popup'

import { useDispatch } from 'react-redux'

export interface ModalState {
  imageRef: RefObject<ModalMethods>
}

interface EditProfileContextProps {
  globalChange?: boolean
  setGlobalChange?: Dispatch<SetStateAction<boolean>>
}

export const ImageRefModalContext = createContext<ModalState | null>(null)
export const EditProfileContext = createContext<EditProfileContextProps>({})
const EditProfile = () => {
  const [globalChange, setGlobalChange] = useState(false)
  const dispatch = useDispatch()
  const confirmModal = useRef<ModalMethods>(null)
  const imageRefModal = useRef<ModalMethods>(null)
  const popupRef = useRef<PopupMethods>(null)

  const afterSubmit = (res: Response<any>) => {
    if (res.success) {
      dispatch(UserActions.update(res.user))
      confirmModal.current?.toggleModal()

      popupRef.current?.configPopup({
        type: 'success',
        setModal: true,
        message: 'Dados alterados',
        onClick: () => setGlobalChange(false)
      })
    } else
      switch (res.error) {
        case 'Incorrect password!':
          popupRef.current?.configPopup({
            type: 'error',
            message: 'Senha inválida!',
            setModal: true
          })
          break
        default:
          popupRef.current?.configPopup({
            type: 'error',
            message: 'Ops, algo deu errado :(',
            setModal: true
          })
      }
  }

  return (
    <>
      <ImageRefModalContext.Provider value={{ imageRef: imageRefModal }}>
        <Style>
          <Form
            loading
            method='patch'
            path='user'
            schema={editProfileSchema}
            getData={e => console.log(e)}
            afterResData={afterSubmit}
            onError={(error: any) => {
              if (error.message !== 'Você esqueceu de informar a senha!')
                confirmModal.current?.toggleModal(false)
            }}
          >
            <EditProfileContext.Provider
              value={{ globalChange, setGlobalChange }}
            >
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

        <Modal ref={imageRefModal}>
          <ImageChanger
            onCloseClick={() => {
              imageRefModal.current?.toggleModal(false)
              dispatch(getUser())
            }}
          />
        </Modal>
      </ImageRefModalContext.Provider>

      <Popup ref={popupRef} />
    </>
  )
}

export default EditProfile

ImageRefModalContext.displayName = 'Modal Context'
