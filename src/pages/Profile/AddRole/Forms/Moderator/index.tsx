import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import { Request } from '../Container'
import { AddRoleContext } from '../../index'

import {
  withFullTime,
  withoutFullTime
} from 'utils/validations/addRoleForms/moderator'

import { getUser, UserState } from 'store/user'
import { Response, RootState } from 'store'

import { Select, Submit, Textarea } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import { Option } from 'components/Form/Select'

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

  const popupRef = useRef<PopupMethods>(null)

  const [fullTime, setFullTime] = useState(false)

  const [options, _setOptions] = useState<Options>({
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

    console.log(request)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request])

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      if (fullTime)
        popupRef.current?.configPopup({
          setModal: true,
          type: 'success',
          message: 'Papel adicionado',
          onClick: () => {
            dispatch(getUser())
            history.push('/session/main')
          }
        })
      else
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
        message: 'Falha ao enviar solicitação :('
      })
  }

  return (
    <>
      <Form
        loading
        path='user/role/request/moderator'
        afterResData={afterSubmit}
        schema={!fullTime ? withFullTime : withoutFullTime}
      >
        <Select
          name='university_id'
          placeholder='Universidade'
          options={options.university}
          onChange={onUniversityChange}
          value={values.university}
        />

        <motion.div
          animate={{
            height: !fullTime ? 'auto' : 0,
            opacity: !fullTime ? 1 : 0
          }}
        >
          <Textarea
            name='pretext'
            placeholder='Descreva porquê você quer ser Moderador...'
            maxLength={500}
            defaultValue={request?.data.pretext}
          />
        </motion.div>

        <Submit>
          {!fullTime ? 'Enviar solicitação' : 'Tornar-se moderador!'}
        </Submit>
      </Form>

      <Popup bottom='50vh' translateY='50%' ref={popupRef} />
    </>
  )
}

export default ModeratorForm
