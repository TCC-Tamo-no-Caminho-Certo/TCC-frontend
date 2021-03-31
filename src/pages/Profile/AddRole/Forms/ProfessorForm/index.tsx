import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import { MotionReceipt, MotionWays } from '../StudentForm/styles'
import Container from '../Container'
import { AddRoleContext } from '../../index'
import { formatterToSelect, show, University } from '../StudentForm'

import {
  emailSchema,
  receiptSchema
} from 'utils/validations/addRoleForms/professor'

import api from 'services/api'

import { getUser, UserState } from 'store/user'
import { RootState } from 'store'

import AlertIcon from 'assets/Inputs/AlertIcon'

import RegisterEmail, { RegisterEmailMethods } from 'components/RegisterEmail'
import { Checkbox, File, Select, Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

interface Option {
  value: number | string
  label: string
}

interface FormState {
  campus: SelectOptions
  courses: SelectOptions
  haveInstEmail: boolean
  universities: Universities
  selectedUniversity: University | undefined
}

interface AnimationsState {
  showCampus: boolean
  showCourse: boolean
  showSemester: boolean
  showWays: boolean
  showReceipt: boolean
  showSubmit: boolean
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
  showSubmit: false
}

const ProfessorForm = () => {
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
    { showCampus, showCourse, showWays, showReceipt, showSubmit },
    setAnimations
  ] = useState(initialAnimations)

  const setShowSubmitTrue = () =>
    setAnimations(prev => ({ ...prev, showSubmit: true, showWays: false }))

  const setUniversitiesData = async () => {
    const { universities } = await api.get('/universities')

    setFormState(prev => ({
      ...prev,
      universities: universities.map(
        (university: any): University => ({
          value: university.university_id,
          label: university.name,
          email: university.regex.email,
          register: university.regex.register
        })
      )
    }))
  }

  const setCampusData = async (id: number) => {
    const { campus } = await api.get(`university/${id}/campus`)

    const newSelectedUniversity = universities?.find(
      (university: University) => university.value === id
    )

    setFormState(prev => ({
      ...prev,
      selectedUniversity: newSelectedUniversity,
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

  const verifyInstitucionalEmail = () => {
    if (selectedUniversity) {
      const rgx = new RegExp(selectedUniversity.email.professor)
      const instEmails = user.emails.filter(({ address }) => rgx.test(address))

      setFormState(prev => ({
        ...prev,
        haveInstEmail: instEmails.length !== 0
      }))

      return instEmails.length !== 0
    }
  }

  const onSubmit = (res: any) => {
    if (res.success)
      if (showReceipt)
        popupRef.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Solicitação enviada',
          onClick: () =>
            setAnimations(prev => ({ ...prev, showRequestStatus: true }))
        })
      else {
        popupRef.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Papel adicionado',
          onClick: () => history.push('/session/main')
        })

        dispatch(getUser())
      }
    else
      popupRef.current?.configPopup({
        setModal: true,
        type: 'error',
        message: 'Falha ao enviar solicitação'
      })
  }

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    setUniversitiesData()
  }, [])

  return (
    <>
      <Container role='professor'>
        <Form
          loading
          path='user/role/request/professor'
          afterResData={onSubmit}
          schema={
            showReceipt
              ? receiptSchema(
                  selectedUniversity
                    ? selectedUniversity.register.professor
                    : ''
                )
              : emailSchema(
                  selectedUniversity
                    ? selectedUniversity.register.professor
                    : ''
                )
          }
        >
          <Text
            optional
            name='lattes'
            placeholder='Link para: Currículo Lattes'
          />

          <Text optional name='linkedin' placeholder='Link para: Linkedin' />

          <Text optional name='orcid' placeholder='Link para: ORCID' />

          <Select
            name='university_id'
            placeholder='Universidade'
            options={formatterToSelect(universities)}
            onChange={(e: Option) => {
              setAnimations(prev => ({ ...prev, showCampus: true }))
              setCampusData(e.value as number)
            }}
          />

          <Text name='register' placeholder='Registro Acadêmico' />

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
              placeholder='Curso com maior carga horária'
              variants={show}
              options={courses}
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
            <MotionReceipt animate='enter' exit='exit' variants={show}>
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

          <Checkbox name='postgraduate' label='Fiz pós-graduação' />

          <Checkbox name='full_time' label='Sou professor em tempo integral' />

          <Presence condition={showSubmit}>
            <MotionSubmit
              exit='exit'
              initial='exit'
              animate='enter'
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
              const rgx = new RegExp(selectedUniversity.email.professor)

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
        regex={selectedUniversity?.email.professor}
        addData={{ university_id: selectedUniversity?.value }}
        modal={{
          bottom: '50vh',
          translateY: '50%',
          bgHeight: `calc(${rolesHeight}px + 100vh)`
        }}
      />

      <Popup
        bottom='50vh'
        translateY='50%'
        bgHeight={`calc(${rolesHeight}px + 100vh)`}
        ref={popupRef}
      />
    </>
  )
}

export default ProfessorForm
