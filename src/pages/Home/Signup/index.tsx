import React, { useRef, useEffect } from 'react'
import { Form } from '@unform/web'
import InputText from 'components/InputText/index'
import { FormHandles, SubmitHandler } from '@unform/core'
import Joi from '@hapi/joi'
import { useHistory } from 'react-router-dom'
import signupSchema from 'validations/signup'
import SignupButton from 'components/Button'
import { useRegister } from 'hooks/useRegister'
import anime from 'animejs'
import { Style } from './styles'

interface FormData {
  emai: string
  password: string
}

interface ErrorList {
  [key: string]: string
}

const Signup: React.FC = () => {
  const signupFormRef = useRef<FormHandles>(null)
  const signupRef = useRef(null)
  const history = useHistory()
  const { register } = useRegister()

  useEffect(() => {
    if (register !== 'starting') {
      anime({
        targets: signupRef.current,
        duration: 1000,
        easing: 'easeInOutCirc',
        translateX: register === 'registering' ? [0, '-100%'] : ['-100%', 0],
      })
    }
  }, [register])

  const onSignupSubmit: SubmitHandler<FormData> = (data, { reset }, event) => {
    event?.preventDefault()
    try {
      Joi.assert(data, signupSchema, { abortEarly: false })
      signupFormRef.current?.setErrors({})
      reset()
      history.push('/')
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        const errorList: ErrorList = {}

        error.details.forEach(element => {
          errorList[element.path.join('.')] = element.message
        })

        signupFormRef.current?.setErrors(errorList)
      }
    }
  }

  return (
    <Style ref={signupRef}>
      <Form ref={signupFormRef} onSubmit={onSignupSubmit}>
        <InputText name='city' placeholder='city' />
        <InputText name='address' placeholder='address' />
        <InputText name='zip_code' placeholder='zip_code' />
        <InputText name='name' placeholder='name' />
        <InputText name='phone' placeholder='phone' />
        <InputText name='email' placeholder='email' />
        <InputText name='password' placeholder='password' />
        <InputText name='role' placeholder='role' />
        <SignupButton type='submit'>Concluir Cadastro</SignupButton>
      </Form>
    </Style>
  )
}

export default Signup
