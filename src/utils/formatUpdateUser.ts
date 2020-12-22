import { UserState } from 'store/user'

export interface Info {
  label: string
  value: string | number
  inputname: string
  date?: boolean
  dontShow?: boolean
}

interface DataTypes {
  professor: Data
  proponent: Data
  baseUser: Data
  student: Data
  admin: Data
  user: Data
}

type Data = Info[]
export type Types = keyof DataTypes

const formatUpdateUser = (userData: UserState, type: Types): Data => {
  const professor: Data = []
  const proponent: Data = []
  const student: Data = []
  const admin: Data = []

  const baseUser: Data = [
    { label: 'Nome:', inputname: 'name', value: userData.name },
    { label: 'Sobrenome:', inputname: 'surname', value: userData.surname },
    { label: 'E-mail:', inputname: 'email', value: userData.emails[0].email },
    { label: 'Nascimento:', inputname: 'birthday', value: userData.birthday, date: true },
    // { label: 'Senha:', inputname: 'new_password', value: '00000asd', dontShow: true },
  ]

  const user: Data = [...baseUser]

  const dataTypes: DataTypes = {
    professor,
    proponent,
    baseUser,
    student,
    admin,
    user,
  }

  return dataTypes[type]
}

export default formatUpdateUser
