import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Form } from './styles'

import Ways from '../Container/Ways'
import { AddRoleContext } from '../../index'

import {
  emailSchema as studentEmailSchema,
  voucherSchema as studentVoucherSchema
} from 'utils/validations/addRoleForms/student'
import {
  emailSchema as professorEmailSchema,
  voucherSchema as professorVoucherSchema
} from 'utils/validations/addRoleForms/professor'
import transition from 'utils/transition'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import { Select, Submit, Text } from 'components/Form'
import { Option } from 'components/Form/Select'
import Presence from 'components/Presence'

import { UniversityType } from 'types/Responses/university'
import { CampusResType } from 'types/Responses/university/campus'
import { CoursesResType } from 'types/Responses/university/courses'
import { EmailsResType, EmailsType } from 'types/Responses/user/emails'
import {
  ProfessorDataType,
  RequestType,
  StudentDataType
} from 'types/Responses/user/requests'

import { GlobalContext } from 'App'
import { motion, Variants } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

interface StudentProfessorProps {
  role: 'student' | 'professor'
  request?: RequestType<StudentDataType> & RequestType<ProfessorDataType>
}

interface Options {
  campus: Option[]
  course: Option[]
  semester: Option[]
  university: Option[]
}

export interface Animations {
  ar: boolean
  ways: boolean
  course: boolean
  campus: boolean
  submit: boolean
  voucher: boolean
  semester: boolean
}

interface Values {
  course?: Option
  campus?: Option
  university?: Option
}

export const show: Variants = {
  exit: { x: [0, 320], opacity: [1, 0], transition },
  enter: { x: [320, 0], opacity: [0, 1], transition }
}

const semesterOptions: Option[] = [
  { value: 1, label: '1° Semestre' },
  { value: 2, label: '2° Semestre' },
  { value: 3, label: '3° Semestre' },
  { value: 4, label: '4° Semestre' },
  { value: 5, label: '5° Semestre' },
  { value: 6, label: '6° Semestre' },
  { value: 7, label: '7° Semestre' },
  { value: 8, label: '8° Semestre' },
  { value: 9, label: '9° Semestre' },
  { value: 10, label: '10° Semestre' }
]

const initialAnimations = {
  ar: false,
  ways: false,
  course: false,
  submit: false,
  campus: false,
  voucher: false,
  semester: false
}

const initialOptions = {
  campus: [],
  course: [],
  university: [],
  semester: semesterOptions
}

const initialValues = {
  campus: undefined,
  course: undefined,
  university: undefined
}

const initialUniversity = {
  id: 0,
  name: '',
  regex: {
    email: { professor: '', student: '' },
    register: { professor: '', student: '' }
  }
}

export const hasInstitutionalEmail = (regex: string, emails?: EmailsType) => {
  const rgx = new RegExp(regex)

  if (emails) return !!emails.find(({ address }) => rgx.test(address))
  return false
}

