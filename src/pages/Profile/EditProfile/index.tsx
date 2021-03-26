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

import { UserActions } from 'store/user'

import { Form, Submit, Text } from 'components/Form'
import Modal, { ModalMethods } from 'components/Modal'

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
  const confirmRefModal = useRef<ModalMethods>(null)
  const imageRefModal = useRef<ModalMethods>(null)

  const submitCallback = (resData: any) => {
    console.log(resData)

    if (resData.success) {
      dispatch(UserActions.update(resData.user))
      confirmRefModal.current?.toggleModal()
    }
  }

  return (
    <ImageRefModalContext.Provider value={{ imageRef: imageRefModal }}>
      <Style>
        <Form
          loading
          method='patch'
          path='user'
          schema={editProfileSchema}
          afterResData={submitCallback}
          getData={e => console.log(e)}
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
              onClick={() => confirmRefModal.current?.toggleModal(true)}
            >
              Salvar
            </button>
          </div>

          <Modal ref={confirmRefModal}>
            <ConfirmForm>
              <span>
                Você precisa confirmar sua senha para salvar as alterações!
              </span>

              <Text eye name='password' placeholder='Confirme sua senha' />

              <div id='buttons'>
                <button
                  type='button'
                  id='cancel'
                  onClick={() => confirmRefModal.current?.toggleModal(false)}
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
          onCloseClick={() => imageRefModal.current?.toggleModal(false)}
        />
      </Modal>
    </ImageRefModalContext.Provider>
  )
}

export default EditProfile

ImageRefModalContext.displayName = 'Modal Context'
