import React, { useEffect, useRef, useState } from 'react'
import { Form, MotionReceipt, MotionWays } from './styles'

import {
  emailSchema,
  receiptSchema
} from 'utils/validations/addRoleForms/student'

import api from 'services/api'

import { Email, getUser, UserActions, UserState } from 'store/user'
import { Response, RootState } from 'store'
import { getUniversities, UniversitiesState } from 'store/universities'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File, Select, Submit, Text } from 'components/Form'
import { Option } from 'components/Form/Select'
import Popup, { PopupMethods } from 'components/Popup'
import Presence from 'components/Presence'
import RegisterEmail, { RegisterEmailMethods } from 'components/RegisterEmail'

import { motion, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

export interface University {
  value: string | number
  label: string
  email: {
    student: string
    professor: string
  }
  register: {
    student: string
    professor: string
  }
}

interface FormState {
  campus: Option[] | undefined
  courses: Option[] | undefined
  universities: University[] | undefined
  selectedUniversity?: University
}

interface AnimationsState {
  showCampus: boolean
  showCourse: boolean
  showSemester: boolean
  showWays: boolean
  showReceipt: boolean
  showAr: boolean
  showSubmit: boolean
}

interface StudentFormProps {
  beforeData?: any
}

const initialFormState: FormState = {
  selectedUniversity: undefined,
  campus: undefined,
  courses: undefined,
  universities: undefined
}

const initialAnimations: AnimationsState = {
  showCampus: false,
  showCourse: false,
  showSemester: false,
  showWays: false,
  showReceipt: false,
  showAr: false,
  showSubmit: false
}

const semesterOptions: Option[] | undefined = [
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
  enter: {
    x: [320, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      type: 'tween'
    }
  },
  exit: {
    x: [0, 320],
    opacity: [1, 0],
    transition: {
      duration: 0.3,
      type: 'tween'
    }
  }
}

const MotionSelect = motion.custom(Select)
const MotionSubmit = motion.custom(Submit)

export const haveInstitutionalEmail = (
  regex: string | undefined,
  emails: Email[]
) => {
  if (regex) {
    const newRegex = new RegExp(regex)

    const instEmails = emails.filter(({ address }) => newRegex.test(address))
    return instEmails.length !== 0
  }
}

export const formatterToSelect = (
  array: University[] | undefined
): Option[] | undefined =>
  array
    ? array.map(({ value, label }: University) => ({
        value: value,
        label: label
      }))
    : undefined

export const defaultUniversity = (data: any, universities?: University[]) => {
  if (data && universities) {
    const beforeId = data?.university_id

    const filter = universities?.filter(
      (university: any) => university.value === beforeId
    )[0]

    if (filter)
      return {
        label: filter.label,
        value: beforeId
      }
  }
}

const StudentForm = ({ beforeData }: StudentFormProps) => {
  const [
    {
      showCampus,
      showCourse,
      showSemester,
      showWays,
      showReceipt,
      showSubmit,
      showAr
    },
    setAnimations
  ] = useState(initialAnimations)
  const [
    { selectedUniversity, campus, courses, universities },
    setFormState
  ] = useState<FormState>(initialFormState)
  const storeUniversities = useSelector<RootState, UniversitiesState>(
    state => state.universities
  )
  const { emails } = useSelector<RootState, UserState>(state => state.user)
  const registerEmailRef = useRef<RegisterEmailMethods>(null)
  const popupRef = useRef<PopupMethods>(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const onUniversityChange = async ({ value: id }: Option) => {
    setAnimations(prev => ({
      ...prev,
      showCampus: true,
      showAr: !haveInstitutionalEmail(selectedUniversity?.email.student, emails)
    }))

    const { campus } = await api.get(`university/${id}/campus`)

    setFormState(prev => ({
      ...prev,
      selectedUniversity: universities?.find(
        (university: University) => university.value === id
      ),
      campus: campus.map(
        (campus: any): Option => ({
          value: campus.campus_id,
          label: campus.name
        })
      )
    }))
  }

  const onCampusChange = async ({ value: id }: Option) => {
    setAnimations(prev => ({ ...prev, showCourse: true }))

    const { courses } = await api.get(`/university/campus/${id}/course`)

    setFormState(prev => ({
      ...prev,
      courses: courses.map(
        (course: any): Option => ({
          value: course.course_id,
          label: course.name
        })
      )
    }))
  }

  const onSemesterChange = () => {
    haveInstitutionalEmail(selectedUniversity?.email.student, emails)
      ? setAnimations(prev => ({ ...prev, showSubmit: true }))
      : setAnimations(prev => ({ ...prev, showWays: true }))
  }

  const onRegisterSuccess = () => {
    setAnimations(prev => ({
      ...prev,
      showSubmit: true,
      showWays: false
    }))
  }

  const onEmailClick = () => {
    setAnimations(prev => ({
      ...prev,
      showReceipt: false,
      showSubmit: false
    }))

    registerEmailRef.current?.toggleRegister()
  }

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      showReceipt
        ? popupRef.current?.configPopup({
            setModal: true,
            type: 'success',
            message: 'Solicitação enviada, aguarde a resposta de um moderador.',
            onClick: () => history.push('/session/profile/change-role')
          })
        : popupRef.current?.configPopup({
            setModal: true,
            type: 'success',
            message: 'Papel adicionado!',
            onClick: () => {
              dispatch(getUser())
              dispatch(UserActions.update({ selectedRole: 'student' }))
              history.push('/session/main')
            }
          })
    else
      popupRef.current?.configPopup({
        setModal: true,
        type: 'error',
        message: 'Falha ao enviar solicitação :('
      })
  }

  const formSchema = () => {
    return showReceipt
      ? receiptSchema(
          selectedUniversity ? selectedUniversity.register.student : ''
        )
      : emailSchema(
          selectedUniversity ? selectedUniversity.register.student : ''
        )
  }

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    dispatch(getUniversities(storeUniversities))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setFormState(prev => ({
      ...prev,
      universities: storeUniversities.universities
        ? storeUniversities.universities.map(
            (university: any): University => ({
              value: university.university_id,
              label: university.name,
              email: university.regex.email,
              register: university.regex.register
            })
          )
        : undefined
    }))
  }, [storeUniversities])

  return (
    <>
      <Form
        loading
        path='user/role/request/student'
        afterResData={afterSubmit}
        schema={formSchema()}
      >
        <Select
          name='university_id'
          placeholder='Universidade'
          options={formatterToSelect(universities)}
          onChange={onUniversityChange}
          defaultValue={defaultUniversity(beforeData, universities)}
        />

        <Presence condition={showAr}>
          <motion.div animate='enter' id='ar' variants={show}>
            <Text name='academic_register' placeholder='Registro Acadêmico' />
          </motion.div>
        </Presence>

        <Presence condition={showCampus}>
          <MotionSelect
            animate='enter'
            name='campus_id'
            placeholder='Câmpus'
            variants={show}
            options={campus}
            onChange={onCampusChange}
          />
        </Presence>

        <Presence condition={showCourse}>
          <MotionSelect
            animate='enter'
            name='course_id'
            placeholder='Curso'
            variants={show}
            options={courses}
            onChange={() =>
              setAnimations(prev => ({ ...prev, showSemester: true }))
            }
          />
        </Presence>

        <Presence condition={showSemester}>
          <MotionSelect
            animate='enter'
            name='semester'
            placeholder='Semestre'
            variants={show}
            options={semesterOptions}
            onChange={onSemesterChange}
          />
        </Presence>

        <Presence condition={showWays}>
          <MotionWays animate='enter' exit='exit' variants={show}>
            <span id='title'>Forma de registro</span>

            <div>
              <button type='button' onClick={onEmailClick}>
                E-mail institucional
              </button>

              <button
                type='button'
                onClick={() =>
                  setAnimations(prev => ({ ...prev, showReceipt: true }))
                }
              >
                Enviar comprovante
              </button>
            </div>
          </MotionWays>
        </Presence>

        <Presence condition={showReceipt}>
          <MotionReceipt exit='exit' animate='enter' variants={show}>
            <div id='warning'>
              <p>
                <AlertIcon />
                Este processo é mais lento pois requer confirmação de um{' '}
                <b id='moderator'>Moderador</b> de sua universidade. O formato
                do arquivo deve ser <b>PDF</b>.
              </p>
            </div>

            <File
              guides
              name='voucher'
              bottom='50vh'
              tranlateY='50%'
              bgHeight='200vh'
              accept='application/pdf'
              label='Enviar comprovante'
              noCropper={true}
              onChange={() =>
                setAnimations(prev => ({ ...prev, showSubmit: true }))
              }
            />
          </MotionReceipt>
        </Presence>

        <Presence condition={showSubmit}>
          <MotionSubmit
            initial='exit'
            animate='enter'
            exit='exit'
            variants={show}
          >
            Enviar solicitação
          </MotionSubmit>
        </Presence>
      </Form>

      <button
        id='delete'
        type='button'
        onClick={async () => {
          if (selectedUniversity) {
            const rgx = new RegExp(selectedUniversity.email.student)

            const teste = emails.filter(({ address }) => rgx.test(address))

            if (teste[0].email_id)
              await api.delete(`user/email/${teste[0].email_id}`)
          }
        }}
      >
        Deletar
      </button>

      <RegisterEmail
        placeholder='E-mail institucional'
        ref={registerEmailRef}
        title={selectedUniversity?.label}
        regex={selectedUniversity?.email.student}
        addData={{ university_id: selectedUniversity?.value }}
        onSuccess={onRegisterSuccess}
        modal={{
          translateY: '50%',
          bottom: '50vh'
        }}
      />

      <Popup bottom='50vh' translateY='50%' ref={popupRef} />
    </>
  )
}

export default StudentForm
