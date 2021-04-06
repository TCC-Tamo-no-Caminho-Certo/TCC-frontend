import React, { useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import { MotionReceipt, MotionWays } from '../StudentForm/styles'
import Container from '../Container'
import {
  formatterToSelect,
  haveInstitutionalEmail,
  show,
  University
} from '../StudentForm'

import {
  emailSchema,
  receiptSchema
} from 'utils/validations/addRoleForms/professor'

import api from 'services/api'

import { Response, RootState } from 'store'
import { getUser, UserState } from 'store/user'
import { getUniversities, UniversitiesState } from 'store/universities'

import AlertIcon from 'assets/Inputs/AlertIcon'

import RegisterEmail, { RegisterEmailMethods } from 'components/RegisterEmail'
import { Checkbox, File, Select, Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import Presence from 'components/Presence'
import { Option } from 'components/Form/Select'

import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

interface FormState {
  campus: Option[] | undefined
  courses: Option[] | undefined

  universities: University[] | undefined
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
  showSubmit: false
}

const MotionSelect = motion.custom(Select)
const MotionSubmit = motion.custom(Submit)

const ProfessorForm = () => {
  const [
    { selectedUniversity, campus, courses, universities },
    setFormState
  ] = useState<FormState>(initialFormState)
  const [
    { showCampus, showCourse, showWays, showReceipt, showSubmit },
    setAnimations
  ] = useState(initialAnimations)
  const storeUniversities = useSelector<RootState, UniversitiesState>(
    state => state.universities
  )
  const { emails } = useSelector<RootState, UserState>(state => state.user)
  const registerEmailRef = useRef<RegisterEmailMethods>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<PopupMethods>(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const onUniversityChange = async ({ value: id }: Option) => {
    setAnimations(prev => ({ ...prev, showCampus: true }))

    const { campus } = await api.get(`university/${id}/campus`)

    setFormState(prev => ({
      ...prev,
      selectedUniversity: universities?.find(
        (university: University) => university.value === id
      ),
      campus: campus
        ? campus.map(
            (campus: any): Option => ({
              value: campus.campus_id,
              label: campus.name
            })
          )
        : undefined
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

  const onSelectChange = () => {
    haveInstitutionalEmail(selectedUniversity?.email.professor, emails)
      ? setAnimations(prev => ({ ...prev, showSubmit: true }))
      : setAnimations(prev => ({ ...prev, showWays: true }))
  }

  const onEmailClick = () => {
    setAnimations(prev => ({
      ...prev,
      showReceipt: false,
      showSubmit: false
    }))

    registerEmailRef.current?.toggleRegister()
  }

  const onRegisterSuccess = () => {
    setAnimations(prev => ({
      ...prev,
      showSubmit: true,
      showWays: false
    }))
  }

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      if (showReceipt)
        popupRef.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Solicitação enviada, aguarde a resposta de um moderador.',
          onClick: () => history.push('/session/main')
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
        message: 'Falha ao enviar solicitação :('
      })
  }

  const formSchema = () => {
    return showReceipt
      ? receiptSchema(
          selectedUniversity ? selectedUniversity.register.professor : ''
        )
      : emailSchema(
          selectedUniversity ? selectedUniversity.register.professor : ''
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
      <Container ref={containerRef} role='professor'>
        <Form
          loading
          path='user/role/request/professor'
          afterResData={afterSubmit}
          schema={formSchema()}
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
            onChange={onUniversityChange}
          />

          <Text name='register' placeholder='Registro Acadêmico' />

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
              placeholder='Curso com maior carga horária'
              variants={show}
              options={courses}
              onChange={onSelectChange}
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

          <Checkbox
            name='postgraduate'
            label='Você leciona na Pós-Graduação (Stricto Sensu)?'
          />

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

        <button
          id='delete'
          type='button'
          onClick={async () => {
            if (selectedUniversity) {
              const rgx = new RegExp(selectedUniversity.email.professor)

              const teste = emails.filter(({ address }) => rgx.test(address))

              if (teste[0].email_id)
                await api.delete(`user/email/${teste[0].email_id}`)
            }
          }}
        >
          Deletar
        </button>
      </Container>

      <RegisterEmail
        placeholder='E-mail institucional'
        ref={registerEmailRef}
        title={selectedUniversity?.label}
        regex={selectedUniversity?.email.professor}
        addData={{ university_id: selectedUniversity?.value }}
        onSuccess={onRegisterSuccess}
        modal={{
          bottom: '50vh',
          translateY: '50%'
        }}
      />

      <Popup bottom='50vh' translateY='50%' ref={popupRef} />
    </>
  )
}

export default ProfessorForm
