import React, { useRef, useCallback, useState, useEffect } from 'react'
import { Style } from './styles'
import signupSchema from 'validations/signup'
import InputText from 'components/InputText/index'
import SignupButton from 'components/Button'
import { useRegisterSlide } from 'hooks/useRegisterSlide'
import getValidationErrors from 'utils/getValidationErrors'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { useHistory } from 'react-router-dom'
import { FormHandles, SubmitHandler } from '@unform/core'

interface FormData {
  emai: string
  password: string
}
const Signup: React.FC = () => {
  const signupFormRef = useRef<FormHandles>(null)
  const history = useHistory()
  const { registerSlide, setRegisterSlide } = useRegisterSlide()
  const [showRegister, setShowRegister] = useState(false)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 2000)
    registerSlide
      ? setShowRegister(true)
      : setTimeout(() => {
          setShowRegister(false)
        }, 2010)
  }, [registerSlide])

  const onBackButtonClick = () => {
    setRegisterSlide(false)
  }

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
    <>
      {showRegister && (
        <Style>
          <button type='button' disabled={disabled} onClick={onBackButtonClick}>
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
      )}
    </>
  )
}

export default Signup
