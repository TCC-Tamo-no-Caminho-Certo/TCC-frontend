import React, { useRef, useCallback } from 'react'
import { Form } from '@unform/web'
import InputText from 'components/InputText/index'
import { FormHandles, SubmitHandler } from '@unform/core'
import { useHistory } from 'react-router-dom'
import signupSchema from 'validations/signup'
import SignupButton from 'components/Button'
import * as Yup from 'yup'
import getValidationErrors from 'utils/getValidationErrors'
import { useRegister } from 'hooks/useRegister'
import Anime from '@mollycule/react-anime'
import { Style } from './styles'

interface FormData {
  emai: string
  password: string
}

const Signup: React.FC = () => {
  const signupFormRef = useRef<FormHandles>(null)
  const signupRef = useRef(null)
  const history = useHistory()
  const { register, setRegister } = useRegister()

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
        }
      }
    },
    [history]
  )

  return (
    <Anime
      in={register}
      appear={false}
      duration={2000}
      mountOnEnter
      unmountOnExit
      onEntering={{
        easing: 'easeOutQuad',
        translateX: [0, '-100vw'],
      }}
      onExiting={{
        easing: 'easeOutQuad',
        translateX: ['-100vw', 0],
      }}
    >
      <Style ref={signupRef}>
        <button type='button' onClick={() => setRegister(false)}>
          Voltar
        </button>
        <Form ref={signupFormRef} onSubmit={onSignupSubmit}>
          <InputText name='name' placeholder='name' />
          <InputText name='email' placeholder='email' />
          <InputText name='password' placeholder='password' />
          <InputText name='confirm_password' placeholder='Confirmar Senha' />
          <SignupButton type='submit'>Concluir Cadastro</SignupButton>
        </Form>
      </Style>
    </Anime>
  )
}

export default Signup
