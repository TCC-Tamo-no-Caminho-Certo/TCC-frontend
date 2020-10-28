import React, { useState } from 'react'
import Style, { Change, ConfirmModal, InfoChanger, Label, Value } from './styles'

import formatUpdateUser, { Info, Types } from 'utils/formatUpdateUser'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'
import { UserState } from 'store/user'

import editPencil from 'assets/editPencil.svg'
import avatar from 'assets/avatar.jpg'

import { Button, Form, Input, InputDate } from 'components/Form'
import Card from 'components/Card'
import Avatar from 'components/User/Avatar'
import Slider from 'components/Slider'

const EditProfile: React.FC = () => {
  const user = useSelector<RootState, UserState>(state => state.user)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const [save, setSave] = useState(false)

  const inputs = (type: Types) => {
    return formatUpdateUser(user, type).map((info: Info) => (
      <InfoChanger key={info.inputname}>
        <Label>
          <label htmlFor={info.inputname}>{info.label}</label>
        </Label>

        <Value>
          {info.inputname === 'birthday' ? (
            <InputDate
              name={info.inputname}
              placeholder={info.dontShow ? `*********` : ''}
              value={info.dontShow ? '' : info.value}
              noStyle
            />
          ) : (
            <Input
              name={info.inputname}
              placeholder={info.dontShow ? `*********` : ''}
              defaultValue={info.dontShow ? '' : info.value}
              noStyle
            />
          )}
        </Value>

        <Change>
          <label htmlFor={info.inputname}>
            <img src={editPencil} alt='edit' />
          </label>
        </Change>
      </InfoChanger>
    ))
  }

  const containers = [
    <Card headerText='Dados Pessoais' key='Personal'>
      <Avatar size={128} src={avatar} />
      {inputs(user.role === 'baseUser' ? 'baseUser' : 'user')}
    </Card>,

    <Card headerText='Dados de Professor' key='Professor'>
      {inputs('professor')}
    </Card>,

    <Card headerText='Dados de Estudante' key='Student'>
      {inputs('student')}
    </Card>,
  ]

  return (
    <Style theme={theme}>
      <Form
        path='user/update'
        changeData={data => {
          const old = data.birthday.split('/')
          data.birthday = old[0] ? `${old[2]}-${old[1]}-${old[0]}` : ''
        }}
        loading
        captcha
      >
        <Slider width={550} gap={200} gapVertical={100}>
          {containers}
        </Slider>

        {save ? (
          <ConfirmModal theme={theme}>
            <Card headerText='Confirme sua senha'>
              <Input name='password' placeholder='Confirme sua senha' eye />
              <div className='buttons'>
                <button type='button' onClick={() => setSave(false)}>
                  Cancelar
                </button>

                <Button>Confirmar</Button>
              </div>
            </Card>
          </ConfirmModal>
        ) : (
          <></>
        )}

        <button id='saveButton' type='button' onClick={() => setSave(true)}>
          Salvar
        </button>
      </Form>
    </Style>
  )
}

export default EditProfile
