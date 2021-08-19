import React, { useCallback, useEffect, useState } from 'react'
import Style from './styles'

import Field, { InputData } from '../Field'
import { ContainerForm } from '../ProfileAndRoles'
import { semesterOptions } from '../../AddRole/Forms/StudentProfessor'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncRolesDataState } from 'store/Async/rolesData'
import { AsyncUserState } from 'store/Async/user'
import { AsyncEmailsState } from 'store/Async/emails'
import { AsyncUniversitiesState } from 'store/Async/universities'

import Form, { Submit } from 'components/Form'
import Slider from 'components/Slider'
import Card from 'components/Card'
import { Option } from 'components/Form/Select'

import { RoleType } from 'types/Responses/user/roles'
import { CampusResType } from 'types/Responses/university/campus'

import { useSelector } from 'react-redux'

interface UniversitiesProps {
  sliderWidth: number
}

const Universities = ({ sliderWidth }: UniversitiesProps) => {
  const { universities } = useSelector<RootState, AsyncUniversitiesState>(
    ({ asyncUniversities }) => asyncUniversities
  )

  const { emails } = useSelector<RootState, AsyncEmailsState>(
    ({ asyncEmails }) => asyncEmails
  )

  const { user } = useSelector<RootState, AsyncUserState>(
    ({ asyncUser }) => asyncUser
  )

  const { roles } = useSelector<RootState, AsyncRolesDataState>(
    ({ asyncRolesData }) => asyncRolesData
  )

  const [containers, setContainers] = useState<any[]>()

  const getUserUniversities = useCallback(async () => {
    const containers: any[] = []

    user?.roles?.forEach(role => {
      if (role === 'student' || role === 'professor')
        roles[role]?.universities.forEach((university: any) => {
          const foundUniversity = universities.find(
            storeUniversity => storeUniversity.id === university.id
          )

          const registerRegex = foundUniversity?.regex.register[role]
          const emailRegex = foundUniversity?.regex.email[role]

          if (emailRegex && registerRegex) {
            const address = emails.find(email =>
              RegExp(emailRegex).test(email.address)
            )?.address

            containers.push({ ...university, role, address })
          }
        })
    })

    setContainers(containers)
  }, [emails, roles, universities, user?.roles])

  useEffect(() => {
    getUserUniversities()
  }, [getUserUniversities])

  const rolesInputData = (role: RoleType, container: any): InputData[] => {
    const getCampus = async (): Promise<Option[] | undefined> => {
      const { campus }: CampusResType = await api.get(
        `api/universities/${container.university_id}/campus`
      )

      if (campus)
        return campus.map(({ name, id }) => ({
          label: name,
          value: id
        }))
      return undefined
    }

    const student: InputData[] = [
      {
        editable: false,
        name: 'register',
        value: container.register,
        label: 'Registro acadêmico:'
      },
      {
        name: 'campus',
        type: 'select',
        editable: false,
        label: 'Campus:',
        options: getCampus(),
        value: container?.campus_id
      },
      {
        name: 'course',
        type: 'select',
        label: 'Curso:',
        editable: false,
        value: container?.course_id
      },
      {
        type: 'select',
        editable: false,
        name: 'semester',
        label: 'Semestre:',
        value: container.semester,
        options: semesterOptions
      }
    ]

    const professor: InputData[] = [
      {
        name: 'register',
        editable: false,
        value: container.register,
        label: 'Registro acadêmico:'
      },
      {
        name: 'campus',
        editable: false,
        label: 'Campus:',
        value: container?.campus_id
      },
      {
        name: 'course',
        editable: false,
        label: 'Curso:',
        value: container?.course_id
      }
    ]

    container?.address &&
      professor.unshift({
        name: 'address',
        editable: false,
        label: 'E-mail:',
        value: container?.address
      })

    container?.address &&
      student.unshift({
        name: 'address',
        editable: false,
        label: 'E-mail:',
        value: container?.address
      })

    const formInputs: any = { student, professor }

    return formInputs[role as keyof ContainerForm]
  }

  return (
    <Style>
      <Slider gap={200} gapVertical={32} width={sliderWidth}>
        {containers?.map((container, index) => (
          <Card headerText={container.name} role={container.role} key={index}>
            <Form method='patch' path='api/'>
              {rolesInputData(container.role, container)?.map(data => (
                <Field key={data.name} data={data} />
              ))}

              <Submit>Salvar alterações</Submit>
            </Form>
          </Card>
        ))}
      </Slider>
    </Style>
  )
}

export default Universities
