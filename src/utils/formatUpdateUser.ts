import { UserState } from 'store/user'

export interface InputData {
  label: string
  value: string | number
  inputname: string
  date?: boolean
  dontShow?: boolean
}

interface DataTypes {
  professor: InputData[]
  guest: InputData[]
  student: InputData[]
  admin: InputData[]
  aris: InputData[]
  evaluator: InputData[]
  customer: InputData[]
  moderator: InputData[]
}

const formatUpdateUser = (
  userData: UserState,
  role: keyof DataTypes
): InputData[] => {
  const professor: InputData[] = []
  const student: InputData[] = []
  const admin: InputData[] = []
  const aris: InputData[] = []
  const evaluator: InputData[] = []
  const customer: InputData[] = []
  const moderator: InputData[] = []

  const guest: InputData[] = [
    {
      label: 'Nome:',
      inputname: 'name',
      value: userData.name
    },
    {
      label: 'Sobrenome:',
      inputname: 'surname',
      value: userData.surname
    },
    {
      label: 'E-mail:',
      inputname: 'email',
      value: userData.emails[0].email
    },
    {
      label: 'Nascimento:',
      inputname: 'birthday',
      value: userData.birthday,
      date: true
    }
    // { label: 'Senha:', inputname: 'new_password', value: '00000asd', dontShow: true },
  ]

  const formInputs: DataTypes = {
    professor,
    student,
    admin,
    guest,
    aris,
    evaluator,
    customer,
    moderator
  }

  return formInputs[role]
}

export default formatUpdateUser
