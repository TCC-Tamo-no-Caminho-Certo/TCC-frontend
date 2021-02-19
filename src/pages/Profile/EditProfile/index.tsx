import React, { createContext, RefObject, useRef } from 'react'
import Style, { ConfirmForm } from './styles'

import Fields from './Fields'
import ImageChanger from './ImageChanger'

import { UserActions } from 'store/user'

import CloseIcon from 'assets/Inputs/CloseIcon'

import { Form, Submit, Text } from 'components/Form'
import Modal, { ModalMethods } from 'components/Modal'

import { useDispatch } from 'react-redux'

export interface ModalState {
  ref: RefObject<ModalMethods>
}

export const ModalContext = createContext<ModalState | null>(null)
ModalContext.displayName = 'Modal Context'

const EditProfile = () => {
  const confirmRefModal = useRef<ModalMethods>(null)
  const imageRefModal = useRef<ModalMethods>(null)
  const dispatch = useDispatch()

  let updateData: any

  const getFormData = (data: any) => {
    if (data.birthday) {
      const old = data.birthday.split('/')
      data.birthday = old[0] ? `${old[2]}-${old[1]}-${old[0]}` : ''
    }

    updateData = data
  }

  const submitCallback = (resData: any) => {
    if (resData.success) dispatch(UserActions.updateUserInfo(updateData))
  }

  return (
    <ModalContext.Provider value={{ ref: imageRefModal }}>
      <Style>
        <Form
          path='user/update'
          getData={getFormData}
          afterResData={submitCallback}
          loading
          captcha
        >
          <Fields />

          <button id='discardButton' type='button'>
            Descartar alterações
          </button>

          <button
            id='saveButton'
            type='button'
            onClick={() => confirmRefModal.current?.toggleModal(true)}
          >
            Salvar
          </button>
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
        <ImageChanger />
      </Modal>
    </ModalContext.Provider>
  )
}

export default EditProfile
