import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form } from './styles'

import Container from '../Container'
import { AddRoleContext } from '../../index'
import { show } from '../StudentForm'

import { getUser } from 'store/user'

import { Submit } from 'components/Form'
import Popup, { PopupMethods } from 'components/Popup'
import Presence from 'components/Presence'

import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

interface AnimationsState {
  showSubmit: boolean
}

const MotionSubmit = motion.custom(Submit)

const initialAnimations: AnimationsState = {
  showSubmit: false
}

const ModeratorForm = () => {
  const dispatch = useDispatch()
  const popupRef = useRef<PopupMethods>(null)
  const { rolesHeight } = useContext(AddRoleContext)
  const history = useHistory()

  const [{ showSubmit }] = useState(initialAnimations)

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
  }, [])

  return (
    <>
      <Container role='moderator'>
        <Form loading path='user/role/request/student' afterResData={onSubmit}>
          <Presence condition={showSubmit}>
            <MotionSubmit
              initial='exit'
              animate='enter'
              exit='exit'
              variants={show}
            >
              Enviar solicitação
            </MotionSubmit>
          </Presence>
        </Form>
      </Container>

      <Popup
        translateY='50%'
        bottom='50vh'
        bgHeight={`calc(${rolesHeight}px + 100vh)`}
        ref={popupRef}
      />
    </>
  )
}

export default ModeratorForm
