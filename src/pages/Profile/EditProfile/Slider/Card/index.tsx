import React from 'react'
import Style, { Change, Content, Header, Label, Value } from './styles'

import { RootState, useSelector } from 'store'
import { UserState } from 'store/user'

import avatar from 'assets/avatar.jpg'
import editPencil from 'assets/editPencil.svg'

import { Button, Form, Input } from 'components/Form'

export interface Info {
  label: string
  value: string | number
  inputname: string
  dontShow?: boolean
}

type Professor = Info[]
type Proponent = Info[]
type Student = Info[]
type Admin = Info[]
type User = Info[]

interface DataTypes {
  professor: Professor
  // proponent: Proponent
  // student: Student
  // admin: Admin
}

type Types = keyof DataTypes

interface Props {
  type: Types
  headerText: string
}

const Card: React.FC<Props> = ({ headerText, type }) => {
  const user = useSelector<RootState, UserState>(state => state.user)

  const getUserData = () => {
    const professor: Professor = [
      { label: 'Nome:', inputname: 'name', value: user.name },
      { label: 'Sobrenome:', inputname: 'surname', value: user.surname },
      { label: 'E-mail:', inputname: 'email', value: user.email },
      { label: 'Nascimento:', inputname: 'birthday', value: user.birthday },
      { label: 'Senha:', inputname: 'password', value: 10, dontShow: true },
    ]

    const dataTypes: DataTypes = {
      professor,
      // proponent,
      // student,
      // admin
    }

    return dataTypes[type]
  }

  return (
    <Style>
      <Header>{headerText}</Header>

      <img src={avatar} alt='avatar' draggable={false} />

      <Form path=''>
        {getUserData().map((info: Info) => (
          <Content key={info.inputname}>
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
          </Content>
        ))}

        <button type='submit'>Salvar</button>
      </Form>
    </Style>
  )
}

export default Card
