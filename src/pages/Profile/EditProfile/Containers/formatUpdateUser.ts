import { UserState } from 'store/user'

export interface InputData {
  label: string
  value: string | number
  name: string
  editable: boolean
  date?: boolean
  dontShow?: boolean
}

export interface ContainerForm {
  personal: InputData[]
  moderator: InputData[]
  guest: InputData[]
  student: InputData[]
  professor: InputData[]
}

const formatUpdateUser = (
  userData: UserState,
  role: keyof ContainerForm
): InputData[] => {
  const getStudentEmail = () => {
    const value = userData.emails.filter(
      current => current.institutional === true
    )

    return value[0]
  }

  const instEmail = getStudentEmail()

  const guest: InputData[] = [
    {
      label: 'Nome:',
      name: 'name',
      value: userData.name,
      editable: true
    },
    {
      label: 'Sobrenome:',
      name: 'surname',
      value: userData.surname,
      editable: true
    }
  ]

  const personal: InputData[] = [
    {
      label: 'Nome:',
      name: 'name',
      value: userData.name,
      editable: true
    },
    {
      label: 'Sobrenome:',
      name: 'surname',
      value: userData.surname,
      editable: true
    },
    {
      label: 'Nascimento:',
      name: 'birthday',
      value: userData.birthday,
      date: true,
      editable: true
    },
    {
      label: 'Nova senha:',
      name: 'new_password',
      value: '',
      dontShow: true,
      editable: true
    },
    // {
    //   label: 'Confirmar nova senha:',
    //   name: 'new_password',
    //   value: '',
    //   dontShow: true,
    //   editable: true
    // },
    {
      label: 'E-mail:',
      name: 'email',
      value: userData.emails[0].address,
      editable: false
    }
    // {
    //   label: 'Celular:',
    //   name: 'phone',
    //   value: userData.phone ? '' : userData.phone,
    //   date: true,
    //   editable: true
    // }
  ]

  const student: InputData[] = [
    {
      label: 'Email:',
      name: 'inst_email',
      value: instEmail ? instEmail.address : '',
      editable: false
    },
    {
      label: 'Universidade:',
      name: 'university_id',
      value: instEmail ? instEmail.university_id : '',
      editable: false
    }
  ]

  const professor: InputData[] = [
    {
      label: 'Email:',
      name: 'inst_email',
      value: instEmail ? instEmail.address : '',
      editable: false
    },
    {
      label: 'Universidade:',
      name: 'university_id',
      value: instEmail ? instEmail.university_id : '',
      editable: false
    }
  ]

  const moderator: InputData[] = []

  const formInputs: ContainerForm = {
    personal,
    moderator,
    professor,
    guest,
    student
  }

  return formInputs[role]
}

export default formatUpdateUser
