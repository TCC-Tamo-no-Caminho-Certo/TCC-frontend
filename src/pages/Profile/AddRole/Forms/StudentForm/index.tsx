import React, { useEffect, useRef, useState } from 'react'
import Form, { EmailModal } from './styles'

import Container from '../Container'

import api from 'services/api'

import AlertIcon from 'assets/Inputs/AlertIcon'
import CloseIcon from 'assets/Inputs/CloseIcon'

import { File, Select, Submit, Text } from 'components/Form'
import Modal, { ModalMethods } from 'components/Modal'

import {
  AnimatePresence,
  motion,
  Transition,
  useCycle,
  Variants
} from 'framer-motion'

interface Option {
  value: number | string
  label: string
}

interface Res {
  value: string
  id: number
}

type SelectOptions = Option[] | undefined
type ResData = Res[] | undefined

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

const StudentForm = () => {
  const emailModalRef = useRef<ModalMethods>(null)

  const [universitiesResData, setUniversity] = useState<ResData>()
  const [campusResData, setCampus] = useState<ResData>()
  const [coursesResData, setCourse] = useState<ResData>()

  const [showCampus, toggleCampus] = useCycle(false, true)
  const [showCourse, toggleCourse] = useCycle(false, true)
  const [showSemester, toggleSemester] = useCycle(false, true)
  const [showWays, toggleWays] = useCycle(false, true)
  const [showReceipt, toggleReceipt] = useCycle(false, true)
  const [showSubmit, toggleSubmit] = useState(false)

  const formatterToSelect = (array: ResData): SelectOptions =>
    array?.map(element => ({
      value: element.id,
      label: element.value
    }))

  const setUniversitiesData = async () => {
    const { universities } = await api.get('/universities')

    setUniversity(
      universities.map(
        (university: any): Res => ({
          value: university.name,
          id: university.university_id
        })
      )
    )
  }

  const setCampusData = async (id: number) => {
    const { campus } = await api.get(`university/${id}/campus`)

    setCampus(
      campus.map(
        (campus: any): Res => ({
          value: campus.name,
          id: campus.campus_id
        })
      )
    )
  }

  const setCoursesData = async (id: number) => {
    const { courses } = await api.get(`/university/campus/${id}/course`)

    setCourse(
      courses.map(
        (course: any): Res => ({
          value: course,
          id: course
        })
      )
    )
  }

  useEffect(() => {
    setUniversitiesData()
  }, [])

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
  }, [])

  return (
    <>
      <Container role='student'>
        <Form
          loading
          path='user/addRole/student'
          getData={e => console.log(e)}
          addData={{ role: 'student' }}
        >
          <Select
            name='university'
            placeholder='Universidade'
            options={formatterToSelect(universitiesResData)}
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
                  options={formatterToSelect(campusResData)}
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
                  options={formatterToSelect(coursesResData)}
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
                  onChange={() => toggleWays()}
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
                      toggleReceipt()
                      toggleSubmit(false)
                      emailModalRef.current?.toggleModal()
                    }}
                  >
                    E-mail institucional
                  </button>

                  <button type='button' onClick={() => toggleReceipt()}>
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
                variants={show}
                exit='exit'
                animate='enter'
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
                  name='receipt'
                  label='Enviar comprovante'
                  onClick={() => toggleSubmit(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showSubmit && (
              <motion.div variants={show} animate='enter' exit='exit'>
                <Submit id='submit'>Enviar solicitação</Submit>
              </motion.div>
            )}
          </AnimatePresence>
        </Form>
      </Container>

      <Modal ref={emailModalRef}>
        <EmailModal>
          <CloseIcon onClick={() => emailModalRef.current?.toggleModal()} />

          <Form path='user/email'>
            <Text placeholder='E-mail Institucional' />
          </Form>
        </EmailModal>
      </Modal>
    </>
  )
}

export default StudentForm
