import React, { useState } from 'react'
import Style, { Change, ConfirmModal, InfoChanger, Label, Value } from './styles'

import formatUpdateUser, { Info, Types } from 'utils/formatUpdateUser'

import { ThemeState } from 'store/theme'
import { RootState, useSelector } from 'store'
import { UserState } from 'store/user'

import editPencil from 'assets/editPencil.svg'
import avatar from 'assets/avatar.jpg'

import { Button, Form, Input } from 'components/Form'
import Card from 'components/Card'
import Avatar from 'components/User/Avatar'
import Slider from 'components/Slider'
import Content from 'components/Sidebar/Content'

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
          <Input
            name={info.inputname}
            defaultValue={info.dontShow ? `*********` : info.value}
            noStyle
          />
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
    <Content>
      <Style theme={theme}>
        <Form path=''>
          <Slider width={550} gap={200} gapVertical={100}>
            {containers}
          </Slider>

          {save ? (
            <ConfirmModal>
              <Card headerText='Confirme sua senha'>
                <Button>Confirmar</Button>
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
    </Content>
  )
}

export default EditProfile
