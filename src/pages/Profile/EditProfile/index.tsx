import React, { createContext, useState } from 'react'
import Style, { ConfirmForm } from './styles'

import Fields from './Fields'
import ImageChanger from './ImageChanger'

import { useDispatch } from 'store'
import { UserActions } from 'store/user'

import CloseIcon from 'assets/Inputs/CloseIcon'

import { Button, Form, Input } from 'components/Form'
import Modal from 'components/Modal'

export interface ModalState {
  show: boolean
  setShow: (value: any) => void
}

export const ModalContext = createContext<ModalState | null>(null)
ModalContext.displayName = 'Modal Context'

const EditProfile: React.FC = () => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(false)
  const [confirm, setConfirm] = useState(false)

  let updateData: any

  const handleData = (data: any) => {
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
    <ModalContext.Provider value={{ show: image, setShow: setImage }}>
      <Style>
        <Form path='user/update' handleData={handleData} callback={submitCallback} loading captcha>
          <Fields />

          <button id='discardButton' type='button'>
            Descartar alterações
          </button>

          <button id='saveButton' type='button' onClick={() => setConfirm(true)}>
            Salvar
          </button>
        </Form>
      </Style>

      {confirm && (
        <Modal show={confirm} onClick={() => setConfirm(false)}>
          <ConfirmForm path='confirmUpdate'>
            <span>Você precisa confirmar sua senha para salvar as alterações!</span>
            <CloseIcon onClick={() => setConfirm(false)} />

            <Input name='password' placeholder='Confirme sua senha' eye />

            <div id='buttons'>
              <button type='button' id='cancel' onClick={() => setConfirm(false)}>
                Cancelar
              </button>

              <Button>Confirmar</Button>
            </div>
          </ConfirmForm>
        </Modal>
      )}

      {image && (
        <Modal show={image} onClick={() => setImage(false)}>
          <ImageChanger />
        </Modal>
      )}
    </ModalContext.Provider>
  )
}

export default EditProfile
