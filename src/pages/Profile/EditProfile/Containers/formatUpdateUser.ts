import { UserState } from 'store/user'

export interface InputData {
  label: string
  value: string | number
  inputname: string
  date?: boolean
  dontShow?: boolean
}

export interface ContainerForm {
  personal: InputData[]
  moderator: InputData[]
  guest: InputData[]
}

const formatUpdateUser = (
  userData: UserState,
  role: keyof ContainerForm
): InputData[] => {
  const guest: InputData[] = [
    {
      label: 'Nome:',
      inputname: 'name',
      value: userData.name
    }
  ]

  const moderator: InputData[] = [
    {
      label: 'Nome:',
      inputname: 'name',
      value: userData.name
    }
  ]

  const personal: InputData[] = [
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
    // {
    //   label: 'Senha:',
    //   inputname: 'new_password',
    //   value: '00000asd',
    //   dontShow: true
    // }
  ]

  const formInputs: ContainerForm = {
    personal,
    moderator,
    guest
  }

  return formInputs[role]
}

export default formatUpdateUser
