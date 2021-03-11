import React, { useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import Container from '../Container'
import RegisterEmail, {
  RegisterEmailMethods,
  University
} from '../RegisterEmail'

import { studentEmailRegex } from 'utils/validations/regex'

import api from 'services/api'

import { UserState } from 'store/user'
import { RootState } from 'store'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File, Select, Submit } from 'components/Form'

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

type Universities = University[] | undefined
type SelectOptions = Option[] | undefined

const semesterOptions: SelectOptions = [
  { value: 'first', label: '1° Semestre' },
  { value: 'second', label: '2° Semestre' },
  { value: 'third', label: '3° Semestre' },
  { value: 'room', label: '4° Semestre' },
  { value: 'fifth', label: '5° Semestre' },
  { value: 'sixth', label: '6° Semestre' },
  { value: 'seventh', label: '7° Semestre' },
  { value: 'eighth', label: '8° Semestre' },
  { value: 'ninth', label: '9° Semestre' },
  { value: 'tenth', label: '10° Semestre' }
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

const StudentForm = () => {
  const registerEmailRef = useRef<RegisterEmailMethods>(null)
  const user = useSelector<RootState, UserState>(state => state.user)

  const [selectedUniversity, setSelectedUniversity] = useState<University>()
  const [universities, setUniversities] = useState<Universities>()

  const [campus, setCampus] = useState<SelectOptions>()
  const [courses, setCourses] = useState<SelectOptions>()

  const [showCampus, toggleCampus] = useCycle(false, true)
  const [showCourse, toggleCourse] = useCycle(false, true)
  const [showSemester, toggleSemester] = useCycle(false, true)
  const [showWays, toggleWays] = useCycle(false, true)
  const [showReceipt, setShowReceipt] = useState(false)
  const [showSubmit, toggleSubmit] = useState(false)
  const setUniversitiesData = async () => {
    const { universities } = await api.get('/universities')

    setUniversities(
      universities.map(
        (university: any): University => ({
          value: university.university_id,
          label: university.name,
          studentRegex: university.student_regex,
          professorRegex: university.professor_regex
        })
      )
    )
  }

  const setCampusData = async (id: number) => {
    const { campus } = await api.get(`university/${id}/campus`)

    setSelectedUniversity(
      universities?.find((university: University) => university.value === id)
    )

    setCampus(
      campus.map(
        (campus: any): Option => ({
          value: campus.campus_id,
          label: campus.name
        })
      )
    )
  }

  const setCoursesData = async (id: number) => {
    const { courses } = await api.get(`/university/campus/${id}/course`)

    setCourses(
      courses.map(
        (course: any): Option => ({
          label: course,
          value: course
        })
      )
    )
  }

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    setUniversitiesData()
  }, [])

  return (
    <Container role='student'>
      <Form loading path='user/addRole/student' addData={{ role: 'student' }}>
        <Select
          name='university'
          placeholder='Universidade'
          options={formatterToSelect(universities)}
          onChange={(e: Option) => {
            toggleCampus()
            setCampusData(e.value as number)
          }}
        />

        <AnimatePresence>
          {showCampus && (
            <motion.div animate='enter' variants={show}>
              <Select
                name='campus'
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
                name='course'
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
                  studentEmailRegex.test(user.email[0].address)
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
                name='receipt'
                label='Enviar comprovante'
                noCropper={true}
                onClick={() => toggleSubmit(true)}
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
  )
}

export default StudentForm
