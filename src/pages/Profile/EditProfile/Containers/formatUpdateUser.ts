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
  student: InputData[]
}

const formatUpdateUser = (
  userData: UserState,
  role: keyof ContainerForm
): InputData[] => {
  const getStudentEmail = () => {
    const value = userData.email.filter(
      current => current.institutional === true
    )

    return value[0]
  }

  const instEmail = getStudentEmail()

  const guest: InputData[] = [
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
      value: userData.email[0].address
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

  const student: InputData[] = [
    {
      label: 'Email:',
      inputname: 'inst_email',
      value: instEmail ? instEmail.address : ''
    },
    {
      label: 'Universidade:',
      inputname: 'university_id',
      value: instEmail ? instEmail.university_id : ''
    }
  ]

  const moderator: InputData[] = []

  const formInputs: ContainerForm = {
    personal,
    moderator,
    guest,
    student
  }

  return formInputs[role]
}

export default formatUpdateUser
