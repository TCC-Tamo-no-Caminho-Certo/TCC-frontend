import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form, MotionReceipt, MotionWays } from './styles'

import Container from '../Container'
import { AddRoleContext } from '../../index'

import {
  emailSchema,
  receiptSchema
} from 'utils/validations/addRoleForms/student'

import api from 'services/api'

import { getUser, UserActions, UserState } from 'store/user'
import { Response, RootState } from 'store'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File, Select, Submit, Text } from 'components/Form'
import { Option } from 'components/Form/Select'
import Popup, { PopupMethods } from 'components/Popup'
import Presence from 'components/Presence'
import RegisterEmail, { RegisterEmailMethods } from 'components/RegisterEmail'

import { motion, Variants } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

interface FormState {
  campus: SelectOptions
  courses: SelectOptions
  haveInstEmail: boolean
  universities: Universities
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

type SelectOptions = Option[] | undefined
type Universities = University[] | undefined

const MotionSelect = motion.custom(Select)
const MotionSubmit = motion.custom(Submit)

const initialFormState: FormState = {
  selectedUniversity: undefined,
  campus: undefined,
  courses: undefined,
  universities: undefined,
  haveInstEmail: false
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

export const formatterToSelect = (array: Universities) => {
  return array
    ? array.map((university: University) => ({
        value: university.value,
        label: university.label
      }))
    : undefined
}

const StudentForm = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const registerEmailRef = useRef<RegisterEmailMethods>(null)
  const popupRef = useRef<PopupMethods>(null)
  const { rolesHeight } = useContext(AddRoleContext)
  const user = useSelector<RootState, UserState>(state => state.user)
  const history = useHistory()
  const [
    { selectedUniversity, campus, courses, universities },
    setFormState
  ] = useState<FormState>(initialFormState)
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

  const takeBgHeight = () => {
    const height = containerRef.current?.offsetHeight

    if (height) return `calc(${rolesHeight}px + ${height}px + 48px)`
    else return `calc(${rolesHeight}px + 100vh)`
  }

  const setShowSubmitTrue = () =>
    setAnimations(prev => ({ ...prev, showSubmit: true, showWays: false }))

  const verifyInstitucionalEmail = () => {
    if (selectedUniversity) {
      const regex = new RegExp(selectedUniversity.email.student)

      const instEmails = user.emails.filter(({ address }) =>
        regex.test(address)
      )

      setFormState(prev => ({
        ...prev,
        haveInstEmail: instEmails.length !== 0
      }))

      return instEmails.length !== 0
    }
  }

  const setUniversitiesData = async () => {
    const { universities } = await api.get('/universities')

    setFormState(prev => ({
      ...prev,
      universities: universities
        ? universities.map(
            (university: any): University => ({
              value: university.university_id,
              label: university.name,
              email: university.regex.email,
              register: university.regex.register
            })
          )
        : undefined
    }))
  }

  const setCampusData = async (id: number) => {
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

  const setCoursesData = async (id: number) => {
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

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    setUniversitiesData()
  }, [])

  return (
    <>
      <Container role='student' ref={containerRef}>
        <Form
          loading
          path='user/role/request/student'
          afterResData={afterSubmit}
          schema={
            showReceipt
              ? receiptSchema(
                  selectedUniversity ? selectedUniversity.register.student : ''
                )
              : emailSchema(
                  selectedUniversity ? selectedUniversity.register.student : ''
                )
          }
        >
          <Select
            name='university_id'
            placeholder='Universidade'
            options={formatterToSelect(universities)}
            onChange={(e: Option) => {
              setAnimations(prev => ({
                ...prev,
                showCampus: true,
                showAr: !verifyInstitucionalEmail()
              }))

              setCampusData(e.value as number)
            }}
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
              onChange={(e: Option) => {
                setAnimations(prev => ({ ...prev, showCourse: true }))
                setCoursesData(e.value as number)
              }}
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
              onChange={() =>
                verifyInstitucionalEmail()
                  ? setAnimations(prev => ({ ...prev, showSubmit: true }))
                  : setAnimations(prev => ({ ...prev, showWays: true }))
              }
            />
          </Presence>

          <Presence condition={showWays}>
            <MotionWays animate='enter' exit='exit' variants={show}>
              <span id='title'>Forma de registro</span>

              <div>
                <button
                  type='button'
                  onClick={() => {
                    setAnimations(prev => ({
                      ...prev,
                      showReceipt: false,
                      showSubmit: false
                    }))

                    registerEmailRef.current?.toggleRegister()
                  }}
                >
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

        {/* <button
          id='delete'
          type='button'
          onClick={async () => {
            if (selectedUniversity) {
              const rgx = new RegExp(selectedUniversity.email.student)

              const teste = user.emails.filter(({ address }) =>
                rgx.test(address)
              )

              if (teste[0].email_id)
                await api.delete(`user/email/${teste[0].email_id}`)
            }
          }}
        >
          Deletar
        </button> */}
      </Container>

      <RegisterEmail
        placeholder='E-mail institucional'
        ref={registerEmailRef}
        onSuccess={setShowSubmitTrue}
        title={selectedUniversity?.label}
        regex={selectedUniversity?.email.student}
        addData={{ university_id: selectedUniversity?.value }}
        modal={{
          translateY: '50%',
          bottom: '50vh',
          bgHeight: `calc(${rolesHeight}px + 100vh)`
        }}
      />

      <Popup
        bottom='50vh'
        translateY='50%'
        bgHeight={takeBgHeight()}
        ref={popupRef}
      />
    </>
  )
}

export default StudentForm
