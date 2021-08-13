import { UserOnStateType } from 'store/Async/user'

import { UniversitiesType } from 'types/Responses/university/universities'
import { EmailsType } from 'types/Responses/user/emails'
import { RolesDataType } from 'types/Responses/user/rolesData'

export interface InputData {
  name: string
  label: string
  editable: boolean
  value?: string | number
  date?: boolean
  dontShow?: boolean
}

export interface ContainerForm {
  guest: InputData[]
  student: InputData[]
  personal: InputData[]
  professor: InputData[]
  moderator: InputData[]
  administrator: InputData[]
}

interface FormatUpdateUserProps {
  role: keyof ContainerForm
  universities: UniversitiesType
  emails?: EmailsType
  roles?: RolesDataType
  user?: UserOnStateType
}

const removeRepeatly = (array: any[] | undefined) => {
  if (array)
    return array.filter((current, index) => array.indexOf(current) === index)
  return []
}

const formatUpdateUser = ({
  user,
  role,
  roles,
  emails,
  universities
}: FormatUpdateUserProps): InputData[] => {
  const getUniversityName = (id: number) => {
    const university = universities.find(university => university.id === id)
    return university ? university.name : ''
  }

  const getEmail = (role: 'student' | 'professor'): InputData[] => {
    const fields = []

    const getUniversityRegex = (id: number) => {
      const university = universities.find(university => university.id === id)

      return university ? university.regex.email[role] : ''
    }

    const institucionalUniversities = removeRepeatly(
      emails &&
        emails
          .filter(({ university_id }) => university_id)
          .map(({ address, university_id }) => ({ address, university_id }))
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
      value: user?.name,
      editable: true
    },
    {
      name: 'surname',
      label: 'Sobrenome:',
      value: user?.surname,
      editable: true
    }
  ]

  const personal: InputData[] = [
    {
      name: 'name',
      label: 'Nome:',
      value: user?.name,
      editable: true
    },
    {
      name: 'surname',
      label: 'Sobrenome:',
      value: user?.surname,
      editable: true
    },
    {
      name: 'birthday',
      label: 'Nascimento:',
      value: user?.birthday,
      editable: true,
      date: true
    },
    {
      value: '',
      editable: true,
      dontShow: true,
      name: 'new_password',
      label: 'Nova senha:'
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
      value: emails ? emails[0]?.address : undefined,
      editable: false
    },
    {
      editable: true,
      name: 'linkedin',
      label: 'Linkedin:',
      value: roles?.student?.linkedin || ''
    },
    {
      name: 'lattes',
      editable: true,
      label: 'Lattes:',
      value: roles?.student?.lattes || ''
    }
    // {
    //   name: 'phone',
    //   label: 'Celular:',
    //   value: user?.phone ? '' : user?.phone,
    //   date: true,
    //   editable: true
    // }
  ]

  const student: InputData[] = [
    ...getEmail('student'),
    {
      editable: false,
      name: 'semester',
      label: 'Semestre:',
      value: roles?.student?.universities
        ? `${roles?.student.universities[0].semester}° Semestre`
        : ''
    }
  ]

  const professor: InputData[] = [
    ...getEmail('professor'),
    {
      name: 'linkedin',
      label: 'Linkedin:',
      value: roles?.professor?.linkedin || '',
      editable: false
    },
    {
      name: 'lattes',
      label: 'Lattes:',
      value: roles?.professor?.lattes || '',
      editable: false
    },
    {
      name: 'orcid',
      label: 'Orcid:',
      value: roles?.professor?.orcid || '',
      editable: false
    },
    {
      name: 'postgraduate',
      label: 'Pós-graduação:',
      value: roles?.professor?.postgraduate ? 'Sim' : 'Não',
      editable: false
    },
    {
      name: 'full_time',
      label: 'Tempo integral:',
      value: roles?.professor?.universities
        ? roles?.professor?.universities[0].full_time
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
        (roles?.moderator?.universities &&
          getUniversityName(roles?.moderator.universities[0].id)) ||
        '',
      editable: false
    }
  ]

  const administrator: InputData[] = [
    {
      name: 'university_id',
      label: 'Universidade',
      value:
        (roles?.administrator &&
          getUniversityName(roles?.administrator.university.id)) ||
        '',
      editable: false
    }
  ]

  const formInputs: ContainerForm = {
    guest,
    student,
    personal,
    professor,
    moderator,
    administrator
  }

  return formInputs[role]
}

export default formatUpdateUser
