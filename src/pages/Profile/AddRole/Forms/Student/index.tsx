import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Form, Voucher } from './styles'

import Ways from './Ways'
import { Request } from '../Container'
import { AddRoleContext } from '../../index'

import {
  emailSchema,
  voucherSchema
} from 'utils/validations/addRoleForms/student'
import transition from 'utils/transition'

import api from 'services/api'

import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File, Select, Submit, Text } from 'components/Form'
import { Option } from 'components/Form/Select'
import Presence from 'components/Presence'
import RegisterEmail, { RegisterEmailMethods } from 'components/RegisterEmail'

import { GlobalContext } from 'App'
import { Variants } from 'framer-motion'
import { animation } from 'polished'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { UniversityType } from 'types/Responses/university'
import { CampusResType } from 'types/Responses/university/campus'
import { CoursesResType } from 'types/Responses/university/courses'
import { UniversitiesType } from 'types/Responses/university/universities'
import { EmailsResType, EmailsType } from 'types/Responses/user/emails'
import {
  UserUniversitiesType,
  UserUniversityType
} from 'types/Responses/user/universities'

interface Data {
  id: number
  lattes: string
  linkedin: string
  register: string
  semester: number
  campus_id: number
  course_id: number
}

interface Options {
  campus: Option[]
  course: Option[]
  semester: Option[]
  university: Option[]
}

interface Values {
  course?: Option
  campus?: Option
  university?: Option
}

interface Animations {
  ar: boolean
  ways: boolean
  course: boolean
  campus: boolean
  submit: boolean
  voucher: boolean
  semester: boolean
}

