import React, { useContext, useEffect, useState } from 'react'
import { Form } from './styles'

import { Request } from '../Container'
import { AddRoleContext } from '../../index'

import {
  withFullTime,
  withoutFullTime
} from 'utils/validations/addRoleForms/moderator'

import { getUser, UserState } from 'store/AsyncThunks/user'
import { Response, RootState } from 'store'

import { Select, Submit, Textarea } from 'components/Form'
import { Option } from 'components/Form/Select'

import { GlobalContext, GlobalContextProps } from 'App'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

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

const verifyFullTime = (user: UserState, university_id: number) => {
  if (user.professor)
    return (
      user.professor.universities.filter(
        university => university.university_id === university_id
      )[0].full_time !== 0
    )

  return false
}

const ModeratorForm = ({ request }: ModeratorProps) => {
  const user = useSelector<RootState, UserState>(state => state.user)
  const { universities } = useContext(AddRoleContext)

  const { popup } = useContext<GlobalContextProps>(GlobalContext)

  const [fullTime, setFullTime] = useState(false)

  const [options, setOptions] = useState<Options>({
    university: universities.map(university => ({
      label: university.name,
      value: university.university_id
    }))
  })

  const [values, setValues] = useState<Values>({
    university: undefined
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const onUniversityChange = (selected: Option) => {
    setFullTime(verifyFullTime(user, Number(selected.value)))

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

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      if (fullTime)
        popup?.popupRef?.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Papel adicionado',
          onClick: () => {
            dispatch(getUser())
            history.push('/session/main')
          }
        })
      else
        popup?.popupRef?.current?.configPopup({
          setModal: true,
          type: 'success',
          message: request ? 'Solicitação reenviada!' : 'Solicitação enviada!',
          onClick: () => history.push('/session/main')
        })
    else
      popup?.popupRef?.current?.configPopup({
        setModal: true,
        type: 'error',
        message: 'Falha ao enviar solicitação :('
      })
  }

  useEffect(() => {
    setOptions(prev => ({
      ...prev,
      university: universities.map(university => ({
        label: university.name,
        value: university.university_id
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