const StudentProfessor = ({ request, role }: StudentProfessorProps) => {
  const user = useSelector<RootState, UserState>(({ user }) => user)
  const { universities } = useContext(AddRoleContext)
  const { popupRef } = useContext(GlobalContext)

  const [animations, setAnimations] = useState<Animations>(initialAnimations)
  const [options, setOptions] = useState<Options>(initialOptions)
  const [registerByEmail, setRegisterByEmail] = useState(false)
  const [values, setValues] = useState<Values>(initialValues)
  const [userEmails, setUserEmails] = useState<EmailsType>()
  const [selectedUniversity, setSelectedUniversity] =
    useState<UniversityType>(initialUniversity)

  const history = useHistory()

  const formPath = request
    ? `users/roles/requests/${request.id}/${role}`
    : `users/roles/requests/${role}`

  const setInitialCampusOptions = useCallback(async () => {
    if (request) {
      const { campus }: CampusResType = await api.get(
        `universities/${request.data.university_id}/campus`
      )

      if (campus) {
        const campusOption = campus.map(({ name, id }) => ({
          label: name,
          value: id
        }))

        setOptions(prev => ({ ...prev, campusOption }))

        return campusOption
      }
    }
  }, [request])

  const getFormSchema = () => {
    const registerRegex = universities?.find(
      ({ id }) => id === values.university?.value
    )?.regex.register?.[role]

    if (animations.voucher)
      return role === 'student'
        ? studentVoucherSchema(registerRegex || '')
        : professorVoucherSchema(registerRegex || '')
    else
      return role === 'student'
        ? studentEmailSchema(registerRegex || '')
        : professorEmailSchema(registerRegex || '')
  }

  const onUniversityChange = async (selected: Option) => {
    if (values.university !== selected) {
      const { campus }: CampusResType = await api.get(
        `universities/${selected.value}/campus`
      )

      setOptions(prev => ({
        ...prev,
        campus: campus.map(({ name, id }) => ({ label: name, value: id }))
      }))

      setValues(prev => ({
        ...prev,
        campus: undefined,
        course: undefined,
        university: selected
      }))

      setAnimations(prev => ({
        ...prev,
        ar: false,
        course: false,
        campus: false,
        semester: false
      }))

      setTimeout(() => {
        setAnimations(prev => ({
          ...prev,
          ar: true,
          campus: true
        }))
      }, 300)

      if (!request) {
        const newSelected = universities?.find(
          ({ id }) => id === selected.value
        )

        newSelected && setSelectedUniversity(newSelected)
      }
    }
  }

  const onCampusChange = async (selected: Option) => {
    if (values.campus !== selected) {
      const { courses }: CoursesResType = await api.get(
        `/universities/campus/${selected.value}/courses`
      )

      setOptions(prev => ({
        ...prev,
        course: courses.map(({ id, name }: any) => ({ value: id, label: name }))
      }))

      if (!values.campus) {
        setValues(prev => ({ ...prev, campus: selected }))
        setAnimations(prev => ({ ...prev, course: true }))
      } else {
        setValues(prev => ({
          university: prev.university,
          campus: selected,
          course: undefined
        }))

        setAnimations(prev => ({
          ...prev,
          ways: false,
          course: false,
          semester: false
        }))

        setTimeout(
          () => setAnimations(prev => ({ ...prev, course: true })),
          300
        )
      }
    }
  }

  const onCourseChange = (selected: Option) => {
    if (values.course !== selected) {
      setValues(prev => ({ ...prev, course: selected }))

      role === 'student'
        ? setAnimations(prev => ({ ...prev, semester: true }))
        : setAnimations(prev => ({ ...prev, ways: true }))
    }
  }

  const onSemesterChange = () => {
    if (!request)
      hasInstitutionalEmail(selectedUniversity.regex.email.student, userEmails)
        ? setAnimations(prev => ({ ...prev, submit: true }))
        : setAnimations(prev => ({ ...prev, ways: true }))
  }

  const afterSubmit = ({ success }: any) => {
    const byEmail =
      registerByEmail ||
      hasInstitutionalEmail(selectedUniversity.regex.email[role], userEmails)

    if (success)
      popupRef?.current?.configPopup({
        setModal: true,
        type: 'success',
        message: request
          ? 'Solicitação reenviada!'
          : byEmail
          ? 'Papel Adicionado'
          : 'Solicitação enviada!',
        onClick: () => {
          history.push('/session/main')
        }
      })
    else
      popupRef?.current?.configPopup({
        type: 'error',
        message: 'Algo deu errado :(',
        setModal: true
      })
  }

  useEffect(() => {
    if (request)
      (async () => {
        const campusOptions = await setInitialCampusOptions()

        setValues({
          university: options.university.find(
            ({ value }) => value === request.data.university_id
          ),
          campus: campusOptions?.find(
            ({ value }) => value === request.data.campus_id
          ),
          course: options.course.find(
            ({ value }) => value === request.data.course_id
          )
        })

        setAnimations({
          ar: true,
          ways: false,
          campus: true,
          course: true,
          submit: false,
          voucher: true,
          semester: true
        })
      })()

    return () => {
      setValues(initialValues)
      setAnimations(initialAnimations)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, setInitialCampusOptions])

  useEffect(() => {
    setOptions(prev => ({
      ...prev,
      course: [],
      university: universities?.map(({ name, id }) => ({
        label: name,
        value: id
      }))
    }))
  }, [universities])

  useEffect(() => {
    ;(async () => {
      const { emails }: EmailsResType = await api.get(`users/${user.id}/emails`)

      setUserEmails(emails)
    })()
  }, [user.id])
  return (
    <>
      <Form
        loading
        path={formPath}
        schema={getFormSchema()}
        afterResData={afterSubmit}
        method={request ? 'patch' : 'post'}
      >
        <Select
          id='cy-university'
          name='university_id'
          placeholder='Universidade'
          value={values.university}
          options={options.university}
          onChange={onUniversityChange}
        />

        <Presence
          id='ar'
          animate='enter'
          variants={show}
          condition={animations.ar}
        >
          <Text
            name='register'
            placeholder='Registro Acadêmico'
            defaultValue={request?.data.register}
          />
        </Presence>

        <Presence animate='enter' variants={show} condition={animations.campus}>
          <Select
            id='cy-campus'
            name='campus_id'
            placeholder='Câmpus'
            value={values.campus}
            options={options.campus}
            onChange={onCampusChange}
          />
        </Presence>

        <Presence animate='enter' variants={show} condition={animations.course}>
          <Select
            id='cy-course'
            name='course_id'
            value={values.course}
            options={options.course}
            onChange={onCourseChange}
            placeholder={
              role === 'professor' ? 'Curso com maior carga horária' : 'Curso'
            }
          />
        </Presence>

        {role === 'student' && (
          <Presence
            animate='enter'
            variants={show}
            condition={animations.semester}
          >
            <Select
              id='cy-semester'
              name='semester'
              placeholder='Semestre'
              options={options.semester}
              onChange={onSemesterChange}
              defaultValue={options.semester.find(
                ({ value }) => value === request?.data.semester
              )}
            />
          </Presence>
        )}

        <Ways
          request={request}
          animations={animations}
          setAnimations={setAnimations}
          setRegisterByEmail={setRegisterByEmail}
          selectedUniversity={selectedUniversity}
        />

        <Presence
          exit='exit'
          initial='exit'
          animate='enter'
          variants={show}
          condition={animations.submit}
        >
          <Submit id='cy-submit' type='submit'>
            Enviar solicitação
          </Submit>
        </Presence>
      </Form>
    </>
  )
}

export default StudentProfessor
