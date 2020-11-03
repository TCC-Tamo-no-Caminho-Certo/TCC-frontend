import React, { createContext, useState } from 'react'
import Style from './styles'

import Fields from './Fields'
import ImageChanger from './ImageChanger'

import { RootState, ThemeState, useDispatch, useSelector } from 'store'
import { UserActions } from 'store/user'

import { Button, Form, Input } from 'components/Form'
import Card from 'components/Card'
import Modal from 'components/Modal'

export interface ModalState {
  show: boolean
  setShow: (value: any) => void
}

export const ModalContext = createContext<ModalState | null>(null)
ModalContext.displayName = 'Modal Context'

const EditProfile: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)
  const dispatch = useDispatch()
  const [image, setImage] = useState(false)
  const [confirm, setConfirm] = useState(false)

  let updateData: any

  const changeData = (data: any) => {
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
      <Style theme={theme}>
        <Form path='user/update' changeData={changeData} callback={submitCallback} loading captcha>
          <Fields theme={theme} />

          <button id='discardButton' type='button'>
            Descartar alterações
          </button>

          <button id='saveButton' type='button' onClick={() => setConfirm(true)}>
            Salvar
          </button>
        </Form>
      </Style>

      <Modal show={confirm} onClick={() => setConfirm(false)}>
        <Card headerText='Confirme sua senha'>
          <Input name='password' placeholder='Confirme sua senha' eye />

          <div className='buttons'>
            <button type='button' onClick={() => setConfirm(false)}>
              Cancelar
            </button>

            <Button>Confirmar</Button>
          </div>
        </Card>
      </Modal>

      <Modal show={image} onClick={() => setImage(false)}>
        <ImageChanger />
      </Modal>
    </ModalContext.Provider>
  )
}

export default EditProfile
