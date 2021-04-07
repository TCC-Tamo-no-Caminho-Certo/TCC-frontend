import React, { useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import { universityArrayToSelect, universityToSelect } from '../StudentForm'

import {
  withFullName,
  withoutFullName
} from 'utils/validations/addRoleForms/moderator'

import { getUser, UserState } from 'store/user'
import { Response, RootState } from 'store'
import {
  getUniversities,
  UniversitiesState,
  University
} from 'store/universities'

import { Select, Submit, Textarea } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'

import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Option } from 'react-select/src/filters'

interface FormState {
  universities: University[] | undefined
  selectedUniversity: University | undefined
}

interface ModeratorFormProps {
  beforeData?: any
}

const initialFormState: FormState = {
  selectedUniversity: undefined,
  universities: undefined
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
const ModeratorForm = ({ beforeData }: ModeratorFormProps) => {
  const [{ universities }, setFormState] = useState<FormState>(initialFormState)
  const [isFullTime, setIsFullTime] = useState(false)
  const storeUniversities = useSelector<RootState, UniversitiesState>(
    state => state.universities
  )
  const user = useSelector<RootState, UserState>(state => state.user)
  const popupRef = useRef<PopupMethods>(null)
  const dispatch = useDispatch()
  const history = useHistory()

  const onSelectChange = ({ value: id }: Option) => {
    setIsFullTime(verifyFullTime(user, Number(id)))
  }

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      !isFullTime
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
    dispatch(getUniversities(storeUniversities))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setFormState((prev: any) => ({
      ...prev,
      universities: storeUniversities.universities
        ? storeUniversities.universities
        : undefined
    }))
  }, [storeUniversities])

  return (
    <>
      <Form
        loading
        path='user/role/request/moderator'
        method={beforeData ? 'patch' : 'post'}
        afterResData={afterSubmit}
        schema={!isFullTime ? withFullName : withoutFullName}
      >
        <Select
          name='university_id'
          placeholder='Universidade'
          onChange={onSelectChange}
          options={universityArrayToSelect(universities)}
          value={universityToSelect(
            universities?.find(
              (university: University) =>
                beforeData &&
                university.university_id === beforeData.university_id
            )
          )}
        />

        <motion.div
          animate={{
            height: !isFullTime ? 'auto' : 0,
            opacity: !isFullTime ? 1 : 0
          }}
        >
          <Textarea
            name='pretext'
            placeholder='Descreva porquê você quer ser Moderador...'
            maxLength={500}
            defaultValue={beforeData ? beforeData.pretext : ''}
          />
        </motion.div>

        <Submit>
          {!isFullTime ? 'Enviar solicitação' : 'Tornar-se moderador!'}
        </Submit>
      </Form>

      <Popup bottom='50vh' translateY='50%' ref={popupRef} />
    </>
  )
}

export default ModeratorForm
