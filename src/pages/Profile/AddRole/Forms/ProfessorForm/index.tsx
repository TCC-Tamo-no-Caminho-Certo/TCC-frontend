import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import { ContainerContext } from '../Container'
import { Voucher, Ways } from '../Student/styles'
import { hasInstitutionalEmail, show } from '../Student'

import {
  emailSchema,
  voucherSchema
} from 'utils/validations/addRoleForms/student'

import api from 'services/api'

import { getUser, UserActions, UserState } from 'store/user'
import { Response, RootState } from 'store'
import { University } from 'store/AsyncThunks/universities'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { Checkbox, File, Select, Submit, Text } from 'components/Form'
import { Option } from 'components/Form/Select'
import Popup, { PopupMethods } from 'components/Popup'
import Presence from 'components/Presence'
import RegisterEmail, { RegisterEmailMethods } from 'components/RegisterEmail'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

interface Options {
  campus: Option[]
  course: Option[]
  university: Option[]
}

interface Animations {
  ar: boolean
  ways: boolean
  campus: boolean
  course: boolean
  submit: boolean
  voucher: boolean
}

const ProfessorForm = () => {
  const user = useSelector<RootState, UserState>(state => state.user)
  const { storeUniversities, storeCourses } = useContext(ContainerContext)

  const registerEmailRef = useRef<RegisterEmailMethods>(null)
  const popupRef = useRef<PopupMethods>(null)

  const [options, setOptions] = useState<Options>({
    university: storeUniversities.map(university => ({
      label: university.name,
      value: university.university_id
    })),
    campus: [],
    course: storeCourses.map(course => ({
      label: course.name,
      value: course.course_id
    }))
  })

  const [animations, setAnimations] = useState<Animations>({
    ar: true,
    ways: false,
    campus: false,
    course: false,
    submit: false,
    voucher: false
  })

  const [university, setUniversity] = useState<University>({
    name: '',
    regex: {
      email: { professor: '', student: '' },
      register: { professor: '', student: '' }
    },
    university_id: 0
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const onUniversityChange = async (selected: Option) => {
    const { campus } = await api.get(`university/${selected.value}/campus`)

    const selectedUniversity = storeUniversities.find(
      university => university.university_id === selected.value
    )

    selectedUniversity && setUniversity(selectedUniversity)

    setOptions(prev => ({
      ...prev,
      campus: campus.map(
        (campus: any): Option => ({
          value: campus.campus_id,
          label: campus.name
        })
      )
    }))

    setAnimations(prev => ({
      ...prev,
      campus: true,
      ar: !hasInstitutionalEmail(university.regex.email.student, user.emails)
    }))
  }

  const onCampusChange = async (selected: Option) => {
    const { courses } = await api.get(
      `/university/campus/${selected.value}/course`
    )

    setOptions(prev => ({
      ...prev,
      course: courses.map(
        (course: any): Option => ({
          value: course.course_id,
          label: course.name
        })
      )
    }))

    setAnimations(prev => ({ ...prev, course: true }))
  }

  const onRegisterSuccess = () => {
    setAnimations(prev => ({
      ...prev,
      submit: true,
      ways: false
    }))
  }

  const onEmailClick = () => {
    setAnimations(prev => ({
      ...prev,
      receipt: false,
      submit: false
    }))

    registerEmailRef.current?.toggleRegister()
  }

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      animations.voucher
        ? popupRef.current?.configPopup({
            setModal: true,
            type: 'success',
            message: 'Solicitação enviada, aguarde a resposta de um moderador.',
            onClick: () => history.push('/session/main')
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
    return animations.voucher
      ? voucherSchema(university ? university.regex.register.student : '')
      : emailSchema(university ? university.regex.register.student : '')
  }

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Form
        loading
        path='user/role/request/student'
        schema={formSchema()}
        afterResData={afterSubmit}
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
          options={options.university}
          onChange={onUniversityChange}
        />

        <Presence
          id='ar'
          animate='enter'
          variants={show}
          condition={animations.ar}
        >
          <Text name='register' placeholder='Registro Acadêmico' />
        </Presence>

        <Presence animate='enter' variants={show} condition={animations.campus}>
          <Select
            name='campus_id'
            placeholder='Câmpus'
            options={options.campus}
            onChange={onCampusChange}
          />
        </Presence>

        <Presence animate='enter' variants={show} condition={animations.course}>
          <Select
            name='course_id'
            placeholder='Curso com maior carga horária'
            options={options.course}
            onChange={() => setAnimations(prev => ({ ...prev, ways: true }))}
          />
        </Presence>

        <Presence
          exit='exit'
          animate='enter'
          variants={show}
          condition={animations.ways}
        >
          <Ways>
            <span id='title'>Forma de registro</span>

            <div>
              <button type='button' onClick={onEmailClick}>
                E-mail institucional
              </button>

              <button
                type='button'
                onClick={() =>
                  setAnimations(prev => ({ ...prev, voucher: true }))
                }
              >
                Enviar comprovante
              </button>
            </div>
          </Ways>
        </Presence>

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
                setAnimations(prev => ({ ...prev, submit: true }))
              }
            />
          </Voucher>
        </Presence>

        <Checkbox
          name='postgraduate'
          label='Você leciona na Pós-Graduação (Stricto Sensu)?'
        />

        <Checkbox name='full_time' label='Sou professor em tempo integral' />

        <Presence
          exit='exit'
          initial='exit'
          animate='enter'
          variants={show}
          condition={animations.submit}
        >
          <Submit>Enviar solicitação</Submit>
        </Presence>
      </Form>

      <button
        id='delete'
        type='button'
        onClick={async () => {
          if (university) {
            const rgx = new RegExp(university.regex.email.student)

            const teste = user.emails.filter(({ address }) => rgx.test(address))

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
        title={university.name}
        onSuccess={onRegisterSuccess}
        regex={university.regex.email.student}
        addData={{ university_id: university.university_id }}
        modal={{
          translateY: '50%',
          bottom: '50vh'
        }}
      />

      <Popup bottom='50vh' translateY='50%' ref={popupRef} />
    </>
  )
}

export default ProfessorForm
