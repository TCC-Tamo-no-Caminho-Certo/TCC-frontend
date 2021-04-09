import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import { ContainerContext } from '../Container'

import {
  withFullName,
  withoutFullName
} from 'utils/validations/addRoleForms/moderator'

import { getUser, UserState } from 'store/user'
import { Response, RootState } from 'store'

import { Select, Submit, Textarea } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import { Option } from 'components/Form/Select'

import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const verifyFullTime = (user: UserState, university_id: number) => {
  if (user.professor)
    return (
      user.professor.universities.filter(
        university => university.university_id === university_id
      )[0].full_time !== 0
    )

  return false
}

const ModeratorForm = () => {
  const user = useSelector<RootState, UserState>(state => state.user)
  const { storeUniversities } = useContext(ContainerContext)

  const popupRef = useRef<PopupMethods>(null)

  const [fullTime, setFullTime] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const onSelectChange = ({ value: id }: Option) => {
    setFullTime(verifyFullTime(user, Number(id)))
  }

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      !fullTime
        ? popupRef.current?.configPopup({
            setModal: true,
            type: 'success',
            message:
              'Justificativa enviada, aguarde a resposta de um moderador.',
            onClick: () => {
              dispatch(getUser())
              history.push('/session/main')
            }
          })
        : popupRef.current?.configPopup({
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
        type: 'error',
        message: 'Falha ao enviar solicitação :('
      })
  }

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Form
        loading
        path='user/role/request/moderator'
        afterResData={afterSubmit}
        schema={!fullTime ? withFullName : withoutFullName}
      >
        <Select
          name='university_id'
          placeholder='Universidade'
          onChange={onSelectChange}
          options={storeUniversities.map(university => ({
            label: university.name,
            value: university.university_id
          }))}
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
