import React, { useCallback, useState } from 'react'
import Style, { ConfirmModal } from './styles'

import Fields from './Fields'

import { RootState, ThemeState, useSelector } from 'store'

import { Button, Form, Input } from 'components/Form'
import Card from 'components/Card'

const EditProfile: React.FC = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const [show, setShow] = useState(false)

  const changeData = useCallback((data: any) => {
    const old = data.birthday.split('/')
    data.birthday = old[0] ? `${old[2]}-${old[1]}-${old[0]}` : ''
  }, [])

  return (
    <Style theme={theme}>
      <Form path='user/update' changeData={changeData} loading captcha>
        <Fields theme={theme} />

        <ConfirmModal theme={theme} show={show}>
          <Card headerText='Confirme sua senha'>
            <Input name='password' placeholder='Confirme sua senha' eye />
            <div className='buttons'>
              <button
                type='button'
                onClick={() => {
                  setShow(false)
                }}
              >
                Cancelar
              </button>

              <Button>Confirmar</Button>
            </div>
          </Card>
        </ConfirmModal>

        <button id='discardButton' type='button'>
          Descartar alterações
        </button>

        <button
          id='saveButton'
          type='button'
          onClick={() => {
            setShow(true)
          }}
        >
          Salvar
        </button>
      </Form>
    </Style>
  )
}

export default EditProfile
