import { University } from 'store/Async/universities'
import { UserState } from 'store/Async/user'

export interface InputData {
  name: string
  label: string
  editable: boolean
  value: string | number
  date?: boolean
  dontShow?: boolean
}

export interface ContainerForm {
  guest: InputData[]
  student: InputData[]
  personal: InputData[]
  professor: InputData[]
  moderator: InputData[]
}

const removeRepeatly = (array: any[]) =>
  array.filter((current, index) => array.indexOf(current) === index)

const formatUpdateUser = (
  universities: University[],
  userData: UserState,
  role: keyof ContainerForm
): InputData[] => {
  const getUniversityName = (id: number) => {
    const university = universities.find(
      university => university.university_id === id
    )

    return university ? university.name : ''
  }

  const getEmail = (role: 'student' | 'professor'): InputData[] => {
    const fields = []

    const getUniversityRegex = (id: number) => {
      const university = universities.find(
        university => university.university_id === id
      )

      return university ? university.regex.email[role] : ''
    }

    const institucionalUniversities = removeRepeatly(
      userData.emails
        .filter(current => current.institutional === true)
        .map(({ address, university_id }) => ({
          address,
          university_id
        }))
    )

    const userUniversities = institucionalUniversities.map(
      ({ university_id, address }) => ({
        address,
        regex: getUniversityRegex(university_id),
        universityName: getUniversityName(university_id)
      })
    )

    for (let i = 0; i < userUniversities.length; i++) {
      const regex = new RegExp(userUniversities[i].regex)

      fields.push({
        name: 'university_id',
        label: 'Universidade:',
        value: userUniversities[i].universityName,
        editable: false
      })

      if (regex.test(userUniversities[i].address))
        fields.push({
          name: 'inst_email',
          label: 'Email:',
          value: userUniversities[i].address,
          editable: false
        })
    }

    return fields
  }

  const guest: InputData[] = [
    {
      name: 'name',
      label: 'Nome:',
      value: userData.name,
      editable: true
    },
    {
      name: 'surname',
      label: 'Sobrenome:',
      value: userData.surname,
      editable: true
    }
  ]

  const personal: InputData[] = [
    {
      name: 'name',
      label: 'Nome:',
      value: userData.name,
      editable: true
    },
    {
      name: 'surname',
      label: 'Sobrenome:',
      value: userData.surname,
      editable: true
    },
    {
      name: 'birthday',
      label: 'Nascimento:',
      value: userData.birthday,
      editable: true,
      date: true
    },
    {
      name: 'new_password',
      label: 'Nova senha:',
      value: '',
      editable: true,
      dontShow: true
    },
    // {
    //   name: 'new_password',
    //   label: 'Confirmar nova senha:',
    //   value: '',
    //   dontShow: true,
    //   editable: true
    // },
    {
      name: 'email',
      label: 'E-mail:',
      value: userData.emails[0].address,
      editable: false
    }
    // {
    //   name: 'phone',
    //   label: 'Celular:',
    //   value: userData.phone ? '' : userData.phone,
    //   date: true,
    //   editable: true
    // }
  ]

  const student: InputData[] = [
    ...getEmail('student'),
    {
      name: 'linkedin',
      label: 'Linkedin:',
      value: userData.student?.linkedin || '',
      editable: false
    },
    {
      name: 'lattes',
      label: 'Lattes:',
      value: userData.student?.lattes || '',
      editable: false
    },
    {
      name: 'semester',
      label: 'Semestre:',
      value: userData.student?.universities
        ? `${userData.student.universities[0].semester}° Semestre`
        : '',
      editable: false
    }
  ]

  const professor: InputData[] = [
    ...getEmail('professor'),
    {
      name: 'linkedin',
      label: 'Linkedin:',
      value: userData.professor?.linkedin || '',
      editable: false
    },
    {
      name: 'lattes',
      label: 'Lattes:',
      value: userData.professor?.lattes || '',
      editable: false
    },
    {
      name: 'orcid',
      label: 'Orcid:',
      value: userData.professor?.orcid || '',
      editable: false
    },
    {
      name: 'postgraduate',
      label: 'Pós-graduação:',
      value: userData.professor?.postgraduate ? 'Sim' : 'Não',
      editable: false
    },
    {
      name: 'full_time',
      label: 'Tempo integral:',
      value: userData.professor?.universities
        ? userData.professor?.universities[0].full_time
          ? 'Sim'
          : 'Não'
        : '',
      editable: false
    }
  ]

  const moderator: InputData[] = [
    {
      name: 'university_id',
      label: 'Universidade',
      value:
        (userData.moderator?.universities &&
          getUniversityName(
            userData.moderator.universities[0].university_id
          )) ||
        '',
      editable: false
    }
  ]

  const formInputs: ContainerForm = {
    guest,
    student,
    personal,
    professor,
    moderator
  }

  return formInputs[role]
}

export default formatUpdateUser
