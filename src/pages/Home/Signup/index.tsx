import React, { useRef, useEffect, useCallback } from 'react'
import { Form } from '@unform/web'
import InputText from 'components/InputText/index'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useHistory } from 'react-router-dom'
import signupSchema from 'validations/signup'
import SignupButton from 'components/Button'
import { useRegister } from 'hooks/useRegister'
import anime from 'animejs'
import * as Yup from 'yup'
import getValidationErrors from 'utils/getValidationErrors'
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

  const onSignupSubmit: SubmitHandler<FormData> = useCallback(
    async (data, { reset }, event) => {
      event?.preventDefault()
      try {
        await signupSchema.validate(data, { abortEarly: false })
        signupFormRef.current?.setErrors({})
        reset()
        history.push('/map')
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errorList = getValidationErrors(error)
          signupFormRef.current?.setErrors(errorList)
          console.log(errorList)
        }
      }
    },
    [history]
  )

  return (
    <Style ref={signupRef}>
      <Form ref={signupFormRef} onSubmit={onSignupSubmit}>
        <InputText name='name' placeholder='name' />
        <InputText name='email' placeholder='email' />
        <InputText name='password' placeholder='password' />
        <InputText name='confirm_password' placeholder='Confirmar Senha' />
        <SignupButton type='submit'>Concluir Cadastro</SignupButton>
      </Form>
    </Style>
  )
}

export default Signup
