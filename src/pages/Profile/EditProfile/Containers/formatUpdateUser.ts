import { University } from 'store/universities'
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

const removeRepeatly = (array: any[]) =>
  array.filter((cur, i) => array.indexOf(cur) === i)

const formatUpdateUser = (
  universities: University[],
  userData: UserState,
  role: keyof ContainerForm
): InputData[] => {
  const getEmail = (role: 'student' | 'professor') => {
    const inputObject = []

    if (universities) {
      const allUniversitiesIds = removeRepeatly(
        userData.emails
          .filter(current => current.institutional === true)
          .map(email => ({ address: email.address, id: email.university_id }))
      )

      const getUniversitiesByIds = allUniversitiesIds.map(
        ({ id, address }) => ({
          address,
          regex: universities.filter(
            university => university.university_id === id
          )[0].regex.email[role],
          universityName: universities.filter(
            university => university.university_id === id
          )[0].name
        })
      )

      for (let x = 0; x < getUniversitiesByIds.length; x++) {
        const regex = new RegExp(getUniversitiesByIds[x].regex)

        if (regex.test(getUniversitiesByIds[x].address)) {
          inputObject.push({
            label: 'Universidade:',
            name: 'university_id',
            value: getUniversitiesByIds[x].universityName,
            editable: false
          })
          inputObject.push({
            label: 'Email:',
            name: 'inst_email',
            value: getUniversitiesByIds[x].address,
            editable: false
          })
        }
      }
    }

    return inputObject
  }

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

  const student: InputData[] = getEmail('student')
  const professor: InputData[] = getEmail('professor')
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
