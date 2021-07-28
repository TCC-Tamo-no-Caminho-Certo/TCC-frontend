import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Form } from './styles'

import { Voucher, Ways } from '../Student/styles'
import { Request } from '../Container'
import { hasInstitutionalEmail, show } from '../Student'
import { AddRoleContext } from '../../index'

import {
  emailSchema,
  voucherSchema
} from 'utils/validations/addRoleForms/professor'

import api from 'services/api'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { Checkbox, File, Select, Submit, Text } from 'components/Form'
import { Option } from 'components/Form/Select'
import Presence from 'components/Presence'
import RegisterEmail, { RegisterEmailMethods } from 'components/RegisterEmail'

import { UniversityType } from 'types/Responses/university'
import { EmailsType } from 'types/Responses/user/emails'

import { GlobalContext } from 'App'
import { useHistory } from 'react-router'

interface Data {
  orcid: string
  lattes: string
  linkedin: string
  register: string
  campus_id: number
  course_id: number
  full_time: boolean
  postgraduate: boolean
  university_id: number
}

interface Options {
  campus: Option[]
  course: Option[]
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
}

interface ProfessorProps {
  request?: Request<Data>
}

function Professor({ request }: ProfessorProps) {
  const { popupRef } = useContext(GlobalContext)
  const { courses, universities } = useContext(AddRoleContext)

  const [registerByEmail, setRegisterByEmail] = useState(false)

  const registerEmailRef = useRef<RegisterEmailMethods>(null)
  const [userEmails, setUserEmails] = useState<EmailsType>()

  useEffect(() => {
    ;(async () => {
      const emails: EmailsType = await api.get('user/emails')
      setUserEmails(emails)
    })()
  }, [])

  const [selectedUniversity, setSelectedUniversity] = useState<UniversityType>({
    name: '',
    regex: {
      email: { professor: '', student: '' },
      register: { professor: '', student: '' }
    },
    id: 0
  })
  const [animations, setAnimations] = useState<Animations>({
    campus: false,
    ar: false,
    course: false,
    ways: false,
    submit: false,
    voucher: false
  })
  const [options, setOptions] = useState<Options>({
    campus: [],
    course: [],
    university: []
  })
  const [values, setValues] = useState<Values>({
    university: undefined,
    campus: undefined,
    course: undefined
  })

  const history = useHistory()

  const registerRegex = universities.find(
    ({ id }) => id === values.university?.value
  )?.regex.register.professor

  const setInitialCampusOptions = useCallback(async () => {
    if (request) {
      const response = await api.get(
        `university/${request?.data.university_id}/campus`
      )

      if (response.campus) {
        const campus = response.campus.map((campus: any) => ({
          label: campus.name,
          value: campus.campus_id
        }))

        setOptions(prev => ({
          ...prev,
          campus
        }))

        return campus
      }
    }
  }, [request])

  const onUniversityChange = async (selected: Option) => {
    if (values.university !== selected) {
      const { campus } = await api.get(`university/${selected.value}/campus`)

      setOptions(prev => ({
        ...prev,
        campus: campus.map(
          (campus: any): Option => ({
            value: campus.campus_id,
            label: campus.name
          })
        )
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

      setAnimations(prev => ({
        ...prev,
        campus: true,
        ar: true
      }))
    }
  }

  const onCampusChange = async (selected: Option) => {
    const { courses } = await api.get(
      `/university/campus/${selected.value}/course`
    )

    if (values.campus !== selected) {
      setOptions(prev => ({
        ...prev,
        course: courses.map(
          (course: any): Option => ({
            value: course.course_id,
            label: course.name
          })
        )
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

  const onCourseChange = (selected: Option) => {
    setValues(prev => ({ ...prev, course: selected }))

    if (!request)
      hasInstitutionalEmail(
        selectedUniversity.regex.email.professor,
        userEmails
      )
        ? setAnimations(prev => ({ ...prev, submit: true }))
        : setAnimations(prev => ({ ...prev, ways: true }))
  }

  const afterSubmit = (res: any) => {
    const byEmail =
      registerByEmail ||
      hasInstitutionalEmail(
        selectedUniversity.regex.email.professor,
        userEmails
      )

    if (res.success)
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
        setModal: true,
        type: 'error',
        message: 'Algo deu errado :('
      })
  }

  useEffect(() => {
    if (request)
      (async () => {
        const campusOptions: Option[] = await setInitialCampusOptions()

        setValues({
          university: options.university.find(
            ({ value }) => value === request.data.university_id
          ),
          campus: campusOptions.find(
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
          voucher: true
        })
      })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, setInitialCampusOptions])

  useEffect(() => {
    setOptions(prev => ({
      ...prev,
      university: universities.map(({ id, name }) => ({
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

  return (
    <>
      <Form
        loading
        afterResData={afterSubmit}
        method={request ? 'patch' : 'post'}
        path={
          request
            ? `user/role/request/professor/${request.request_id}`
            : 'user/role/request/professor'
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

        <Text
          optional
          name='orcid'
          placeholder='Link para: ORCID'
          defaultValue={request?.data.orcid}
        />

        <Select
          id='cy-university'
          name='university_id'
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
            placeholder='Curso com maior carga horária'
            value={values.course}
            options={options.course}
            onChange={onCourseChange}
          />
        </Presence>

        {!request && (
          <Presence
            exit='exit'
            animate='enter'
            variants={show}
            condition={animations.ways}
          >
            <Ways>
              <span id='title'>Forma de registro</span>

              <div>
                <button
                  id='cy-email'
                  type='button'
                  onClick={() => {
                    setAnimations(prev => ({
                      ...prev,
                      voucher: false,
                      submit: false
                    }))

                    registerEmailRef.current?.toggleRegister()
                  }}
                >
                  E-mail institucional
                </button>

                <button
                  id='cy-voucher'
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
        )}

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

        <Checkbox
          id='cy-postgraduate'
          name='postgraduate'
          label='Você leciona na Pós-Graduação (Stricto Sensu)?'
          defaultCheck={request?.data.postgraduate}
        />

        <Checkbox
          id='cy-full_time'
          name='full_time'
          label='Sou professor em tempo integral'
          defaultCheck={request?.data.full_time}
        />

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
          regex={selectedUniversity.regex.email.professor}
          addData={{ university_id: selectedUniversity.id }}
          modal={{
            translateY: '50%',
            bottom: '50vh'
          }}
          onSuccess={() => {
            setAnimations(prev => ({
              ...prev,
              submit: true,
              ways: false
            }))

            setRegisterByEmail(true)
          }}
        />
      )}
    </>
  )
}

export default Professor
