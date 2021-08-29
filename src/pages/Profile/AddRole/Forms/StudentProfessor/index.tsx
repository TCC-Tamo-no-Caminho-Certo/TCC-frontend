import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Style, { Choose, Form, Voucher } from './styles'

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
import { EmailsState } from 'store/Async/emails'
import { getUser } from 'store/Async/user'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { Checkbox, File, Select, Submit, Text } from 'components/Form'
import { Option } from 'components/Form/Select'
import Presence from 'components/Presence'
import Popup, { PopupForwardeds } from 'components/Popup'
// eslint-disable-next-line prettier/prettier
import RegisterEmail, {
  RegisterEmailForwardeds
} from 'components/RegisterEmail'

import { UniversityType } from 'types/Responses/university'
import { CampusResType } from 'types/Responses/university/campus'
import { CoursesResType } from 'types/Responses/university/courses'
import {
  ProfessorDataType,
  RequestType,
  StudentDataType
} from 'types/Responses/user/requests'

import { Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

interface StudentProfessorProps {
  role: 'student' | 'professor'
  request?: RequestType<StudentDataType> & RequestType<ProfessorDataType>
}

interface Options {
  campus: Option[]
  courses: Option[]
  semesters: Option[]
  universities: Option[]
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

export const semesterOptions: Option[] = [
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
  courses: [],
  universities: [],
  semesters: semesterOptions
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

const StudentProfessor = ({ request, role }: StudentProfessorProps) => {
  const { universities } = useContext(AddRoleContext)
  const { emails } = useSelector<RootState, EmailsState>(({ emails }) => emails)

  const registerEmailRef = useRef<RegisterEmailForwardeds>(null)
  const popupRef = useRef<PopupForwardeds>(null)

  const [animations, setAnimations] = useState<Animations>(initialAnimations)
  const [options, setOptions] = useState<Options>(initialOptions)
  const [registerByEmail, setRegisterByEmail] = useState(false)
  const [values, setValues] = useState<Values>(initialValues)

  const [selectedUniversity, setSelectedUniversity] =
    useState<UniversityType>(initialUniversity)

  const dispatch = useDispatch()
  const history = useHistory()

  const formPath = request
    ? `api/users/roles/requests/${request.id}`
    : `api/users/roles/requests/${role}`

  const onVoucherButtonClick = () =>
    setAnimations((prev: any) => ({ ...prev, voucher: true }))

  const onEmailButtonClick = () => {
    setAnimations((prev: any) => ({
      ...prev,
      submit: false,
      voucher: false
    }))

    registerEmailRef.current?.toggleRegister()
  }

  const hasInstitutionalEmail = (universityId: number) => {
    const university = universities.find(({ id }) => universityId === id)

    const institutionalEmails = emails.filter(
      ({ university_id }) => university_id === universityId
    )

    if (university)
      for (let i = 0; i < institutionalEmails.length; i++) {
        const regex = new RegExp(university.regex.email[role])
        if (regex.test(institutionalEmails[i].address)) return true
      }

    return false
  }

  const onEmailSuccess = () => {
    setAnimations(prev => ({
      ...prev,
      ways: false,
      submit: true
    }))

    setRegisterByEmail(true)
  }

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

  const onFileChange = () => {
    setAnimations(prev => ({ ...prev, submit: true }))
  }

  const onUniversityChange = async (selected: Option) => {
    const { campus }: CampusResType = await api.get(
      `api/universities/${selected.value}/campus`
    )

    setOptions(prev => ({
      ...prev,
      campus: campus.map(({ name, id }) => ({
        label: name,
        value: id
      }))
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
      const newSelected = universities?.find(({ id }) => id === selected.value)

      newSelected && setSelectedUniversity(newSelected)
    }
  }

  const onCampusChange = async (selected: Option) => {
    const { courses }: CoursesResType = await api.get(
      `api/universities/campus/${selected.value}/courses`
    )

    setOptions(prev => ({
      ...prev,
      courses: courses.map(({ id, name }: any) => ({
        value: id,
        label: name
      }))
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

      setTimeout(() => setAnimations(prev => ({ ...prev, course: true })), 300)
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
      hasInstitutionalEmail(selectedUniversity.id)
        ? setAnimations(prev => ({ ...prev, submit: true }))
        : setAnimations(prev => ({ ...prev, ways: true }))
  }

  const afterSubmit = ({ success }: any) => {
    const byEmail =
      registerByEmail || hasInstitutionalEmail(selectedUniversity.id)

    const message = () => {
      if (!request) return byEmail ? 'Papel Adicionado' : 'Solicitação enviada!'
      else return 'Solicitação reenviada!'
    }

    if (success)
      popupRef?.current?.configPopup({
        open: true,
        type: 'success',
        message: message(),
        onClick: () => {
          history.push('/session/main')
          dispatch(getUser({}))
        }
      })
    else
      popupRef?.current?.configPopup({
        type: 'error',
        message: 'Algo deu errado :(',
        open: true
      })
  }

  const setInitialCoursesOptions = useCallback(async () => {
    if (request) {
      const { courses }: CoursesResType = await api.get(
        `api/universities/campus/${request.data.campus_id}/courses`
      )

      if (courses) {
        const coursesOptions = courses.map(({ name, id }) => ({
          label: name,
          value: id
        }))

        setOptions(prev => ({ ...prev, courses: coursesOptions }))

        return coursesOptions
      }
    }
  }, [request])

  const setInitialCampusOptions = useCallback(async () => {
    if (request) {
      const { campus }: CampusResType = await api.get(
        `api/universities/${request.data.university_id}/campus`
      )

      if (campus) {
        const campusOption = campus.map(({ name, id }) => ({
          label: name,
          value: id
        }))

        setOptions(prev => ({ ...prev, campus: campusOption }))

        return campusOption
      }
    }
  }, [request])

  useEffect(() => {
    if (request)
      (async () => {
        const campusOptions = await setInitialCampusOptions()
        const coursesOptions = await setInitialCoursesOptions()

        setValues({
          university: options.universities.find(
            ({ value }) => value === request.data.university_id
          ),
          campus: campusOptions?.find(
            ({ value }) => value === request.data.campus_id
          ),
          course: coursesOptions?.find(
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
      courses: [],
      universities: universities?.map(({ name, id }) => ({
        value: id,
        label: name
      }))
    }))
  }, [universities])

  return (
    <Style>
      <Form
        loading
        path={formPath}
        schema={getFormSchema()}
        afterResData={afterSubmit}
        method={request ? 'patch' : 'post'}
      >
        <Select
          name='university_id'
          placeholder='Universidade'
          value={values.university}
          onChange={onUniversityChange}
          options={options.universities}
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
            options={options.courses}
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
              options={options.semesters}
              onChange={onSemesterChange}
              defaultValue={options.semesters.find(
                ({ value }) => value === request?.data.semester
              )}
            />
          </Presence>
        )}

        <Choose
          exit='exit'
          animate='enter'
          variants={show}
          condition={animations.ways}
        >
          <span>Forma de registro</span>

          <div>
            <button
              type='button'
              data-cy='Ways-email'
              onClick={onEmailButtonClick}
            >
              E-mail institucional
            </button>

            <button
              type='button'
              data-cy='Ways-voucher'
              onClick={onVoucherButtonClick}
            >
              Enviar comprovante
            </button>
          </div>
        </Choose>

        <Voucher
          exit='exit'
          animate='enter'
          variants={show}
          condition={animations.voucher}
        >
          <p>
            <AlertIcon />
            {` Este processo ${
              request ? '' : 'é mais lento pois'
            } requer confirmação de um `}
            <b id='moderator'>Moderador</b> de sua universidade. O formato do
            arquivo deve ser <b>PDF</b>.
          </p>

          <File
            guides
            bottom='50vh'
            name='voucher'
            tranlateY='50%'
            bgHeight='200vh'
            noCropper={true}
            onChange={onFileChange}
            accept='application/pdf'
            label='Enviar comprovante'
          />
        </Voucher>

        {role === 'professor' && (
          <Checkbox
            name='full_time'
            id='cy-full_time'
            label='Sou professor em tempo integral'
            defaultCheck={request?.data.full_time}
          />
        )}

        <Presence
          exit='exit'
          initial='exit'
          animate='enter'
          variants={show}
          condition={animations.submit}
        >
          <Submit type='submit'>Enviar solicitação</Submit>
        </Presence>
      </Form>

      <RegisterEmail
        ref={registerEmailRef}
        onSuccess={onEmailSuccess}
        title={selectedUniversity.name}
        placeholder='E-mail institucional'
        regex={selectedUniversity.regex.email.student}
        addData={{ university_id: selectedUniversity.id }}
      />

      <Popup ref={popupRef} />
    </Style>
  )
}

export default StudentProfessor
