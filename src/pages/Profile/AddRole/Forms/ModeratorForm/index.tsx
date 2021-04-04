import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import Container from '../Container'
import { AddRoleContext } from '../../index'
import { show } from '../StudentForm'

import {
  withFullName,
  withoutFullName
} from 'utils/validations/addRoleForms/moderator'

import { getUser, UserState } from 'store/user'
import { Response, RootState } from 'store'

import { Checkbox, Submit, Textarea } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

interface AnimationsState {
  showAll: boolean
  showPretext: boolean
}

const MotionTextarea = motion.custom(Textarea)

const initialAnimations: AnimationsState = {
  showAll: true,
  showPretext: false
}
const verifyFullTime = (user: UserState) => {
  const { emails } = user
  emails.filter(email => email.institutional === true)
  return false
}

const ModeratorForm = () => {
  const user = useSelector<RootState, UserState>(state => state.user)
  const dispatch = useDispatch()
  const containerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<PopupMethods>(null)
  const history = useHistory()
  const { rolesHeight } = useContext(AddRoleContext)
  const [{ showAll, showPretext }, setAnimations] = useState(initialAnimations)

  const takeBgHeight = () => {
    const height = containerRef.current?.offsetHeight

    if (height) return `calc(${rolesHeight}px + ${height}px + 48px)`
    else return `calc(${rolesHeight}px + 100vh)`
  }

  const afterSubmit = (res: Response<any>) => {
    if (res.success)
      showPretext
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
        message: 'Falha ao enviar solicitação'
      })
  }

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100)
    const isFullTimeProfessor = verifyFullTime(user)

    setAnimations(prev => ({
      ...prev,
      showAll: !isFullTimeProfessor,
      showSubmit: isFullTimeProfessor,
      showPretext: !isFullTimeProfessor
    }))
  }, [user])

  return (
    <>
      <Container role='moderator' ref={containerRef}>
        <Form
          loading
          path='user/role/request/moderator'
          afterResData={afterSubmit}
          schema={showPretext ? withFullName : withoutFullName}
        >
          <Presence condition={showAll}>
            <Checkbox
              name='full_time'
              label='Sou professor em tempo integral'
              onClick={() => {
                setAnimations(prev => ({
                  ...prev,
                  showPretext: !prev.showPretext
                }))
              }}
            />

            <motion.div
              animate={{
                height: showPretext ? 'auto' : 0,
                opacity: showPretext ? 1 : 0
              }}
            >
              <Textarea
                name='pretext'
                placeholder='Descreva porquê você quer ser Moderador'
                maxLength={500}
              />
            </motion.div>
          </Presence>

          <Submit>
            {showPretext ? 'Enviar solicitação' : 'Tornar-se moderador!'}
          </Submit>
        </Form>
      </Container>

      <Popup
        bottom='50vh'
        translateY='50%'
        bgHeight={takeBgHeight()}
        ref={popupRef}
      />
    </>
  )
}

export default ModeratorForm
