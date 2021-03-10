import React, { createContext, RefObject, useRef } from 'react'
import Style, { ConfirmForm } from './styles'

import Containers from './Containers'
import ImageChanger from './ImageChanger'

import { UserActions } from 'store/user'

import CloseIcon from 'assets/Inputs/CloseIcon'

import { Form, Submit, Text } from 'components/Form'
import Modal, { ModalMethods } from 'components/Modal'

import { useDispatch } from 'react-redux'

export interface ModalState {
  imageRef: RefObject<ModalMethods>
}

export const ImageRefModalContext = createContext<ModalState | null>(null)

const EditProfile = () => {
  let updateData: any
  const dispatch = useDispatch()
  const confirmRefModal = useRef<ModalMethods>(null)
  const imageRefModal = useRef<ModalMethods>(null)

  const submitCallback = (resData: any) =>
    resData.success && dispatch(UserActions.update(updateData))

  return (
    <ImageRefModalContext.Provider value={{ imageRef: imageRefModal }}>
      <Style>
        <Form loading captcha path='user/update' afterResData={submitCallback}>
          <Containers />

          <div id='submits'>
            <button type='button'>Descartar alterações</button>

            <button
              type='button'
              onClick={() => confirmRefModal.current?.toggleModal(true)}
            >
              Salvar
            </button>
          </div>
        </Form>
      </Style>

      <Modal ref={confirmRefModal}>
        <ConfirmForm path='confirmUpdate'>
          <span>
            Você precisa confirmar sua senha para salvar as alterações!
          </span>

          <CloseIcon
            onClick={() => confirmRefModal.current?.toggleModal(false)}
          />

          <Text name='password' placeholder='Confirme sua senha' eye />

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
