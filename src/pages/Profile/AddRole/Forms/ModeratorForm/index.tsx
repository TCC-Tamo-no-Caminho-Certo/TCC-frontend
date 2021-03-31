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
import { RootState } from 'store'

import { Checkbox, Submit, Textarea } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

interface AnimationsState {
  showAll: boolean
  showJustification: boolean
}

const MotionTextarea = motion.custom(Textarea)

const initialAnimations: AnimationsState = {
  showAll: true,
  showJustification: false
}

const verifyFullTime = (user: UserState) => {
  const { emails } = user
  emails.filter(email => email.institutional === true)
  return false
}

const ModeratorForm = () => {
  const user = useSelector<RootState, UserState>(state => state.user)
  const dispatch = useDispatch()
  const popupRef = useRef<PopupMethods>(null)
  const history = useHistory()
  const { rolesHeight } = useContext(AddRoleContext)
  const [{ showAll, showJustification }, setAnimations] = useState(
    initialAnimations
  )

  const onSubmit = (res: any) => {
    if (res.success)
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
      showJustification: !isFullTimeProfessor
    }))
  }, [user])

  return (
    <>
      <Container role='moderator'>
        <Form
          loading
          path='user/role/request/moderator'
          afterResData={onSubmit}
          schema={showJustification ? withFullName : withoutFullName}
        >
          <Presence condition={showAll}>
            <Checkbox
              name='full_time'
              label='Sou professor em tempo integral'
              onClick={() => {
                setAnimations(prev => ({
                  ...prev,
                  showJustification: !prev.showJustification
                }))
              }}
            />

            <Presence condition={showJustification}>
              <MotionTextarea
                exit='exit'
                animate='enter'
                name='justification'
                placeholder='Descreva porquê você quer ser Moderador'
                maxLength={500}
                variants={show}
              />
            </Presence>
          </Presence>

          <Submit>
            {showJustification ? 'Enviar solicitação' : 'Tornar-se moderador!'}
          </Submit>
        </Form>
      </Container>

      <Popup
        bottom='50vh'
        translateY='50%'
        bgHeight={`calc(${rolesHeight}px + 100vh)`}
        ref={popupRef}
      />
    </>
  )
}

export default ModeratorForm
