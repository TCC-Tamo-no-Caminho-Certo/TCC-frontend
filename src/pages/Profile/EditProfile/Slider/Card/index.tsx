import React from 'react'
import Style, { Header } from './styles'

import Data, { Info } from './Infos'

import { RootState, useSelector } from 'store'
import { UserState } from 'store/user'

import avatar from 'assets/avatar.jpg'

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
      { label: 'Senha:', inputname: 'password', value: user.password, dontShow: true },
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

      <Data userData={getUserData()} />
    </Style>
  )
}

export default Card
