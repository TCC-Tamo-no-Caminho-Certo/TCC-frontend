import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import { AddRoleContext } from '../../index'

import {
  withFullTime,
  withoutFullTime
} from 'utils/validations/addRoleForms/moderator'

import { getRolesData, RolesDataState } from 'store/Async/rolesData'
import { RootState } from 'store'
import { UserState } from 'store/Async/user'

import { Select, Submit, Textarea } from 'components/Form'
import { Option } from 'components/Form/Select'
import Popup, { PopupForwardeds } from 'components/Popup'

import { ProfessorType } from 'types/Responses/user/rolesData'
import { ModeratorDataType, RequestType } from 'types/Responses/user/requests'

import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

interface Options {
  university: Option[]
}

interface Values {
  university?: Option | null
}

interface ModeratorProps {
  request?: RequestType<ModeratorDataType>
}

const verifyFullTime = (professor: ProfessorType, university_id: number) => {
  const { universities } = professor
  const selectedUniversity = universities?.find(
    ({ id }) => id === university_id
  )

  return selectedUniversity ? selectedUniversity.full_time : false
}

const ModeratorForm = ({ request }: ModeratorProps) => {
  const { universities } = useContext(AddRoleContext)
  const { roles } = useSelector<RootState, RolesDataState>(
    ({ rolesData }) => rolesData
  )
  const { user } = useSelector<RootState, UserState>(({ user }) => user)

  const popupRef = useRef<PopupForwardeds>(null)
  const [values, setValues] = useState<Values>({ university: undefined })
  const [fullTime, setFullTime] = useState(false)
  const [options, setOptions] = useState<Options>({
    university: universities.map(({ name, id }) => ({ label: name, value: id }))
  })

  const dispatch = useDispatch()
  const history = useHistory()

  const onUniversityChange = async (selected: Option) => {
    roles.professor &&
      setFullTime(verifyFullTime(roles.professor, Number(selected.value)))
    setValues(prev => ({ ...prev, university: selected }))
  }

  const afterSubmit = (response: any) => {
    if (response.success)
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
          ({ value }) => value === request.data.university_id
        )
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request])

  useEffect(() => {
    user?.id &&
      dispatch(
        getRolesData({ userId: user.id, role: 'professor', updated: true })
      )
  }, [dispatch, user?.id])

  return (
    <>
      <Form
        loading
        afterResData={afterSubmit}
        method={request ? 'patch' : 'post'}
        schema={fullTime ? withFullTime : withoutFullTime}
        path={`api/users/roles/requests/moderator${
          request?.id ? `/${request.id}` : ''
        }`}
      >
        <Select
          name='university_id'
          placeholder='Universidade'
          value={values.university}
          options={options.university}
          onChange={onUniversityChange}
        />

        <motion.div
          animate={{
            opacity: !fullTime ? 1 : 0,
            height: !fullTime ? 'auto' : 0
          }}
        >
          <Textarea
            name='pretext'
            id='cy-pretext'
            maxLength={500}
            defaultValue={request?.data.pretext}
            placeholder='Descreva porquê você quer ser Moderador...'
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
