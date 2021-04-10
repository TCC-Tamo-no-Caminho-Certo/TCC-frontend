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
import { show } from '../Student'
import { AddRoleContext } from '../../index'

import {
  emailSchema,
  voucherSchema
} from 'utils/validations/addRoleForms/professor'

import api from 'services/api'

import { Response } from 'store'
import { University } from 'store/AsyncThunks/universities'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { Checkbox, File, Select, Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import { Option } from 'components/Form/Select'
import Presence from 'components/Presence'
import RegisterEmail, { RegisterEmailMethods } from 'components/RegisterEmail'

import { useHistory } from 'react-router'

interface Data {
  orcid: string
  lattes: string
  linkedin: string
  register: string
  campus_id: number
  course_id: number
  university_id: number
  postgraduate: boolean
}

interface Options {
  campus: Option[]
  course: Option[]
  university: Option[]
}

interface Values {
  university: Option | null | undefined
  course: Option | null | undefined
  campus: Option | null | undefined
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
  const { courses, universities } = useContext(AddRoleContext)

  const popupRef = useRef<PopupMethods>(null)
  const registerEmailRef = useRef<RegisterEmailMethods>(null)

  const [options, setOptions] = useState<Options>({
    university: universities.map(university => ({
      label: university.name,
      value: university.university_id
    })),
    campus: [],
    course: courses.map(course => ({
      label: course.name,
      value: course.course_id
    }))
  })

  const [values, setValues] = useState<Values>({
    university: undefined,
    campus: undefined,
    course: undefined
  })

  const [animations, setAnimations] = useState<Animations>({
    campus: false,
    course: false,
    ways: false,
    submit: false,
    ar: false,
    voucher: false
  })

  const [selectedUniversity, setSelectedUniversity] = useState<University>({
    name: '',
    regex: {
      email: { professor: '', student: '' },
      register: { professor: '', student: '' }
    },
    university_id: 0
  })

  const history = useHistory()

  const registerRegex = universities.find(
    university => university.university_id === values.university?.value
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
        university: selected,
        campus: null,
        course: null
      }))

      if (!request) {
        const newSelected = universities.find(
          university => university.university_id === selected.value
        )

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
        course: prev.campus ? null : prev.course
      }))

      setAnimations(prev => ({
        ...prev,
        course: true
      }))
    }
  }

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      popupRef.current?.configPopup({
        setModal: true,
        type: 'success',
        message: request ? 'Solicitação reenviada!' : 'Solicitação enviada!',
        onClick: () => history.go(0)
      })
    else
      popupRef.current?.configPopup({
        setModal: true,
        type: 'error',
        message: 'Algo deu errado :('
      })
  }

  useEffect(() => {
    if (request)
      (async () => {
        const campusOptions = await setInitialCampusOptions()

        setValues({
          university: options.university.find(
            option => option.value === request.data.university_id
          ),
          campus: campusOptions.find(
            (option: Option) => option.value === request.data.campus_id
          ),
          course: options.course.find(
            option => option.value === request.data.course_id
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

  return (
    <>
      <Form
        loading
        afterResData={afterSubmit}
        getData={e => console.log(e)}
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
          name='university_id'
          placeholder='Universidade'
          options={options.university}
          onChange={onUniversityChange}
          value={values.university}
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
            name='campus_id'
            placeholder='Câmpus'
            options={options.campus}
            onChange={onCampusChange}
            value={values.campus}
          />
        </Presence>

        <Presence animate='enter' variants={show} condition={animations.course}>
          <Select
            name='course_id'
            placeholder='Curso com maior carga horária'
            value={values.course}
            options={options.course}
            onChange={(selected: Option) => {
              setValues(prev => ({ ...prev, course: selected }))
              setAnimations(prev => ({ ...prev, ways: true }))
            }}
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

      {!request && (
        <RegisterEmail
          placeholder='E-mail institucional'
          ref={registerEmailRef}
          title={selectedUniversity.name}
          regex={selectedUniversity.regex.email.professor}
          addData={{ university_id: selectedUniversity.university_id }}
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
          }}
        />
      )}

      <Popup bottom='50vh' translateY='50%' ref={popupRef} />
    </>
  )
}

export default Professor