interface StudentProps {
  request?: Request<Data>
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

export const show: Variants = {
  exit: { x: [0, 320], opacity: [1, 0], transition },
  enter: { x: [320, 0], opacity: [0, 1], transition }
}

export const hasInstitutionalEmail = (regex: string, emails?: EmailsType) => {
  const rgx = new RegExp(regex)

  if (emails) return !!emails.find(({ address }) => rgx.test(address))
  return false
}

export const universityArrayToSelect = (
  array: UserUniversitiesType
): Option[] =>
  array.map(({ id, name }: UserUniversityType) => ({ value: id, label: name }))

const Student = ({ request }: StudentProps) => {
  const { popupRef } = useContext(GlobalContext)
  const { courses, universities } = useContext(AddRoleContext)
  const { id } = useSelector<RootState, UserState>(({ user }) => user)

  const registerEmailRef = useRef<RegisterEmailMethods>(null)

  const [userEmails, setUserEmails] = useState<EmailsType>()

  const [registerByEmail, setRegisterByEmail] = useState(false)

  const [animations, setAnimations] = useState<Animations>({
    ar: false,
    ways: false,
    campus: false,
    course: false,
    submit: false,
    voucher: false,
    semester: false
  })

  const [options, setOptions] = useState<Options>({
    campus: [],
    course: [],
    university: [],
    semester: semesterOptions
  })

  const [values, setValues] = useState<Values>({
    university: undefined,
    campus: undefined,
    course: undefined
  })

  const [selectedUniversity, setSelectedUniversity] = useState<UniversityType>({
    id: 0,
    name: '',
    regex: {
      email: { professor: '', student: '' },
      register: { professor: '', student: '' }
    }
  })

  const history = useHistory()

  const registerRegex = universities.find(
    ({ id }) => id === values.university?.value
  )?.regex.register.student

  const setInitialCampusOptions = useCallback(async () => {
    if (request) {
      const { campus }: CampusResType = await api.get(
        `universities/${request.data.id}/campus`
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

      if (!request) {
        const newSelected = universities.find(({ id }) => id === selected.value)
        newSelected && setSelectedUniversity(newSelected)
      }

      setAnimations(prev => ({ ...prev, ar: true, campus: true }))
    }
  }

  const onCampusChange = async (selected: Option) => {
    const { courses }: CoursesResType = await api.get(
      `/universities/campus/${selected.value}/courses`
    )

    console.log(courses)

    if (values.campus !== selected) {
      setOptions(prev => ({
        ...prev,
        course: courses.map(({ id, name }: any) => ({ value: id, label: name }))
      }))

      setValues(prev => ({
        ...prev,
        campus: selected,
        course: prev.campus ? undefined : prev.course
      }))

      setAnimations(prev => ({
        ...prev,
        course: true
      }))
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
      hasInstitutionalEmail(selectedUniversity.regex.email.student, userEmails)

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
            ({ value }) => value === request.data.id
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
      setValues({
        campus: undefined,
        course: undefined,
        university: undefined
      })

      setAnimations({
        ar: false,
        ways: false,
        campus: false,
        course: false,
        submit: false,
        voucher: false,
        semester: false
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, setInitialCampusOptions])

  useEffect(() => {
    setOptions(prev => ({
      ...prev,
      university: universities.map(({ name, id }) => ({
        label: name,
        value: id
      }))
    }))
  }, [universities])

  useEffect(() => {
    setOptions(prev => ({
      ...prev,
      course: courses.map(({ name, course_id }) => ({
        label: name,
        value: course_id
      }))
    }))
  }, [courses])

  useEffect(() => {
    ;(async () => {
      const { emails }: EmailsResType = await api.get(`users/${id}/emails`)

      setUserEmails(emails)
    })()
  }, [id])

  return (
    <>
      <Form
        loading
        afterResData={afterSubmit}
        method={request ? 'patch' : 'post'}
        path={
          request
            ? `user/role/request/student/${request.request_id}`
            : 'user/role/request/student'
        }
        schema={
          animations.voucher
            ? voucherSchema(registerRegex || '')
            : emailSchema(registerRegex || '')
        }
      >
        <Text
          optional
          name='lattes'
          placeholder='Link para: Currículo Lattes'
          defaultValue={request?.data.lattes}
        />

        <Text
          optional
          name='linkedin'
          placeholder='Link para: Linkedin'
          defaultValue={request?.data.linkedin}
        />

        <Select
          name='id'
          id='cy-university'
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
            placeholder='Curso'
            value={values.course}
            options={options.course}
            onChange={(selected: Option) => {
              setValues(prev => ({ ...prev, course: selected }))
              setAnimations(prev => ({ ...prev, semester: true }))
            }}
          />
        </Presence>

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

        <Ways
          animations={animation}
          setAnimations={setAnimations}
          registerEmailRef={registerByEmail}
        />

        <Presence
          exit='exit'
          animate='enter'
          variants={show}
          condition={animations.voucher}
        >
          <Voucher>
            <div id='warning'>
              <p>
                <AlertIcon />
                {`
                  Este processo ${
                    request ? '' : 'é mais lento pois'
                  } requer confirmação de um
                `}
                <b id='moderator'>Moderador</b> de sua universidade. O formato
                do arquivo deve ser <b>PDF</b>.
              </p>
            </div>

            <File
              guides
              bottom='50vh'
              name='voucher'
              tranlateY='50%'
              bgHeight='200vh'
              accept='application/pdf'
              label='Enviar comprovante'
              noCropper={true}
              onChange={() => {
                setAnimations(prev => ({ ...prev, submit: true }))
              }}
            />
          </Voucher>
        </Presence>

        <Presence
          exit='exit'
          initial='exit'
          animate='enter'
          variants={show}
          condition={animations.submit}
        >
          <Submit id='cy-submit'>Enviar solicitação</Submit>
        </Presence>
      </Form>

      {!request && (
        <RegisterEmail
          placeholder='E-mail institucional'
          ref={registerEmailRef}
          title={selectedUniversity.name}
          regex={selectedUniversity.regex.email.student}
          addData={{ id: selectedUniversity.id }}
          modal={{
            translateY: '50%',
            bottom: '50vh'
          }}
          onSuccess={() => {
            setAnimations(prev => ({
              ...prev,
              ways: false,
              submit: true
            }))

            setRegisterByEmail(true)
          }}
        />
      )}
    </>
  )
}

export default Student
