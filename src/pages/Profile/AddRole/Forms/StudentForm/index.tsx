import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import Container from '../Container'
import RegisterEmail, {
  RegisterEmailMethods,
  University
} from '../RegisterEmail'
import { AddRoleContext } from '../../index'

import {
  emailSchema,
  receiptSchema
} from 'utils/validations/addRoleForms/student'

import api from 'services/api'

import { UserState } from 'store/user'
import { RootState } from 'store'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File, Select, Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'

import {
  AnimatePresence,
  motion,
  Transition,
  useCycle,
  Variants
} from 'framer-motion'
import { useSelector } from 'react-redux'

interface Option {
  value: number | string
  label: string
}

interface FormState {
  selectedUniversity: University | undefined
  campus: SelectOptions
  courses: SelectOptions
  universities: Universities
  haveInstEmail: boolean
}

type Universities = University[] | undefined
type SelectOptions = Option[] | undefined

const semesterOptions: SelectOptions = [
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

const transition: Transition = {
  duration: 0.3,
  type: 'tween'
}

const show: Variants = {
  enter: {
    x: [320, 0],
    opacity: [0, 1],
    transition
  },
  exit: {
    x: [0, 320],
    opacity: [1, 0],
    transition
  }
}

const formatterToSelect = (array: Universities) =>
  array?.map((university: University) => ({
    value: university.value,
    label: university.label
  }))

const initialFormState: FormState = {
  selectedUniversity: undefined,
  campus: undefined,
  courses: undefined,
  universities: undefined,
  haveInstEmail: false
}

const StudentForm = () => {
  const registerEmailRef = useRef<RegisterEmailMethods>(null)

  const popupRef = useRef<PopupMethods>(null)
  const { rolesHeight } = useContext(AddRoleContext)

  const user = useSelector<RootState, UserState>(state => state.user)

  const [
    { selectedUniversity, campus, courses, universities, haveInstEmail },
    setFormState
  ] = useState<FormState>(initialFormState)
  const [showCampus, toggleCampus] = useCycle(false, true)
  const [showCourse, toggleCourse] = useCycle(false, true)
  const [showSemester, toggleSemester] = useCycle(false, true)
  const [showWays, toggleWays] = useCycle(false, true)
  const [showReceipt, setShowReceipt] = useState(false)
  const [showSubmit, toggleSubmit] = useState(false)

  const setUniversitiesData = async () => {
    const { universities } = await api.get('/universities')

    const newUniversities = universities.map(
      (university: any): University => ({
        value: university.university_id,
        label: university.name,
        studentRegex: university.student_regex,
        professorRegex: university.professor_regex
      })
    )

    setFormState(prev => ({ ...prev, universities: newUniversities }))
  }

  const setCampusData = async (id: number) => {
    const { campus } = await api.get(`university/${id}/campus`)

    const newSelectedUniversity = universities?.find(
      (university: University) => university.value === id
    )

    const newCampus = campus.map(
      (campus: any): Option => ({
        value: campus.campus_id,
        label: campus.name
      })
    )

    setFormState(prev => ({
      ...prev,
      selectedUniversity: newSelectedUniversity,
      campus: newCampus
    }))
  }

  const setCoursesData = async (id: number) => {
    const { courses } = await api.get(`/university/campus/${id}/course`)

    const newCourses = courses.map(
      (course: any): Option => ({
        value: course.course_id,
        label: course.name
      })
    )

    setFormState(prev => ({
      ...prev,
      courses: newCourses
    }))
  }

  const verifyInstitucionalEmail = () => {
    if (selectedUniversity) {
      const rgx = new RegExp(selectedUniversity.studentRegex)

      const instEmails = user.email.filter(({ address }) => rgx.test(address))

      setFormState(prev => ({
        ...prev,
        haveInstEmail: instEmails.length !== 0
      }))

      return instEmails.length !== 0
    }

    throw new Error('University isnt selected')
  }

  const onStudentSubmit = (result: any) => {
    if (result.success)
      if (haveInstEmail)
        popupRef.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Papel adicionado'
        })
      else
        popupRef.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Solicitação enviada'
        })
    else
      popupRef.current?.configPopup({
        setModal: true,
        type: 'success',
        message: 'Falha ao enviar solicitação'
      })
  }

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    setUniversitiesData()
  }, [])

  return (
    <>
      <Container role='student'>
        <Form
          loading
          path='user/role/request/student'
          afterResData={res => onStudentSubmit(res)}
          schema={showReceipt ? receiptSchema : emailSchema}
        >
          <Select
            name='university_id'
            placeholder='Universidade'
            options={formatterToSelect(universities)}
            onChange={(e: Option) => {
              toggleCampus()
              setCampusData(e.value as number)
            }}
          />

          <Text name='ar' placeholder='Registro Acadêmico' />

          <AnimatePresence>
            {showCampus && (
              <motion.div animate='enter' variants={show}>
                <Select
                  name='campus_id'
                  placeholder='Câmpus'
                  options={campus}
                  onChange={(e: Option) => {
                    toggleCourse()
                    setCoursesData(e.value as number)
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showCourse && (
              <motion.div animate='enter' exit='exit' variants={show}>
                <Select
                  name='course_id'
                  placeholder='Curso'
                  options={courses}
                  onChange={() => toggleSemester()}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSemester && (
              <motion.div animate='enter' exit='exit' variants={show}>
                <Select
                  name='semester'
                  placeholder='Semestre'
                  options={semesterOptions}
                  onChange={() => {
                    !verifyInstitucionalEmail()
                      ? toggleSubmit(true)
                      : toggleWays()
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showWays && (
              <motion.div id='ways' animate='enter' variants={show}>
                <span id='label'>Forma de registro</span>

                <div id='buttons'>
                  <button
                    type='button'
                    onClick={() => {
                      setShowReceipt(false)
                      toggleSubmit(false)
                      registerEmailRef.current?.toggleRegister()
                    }}
                  >
                    E-mail institucional
                  </button>

                  <button type='button' onClick={() => setShowReceipt(true)}>
                    Enviar comprovante
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showReceipt && (
              <motion.div
                id='receipt'
                exit='exit'
                animate='enter'
                variants={show}
              >
                <div id='warning'>
                  <AlertIcon />

                  <div>
                    Este processo é mais lento pois requer confirmação de um{' '}
                    <b>Moderador</b> da sua universidade.
                  </div>
                </div>

                <File
                  guides
                  bgHeight='200vh'
                  bottom='50vh'
                  tranlateY='50%'
                  name='doc'
                  label='Enviar comprovante'
                  noCropper={true}
                  onChange={() => toggleSubmit(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSubmit && (
              <motion.div animate='enter' exit='exit' variants={show}>
                <Submit id='submit'>Enviar solicitação</Submit>
              </motion.div>
            )}
          </AnimatePresence>
        </Form>

        <RegisterEmail
          role='student'
          ref={registerEmailRef}
          universityData={selectedUniversity}
        />
      </Container>

      <Popup
        translateY='50%'
        bottom='50vh'
        bgHeight={`calc(${rolesHeight}px + 100vh)`}
        ref={popupRef}
      />
    </>
  )
}

export default StudentForm
