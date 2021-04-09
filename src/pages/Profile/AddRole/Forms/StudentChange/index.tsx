import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Form from './styles'

import { semesterOptions, show } from '../StudentForm'
import { Voucher } from '../StudentForm/styles'
import { ContainerContext } from '../Container'

import { voucherSchema } from 'utils/validations/addRoleForms/student'

import api from 'services/api'

import AlertIcon from 'assets/Inputs/AlertIcon'

import { File, Select, Submit, Text } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import { Option } from 'components/Form/Select'
import Presence from 'components/Presence'

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
  course: boolean
}

interface StudentChangeProps {
  data: {
    register: string
    semester: number
    campus_id: number
    course_id: number
    university_id: number
  }
}

function StudentChange({ data }: StudentChangeProps) {
  const popupRef = useRef<PopupMethods>(null)
  const { storeCourses, storeUniversities } = useContext(ContainerContext)

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
    university: options.university.find(
      option => option.value === data.university_id
    ),
    campus: options.campus.find(option => option.value === data.campus_id),
    course: options.course.find(option => option.value === data.course_id)
  })

  const [animations, setAnimations] = useState<Animations>({
    course: false
  })

  const registerRegex = storeUniversities.find(
    university => university.university_id === values.university?.value
  )?.regex.register.student

  const setInitialCampusOptions = useCallback(async () => {
    const response = await api.get(`university/${data.university_id}/campus`)

    const campus = response.campus.map((campus: any) => ({
      label: campus.name,
      value: campus.campus_id
    }))

    setOptions(prev => ({
      ...prev,
      campus
    }))
  }, [data.university_id])

  useEffect(() => {
    setInitialCampusOptions()
  }, [setInitialCampusOptions])

  const onUniversityChange = async (selected: Option) => {
    const { campus } = await api.get(`university/${selected.value}/campus`)

    if (values.university !== selected) {
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
        course: null
      }))

      setAnimations(prev => ({
        ...prev,
        course: true
      }))
    }
  }

  return (
    <>
      <Form
        loading
        path='user/role/request/student'
        schema={voucherSchema(registerRegex || '')}
        getData={e => console.log(e)}
      >
        <Select
          name='university_id'
          placeholder='Universidade'
          options={options.university}
          onChange={onUniversityChange}
          value={values.university}
        />

        <Text
          name='register'
          placeholder='Registro Acadêmico'
          defaultValue={data.register}
        />

        <Select
          name='campus_id'
          placeholder='Câmpus'
          options={options.campus}
          onChange={onCampusChange}
          value={values.campus}
        />

        <Presence animate='enter' variants={show} condition={animations.course}>
          <Select
            name='course_id'
            placeholder='Curso'
            value={values.course}
            options={options.course}
            onChange={(selected: Option) =>
              setValues(prev => ({ ...prev, course: selected }))
            }
          />
        </Presence>

        <Select
          name='semester'
          placeholder='Semestre'
          options={options.semester}
          defaultValue={options.semester.find(
            option => option.value === data.semester
          )}
        />

        <Voucher>
          <div id='warning'>
            <p>
              <AlertIcon />
              Este processo é mais lento pois requer confirmação de um{' '}
              <b id='moderator'>Moderador</b> de sua universidade. O formato do
              arquivo deve ser <b>PDF</b>.
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
          />
        </Voucher>

        <Submit>Enviar solicitação</Submit>
      </Form>

      <Popup bottom='50vh' translateY='50%' ref={popupRef} />
    </>
  )
}

export default StudentChange
