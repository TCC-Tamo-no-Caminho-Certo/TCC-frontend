import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Form, Voucher, Ways } from './styles'

import { ContainerContext } from '../Container'
import { Data } from '../Container/index'

import { voucherSchema } from 'utils/validations/addRoleForms/student'

import api from 'services/api'

import { Response, RootState } from 'store'
import { University } from 'store/AsyncThunks/universities'
import { Email, UserState } from 'store/user'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File, Select, Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import { Option } from 'components/Form/Select'
import Presence from 'components/Presence'
import RegisterEmail, { RegisterEmailMethods } from 'components/RegisterEmail'

import { Variants } from 'framer-motion'
import { useSelector } from 'react-redux'

interface Options {
  campus: Option[]
  course: Option[]
  semester: Option[]
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
  semester: boolean
  voucher: boolean
}

interface StudentChangeProps {
  requests?: any
}

const semesterOptions: Option[] = [
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

export const hasInstitutionalEmail = (regex: string, emails: Email[]) => {
  const newRegex = new RegExp(regex)
  return emails.find(({ address }) => newRegex.test(address))
}

export const universityArrayToSelect = (array: University[]): Option[] =>
  array.map(({ university_id, name }: University) => ({
    value: university_id,
    label: name
  }))

function StudentChange({ requests }: StudentChangeProps) {
  const user = useSelector<RootState, UserState>(state => state.user)
  const { storeCourses, storeUniversities, storeRoles } = useContext(
    ContainerContext
  )

  const popupRef = useRef<PopupMethods>(null)
  const registerEmailRef = useRef<RegisterEmailMethods>(null)

  const [data, setData] = useState<Data | undefined>(undefined)

  const [options, setOptions] = useState<Options>({
    university: storeUniversities.map(university => ({
      label: university.name,
      value: university.university_id
    })),
    campus: [],
    course: storeCourses.map(course => ({
      label: course.name,
      value: course.course_id
    })),
    semester: semesterOptions
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
    semester: false,
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

  const registerRegex = storeUniversities.find(
    university => university.university_id === values.university?.value
  )?.regex.register.student

  const setInitialCampusOptions = useCallback(async () => {
    if (data) {
      const response = await api.get(`university/${data?.university_id}/campus`)

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
  }, [data])

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

      if (!data) {
        const newSelected = storeUniversities.find(
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

  const onSemesterChange = () => {
    if (!data)
      hasInstitutionalEmail(selectedUniversity.regex.email.student, user.emails)
        ? setAnimations(prev => ({ ...prev, submit: true }))
        : setAnimations(prev => ({ ...prev, ways: true }))
  }

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      popupRef.current?.configPopup({
        setModal: true,
        type: 'success',
        message: 'Solicitação reenviada!'
      })
    else
      popupRef.current?.configPopup({
        setModal: true,
        type: 'error',
        message: 'Algo deu errado :('
      })
  }

  useEffect(() => {
    if (data)
      (async () => {
        const campusOptions = await setInitialCampusOptions()

        setValues({
          university: options.university.find(
            option => option.value === data.university_id
          ),
          campus: campusOptions.find(
            (option: Option) => option.value === data.campus_id
          ),
          course: options.course.find(option => option.value === data.course_id)
        })

        setAnimations({
          ar: true,
          ways: false,
          campus: true,
          course: true,
          submit: false,
          voucher: true,
          semester: true
        })
      })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, setInitialCampusOptions])

  useEffect(() => {
    setData(
      requests.find(
        (request: any) =>
          request.role_id ===
          storeRoles.find(storeRole => storeRole.title === 'student')?.role_id
      ).data
    )
  }, [requests, storeRoles])

  return (
    <>
      <Form
        loading
        path='user/role/request/student'
        schema={voucherSchema(registerRegex || '')}
        getData={e => console.log(e)}
        afterResData={afterSubmit}
      >
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
            defaultValue={data?.register}
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
            placeholder='Curso'
            value={values.course}
            options={options.course}
            onChange={(selected: Option) => {
              setValues(prev => ({ ...prev, course: selected }))
              setAnimations(prev => ({ ...prev, semester: true }))
            }}
          />
        </Presence>

        <Presence
          animate='enter'
          variants={show}
          condition={animations.semester}
        >
          <Select
            name='semester'
            placeholder='Semestre'
            options={options.semester}
            onChange={onSemesterChange}
            defaultValue={options.semester.find(
              option => option.value === data?.semester
            )}
          />
        </Presence>

        {!data && (
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
                    data ? '' : 'é mais lento pois'
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

      {!data && (
        <RegisterEmail
          placeholder='E-mail institucional'
          ref={registerEmailRef}
          title={selectedUniversity.name}
          regex={selectedUniversity.regex.email.student}
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

export default StudentChange
