export interface Info {
  label: string
  value: string | number
  inputname: string
  dontShow?: boolean
}

type Data = Info[]

interface DataTypes {
  professor: Data
  proponent: Data
  student: Data
  admin: Data
  user: Data
}

export type Types = keyof DataTypes

const formatUpdateUser = (userData: any, type: Types) => {
  const professor: Data = [
    { label: 'Nome:', inputname: 'name', value: userData.name },
    { label: 'Sobrenome:', inputname: 'surname', value: userData.surname },
    { label: 'E-mail:', inputname: 'email', value: userData.email },
    { label: 'Nascimento:', inputname: 'birthday', value: userData.birthday },
    { label: 'Senha:', inputname: 'password', value: 10, dontShow: true },
  ]

  const proponent: Data = []
  const student: Data = []
  const admin: Data = []
  const user: Data = []

  const dataTypes: DataTypes = {
    professor,
    proponent,
    student,
    admin,
    user,
  }

  return dataTypes[type]
}

export default formatUpdateUser
