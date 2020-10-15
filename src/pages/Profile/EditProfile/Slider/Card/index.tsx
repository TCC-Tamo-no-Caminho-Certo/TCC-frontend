import React, { useEffect, useState } from 'react'

import Data, { Info } from './Infos'

import Style, { Header } from './styles'
import avatar from 'assets/avatar.jpg'

type Professor = Info[]
type Proponent = Info[]
type Student = Info[]
type Admin = Info[]

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
  const [data, setData] = useState<Info[]>([
    { label: '', value: '', inputname: '1' },
    { label: '', value: '', inputname: '2' },
    { label: '', value: '', inputname: '3' },
    { label: '', value: '', inputname: '4' },
    { label: '', value: '', inputname: '5' },
  ])

  useEffect(() => {
    const getUserData = async (type: Types) => {
      const user = {
        name: 'test',
        surname: 'asd',
        email: 'teste@gmail.com',
        birthday: '17/11/1999',
        password: 'sadasdasdasd'
      }

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

      setData(dataTypes[type])
    }

    getUserData(type)
  }, [])

  return (
    <Style>
      <Header>{headerText}</Header>

      <img src={avatar} alt='avatar' draggable={false} />

      <Data userData={data} />
    </Style>
  )
}

export default Card
