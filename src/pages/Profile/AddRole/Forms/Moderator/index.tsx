import React, { useContext, useEffect, useState } from 'react'
import { Form } from './styles'

import { Request } from '../Container'
import { AddRoleContext } from '../../index'

import {
  withFullTime,
  withoutFullTime
} from 'utils/validations/addRoleForms/moderator'

import api from 'services/api'

import { Select, Submit, Textarea } from 'components/Form'
import { Option } from 'components/Form/Select'

import { GlobalContext } from 'App'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router'
import { ProfessorType } from 'types/Responses/user/rolesData'

interface Data {
  university_id: number
  pretext: string
}

interface Options {
  university: Option[]
}

interface Values {
  university: Option | null | undefined
}

interface ModeratorProps {
  request?: Request<Data>
}

const verifyFullTime = (professor: ProfessorType, university_id: number) => {
  const { universities } = professor
  const selectedUniversity = universities.find(({ id }) => id === university_id)

  return selectedUniversity ? selectedUniversity.full_time : false
}

const ModeratorForm = ({ request }: ModeratorProps) => {
  const { popupRef } = useContext(GlobalContext)

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
    const professor = await api.get('roles/professor')

    setFullTime(verifyFullTime(professor, Number(selected.value)))

    setValues(prev => ({
      ...prev,
      university: selected
    }))
  }

  useEffect(() => {
    request &&
      setValues({
        university: options.university.find(
          option => option.value === request.data.university_id
        )
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request])

  const afterSubmit = (res: any) => {
    if (res.success)
      if (fullTime)
        popupRef?.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Papel adicionado',
          onClick: () => {
            history.push('/session/main')
          }
        })
      else
        popupRef?.current?.configPopup({
          setModal: true,
          type: 'success',
          message: request ? 'Solicitação reenviada!' : 'Solicitação enviada!',
          onClick: () => history.push('/session/main')
        })
    else
      popupRef?.current?.configPopup({
        setModal: true,
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

  return (
    <Form
      loading
      path={
        request
          ? `user/role/request/moderator/${request.request_id}`
          : 'user/role/request/moderator'
      }
      method={request ? 'patch' : 'post'}
      afterResData={afterSubmit}
      schema={!fullTime ? withFullTime : withoutFullTime}
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
  )
}

export default ModeratorForm
