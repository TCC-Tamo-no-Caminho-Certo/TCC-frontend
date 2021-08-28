import React, { useCallback, useEffect, useRef, useState } from 'react'
import Style from './styles'

import { InputData } from '../EditContent/Field'
import { ContainerForm } from '../ProfileAndRoles'
import { semesterOptions } from '../../AddRole/Forms/StudentProfessor'
import EditContent from '../EditContent'

import api from 'services/api'

import { RootState } from 'store'
import { AsyncRolesDataState } from 'store/Async/rolesData'
import { AsyncUserState } from 'store/Async/user'
import { AsyncEmailsState, getUpdatedEmails } from 'store/Async/emails'
import { AsyncUniversitiesState } from 'store/Async/universities'

import Slider from 'components/Slider'
import RegisterEmail, {
  RegisterEmailForwardeds
} from 'components/RegisterEmail'

import { RoleType } from 'types/Responses/user/roles'
import { OneCampusResType } from 'types/Responses/university/campus'
import { CourseResType } from 'types/Responses/university/courses'

import { useDispatch, useSelector } from 'react-redux'

interface UniversitiesProps {
  sliderWidth: number
}
interface Container {
  id: number
  name: string
  role: RoleType
  register: string
  campus_id: number
  address?: string
  course_id: number
  semester?: boolean
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

  const registerEmailRef = useRef<RegisterEmailForwardeds>(null)

  const [universityOfEditingEmail, setUniversityOfEditingEmail] = useState()
  const [containers, setContainers] = useState<Container[]>()
  const [professorData, setProfessorData] = useState<any>({
    campus: '',
    course: ''
  })
  const [studentData, setStudentData] = useState<any>({
    campus: '',
    course: ''
  })

  const dispatch = useDispatch()

  const getUserUniversities = useCallback(async () => {
    const containers: any[] = []

    user?.roles?.forEach(role => {
      if (role === 'student' || role === 'professor')
        roles[role]?.universities.forEach((university: any) => {
          const foundUniversity = universities.find(
            ({ id }) => id === university.id
          )

          console.log(university)

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

  const getCampusAndCourseLabel = useCallback(async () => {
    const studentContainer = containers?.find(({ role }) => role === 'student')
    const professorContainer = containers?.find(
      ({ role }) => role === 'professor'
    )

    if (studentContainer) {
      const { id, course_id, campus_id } = studentContainer

      const { campus }: OneCampusResType = await api.get(
        `api/universities/${id}/campus/${campus_id}`
      )

      const { course }: CourseResType = await api.get(
        `api/universities/${id}/campus/${campus_id}/courses/${course_id}`
      )

      setStudentData({ campus: campus?.name, course: course?.name })
    }

    if (professorContainer) {
      const { id, course_id, campus_id } = professorContainer

      const { campus }: OneCampusResType = await api.get(
        `api/universities/${id}/campus/${campus_id}`
      )

      const { course }: CourseResType = await api.get(
        `api/universities/${id}/campus/${campus_id}/courses/${course_id}`
      )

      setProfessorData({ campus: campus?.name, course: course?.name })
    }
  }, [containers])

  useEffect(() => {
    getUserUniversities()
  }, [getUserUniversities])

  useEffect(() => {
    getCampusAndCourseLabel()
  }, [containers, getCampusAndCourseLabel])

  const rolesInputData = (role: RoleType, container: any) => {
    const student: InputData[] = [
      {
        editable: false,
        name: 'register',
        value: container.register,
        label: 'Registro acadêmico:'
      },
      {
        name: 'campus',
        editable: false,
        label: 'Campus:',
        value: studentData.campus
      },
      {
        name: 'course',
        label: 'Curso:',
        editable: false,
        value: studentData.course
      },
      {
        editable: false,
        name: 'semester',
        label: 'Semestre:',
        options: semesterOptions,
        value: `${container.semester}° Semestre`
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
        value: professorData.campus
      },
      {
        name: 'course',
        editable: false,
        label: 'Curso:',
        value: professorData.course
      }
    ]

    container?.address &&
      professor.unshift({
        name: 'address',
        editable: false,
        label: 'E-mail:',
        withEditIcon: true,
        value: container?.address,
        onEditClick: () => {
          setUniversityOfEditingEmail(container?.id)
          registerEmailRef.current?.toggleRegister(true)
        }
      })

    container?.address &&
      student.unshift({
        name: 'address',
        editable: false,
        label: 'E-mail:',
        withEditIcon: true,
        value: container?.address,
        onEditClick: () => {
          setUniversityOfEditingEmail(container?.id)
          registerEmailRef.current?.toggleRegister(true)
        }
      })

    const formInputs: any = { student, professor }

    return formInputs[role as keyof ContainerForm]
  }

  return (
    <>
      <Style>
        <Slider gap={200} gapVertical={32} width={sliderWidth}>
          {containers?.map(container => (
            <EditContent
              key={container.role}
              headerText={container.name}
              role={container.role as RoleType}
              path={`api/users/roles/${container.role}`}
              fields={rolesInputData(container.role, container)}
            />
          ))}
        </Slider>
      </Style>

      <RegisterEmail
        placeholder='E-mail'
        ref={registerEmailRef}
        title='Digite seu novo e-mail'
        addData={{ university_id: universityOfEditingEmail }}
        onSuccess={() => {
          user?.id && dispatch(getUpdatedEmails({ userId: user.id }))
        }}
      />
    </>
  )
}

export default Universities
