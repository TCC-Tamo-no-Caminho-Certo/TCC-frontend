import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import { AddRoleContext } from '../../index'

import {
  withFullTime,
  withoutFullTime
} from 'utils/validations/addRoleForms/moderator'

import api from 'services/api'

import { Select, Submit, Textarea } from 'components/Form'
import { Option } from 'components/Form/Select'
import Popup, { PopupForwardeds } from 'components/Popup'

import { ProfessorType } from 'types/Responses/user/rolesData'
import { ModeratorDataType, RequestType } from 'types/Responses/user/requests'

import { motion } from 'framer-motion'
import { useHistory } from 'react-router'

interface Options {
  university: Option[]
}

interface Values {
  university: Option | null | undefined
}

interface ModeratorProps {
  request?: RequestType<ModeratorDataType>
}

const verifyFullTime = (professor: ProfessorType, university_id: number) => {
  const { universities } = professor
  const selectedUniversity = universities.find(({ id }) => id === university_id)

  return selectedUniversity ? selectedUniversity.full_time : false
}

const ModeratorForm = ({ request }: ModeratorProps) => {
  const popupRef = useRef<PopupForwardeds>(null)

  const { universities } = useContext(AddRoleContext)

  const [options, setOptions] = useState<Options>({
    university: universities.map(({ name, id }) => ({
      label: name,
      value: id
    }))
  })
  const [values, setValues] = useState<Values>({
    university: undefined
  })
  const [fullTime, setFullTime] = useState(false)

  const history = useHistory()

  const onUniversityChange = async (selected: Option) => {
    const professor = await api.get('api/roles/professor')

    setFullTime(verifyFullTime(professor, Number(selected.value)))

    setValues(prev => ({ ...prev, university: selected }))
  }

  const afterSubmit = (res: any) => {
    if (res.success)
      if (fullTime)
        popupRef?.current?.configPopup({
          open: true,
          type: 'success',
          message: 'Papel adicionado',
          onClick: () => {
            history.push('/session/main')
          }
        })
      else
        popupRef?.current?.configPopup({
          open: true,
          type: 'success',
          onClick: () => history.push('/session/main'),
          message: request ? 'Solicitação reenviada!' : 'Solicitação enviada!'
        })
    else
      popupRef?.current?.configPopup({
        open: true,
        type: 'error',
        message: 'Falha ao enviar solicitação :('
      })
  }

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
    request &&
      setValues({
        university: options.university.find(
          option => option.value === request.data.university_id
        )
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request])

  return (
    <>
      <Form
        loading
        method={request ? 'patch' : 'post'}
        afterResData={afterSubmit}
        schema={!fullTime ? withFullTime : withoutFullTime}
        path={
          request
            ? `api/users/roles/requests/moderator/${request.id}`
            : 'api/users/roles/requests/moderator'
        }
      >
        <Select
          id='cy-university'
          name='university_id'
          placeholder='Universidade'
          value={values.university}
          options={options.university}
          onChange={onUniversityChange}
        />

        <motion.div
          animate={{
            height: !fullTime ? 'auto' : 0,
            opacity: !fullTime ? 1 : 0
          }}
        >
          <Textarea
            id='cy-pretext'
            name='pretext'
            placeholder='Descreva porquê você quer ser Moderador...'
            maxLength={500}
            defaultValue={request?.data.pretext}
          />
        </motion.div>

        <Submit id='cy-submit'>
          {!fullTime ? 'Enviar solicitação' : 'Tornar-se moderador!'}
        </Submit>
      </Form>

      <Popup ref={popupRef} />
    </>
  )
}

export default ModeratorForm
