import React, { useRef, useState, useEffect } from 'react'
import Style, { BackButton, InfoText, DualInput } from './styles'
import signupSchema from 'validations/signup'
import Button from 'components/Button'
import DatePicker from 'components/DatePicker'
import InputText from 'components/InputText/index'
import { useRegisterSlide } from 'hooks/useRegisterSlide'
import { useAuth } from 'hooks/useAuth'
import getValidationErrors from 'utils/getValidationErrors'
import { Logo } from 'assets/Logo'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { MdPublic } from 'react-icons/md'
import { FaUserLock } from 'react-icons/fa'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { FormHandles, SubmitHandler } from '@unform/core'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

export interface RegisterData {
  name: string
  surname: string
  email: string
  birthday: string
  password: string
}

const Signup: React.FC = () => {
  const signupFormRef = useRef<FormHandles>(null)
  const [disabled, setDisabled] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  const { register } = useAuth()
  const { registerSlide, setRegisterSlide } = useRegisterSlide()

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

  const handleSubmit: SubmitHandler<RegisterData> = async (data, { reset }, event) => {
    event?.preventDefault()
    try {
      await signupSchema.validate(data, { abortEarly: false })
      signupFormRef.current?.setErrors({})
      const birthday = data.birthday.replace(/\//g, '-')
      await register({ ...data, birthday })
      setRegisterSlide(false)
      reset()
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)
        signupFormRef.current?.setErrors(errorList)
      }
    }
  }

  return (
    <>
      {showRegister && (
        <Style>
          <BackButton type='button' disabled={disabled} onClick={onBackButtonClick}>
            <RiArrowLeftSLine size={28} />
            <span>Voltar</span>
          </BackButton>

          <Logo />

          <Form ref={signupFormRef} onSubmit={handleSubmit}>
            <DualInput>
              <InputText
                name='name'
                className='name'
                placeholder='Nome'
                icon={MdPublic}
                size={21}
              />
              <hr />
              <InputText
                name='surname'
                placeholder='Sobrenome'
                icon={MdPublic}
                size={21}
              />
            </DualInput>

            <InfoText>
              Certifique-se de que corresponde ao nome no seu documento de indentificação
              oficial
            </InfoText>

            <DatePicker name='birthday' icon={FaUserLock} />

            <InputText name='email' placeholder='E-mail' icon={FaUserLock} />

            <InfoText>Enviaremos um e-mail para confirmação</InfoText>

            <DualInput>
              <InputText
                name='password'
                placeholder='Senha'
                icon={FaUserLock}
                type='password'
                eye
              />
              <hr />
              <InputText
                pasteAndDrop={false}
                type='password'
                name='confirmPassword'
                placeholder='Confirmar Senha'
                icon={FaUserLock}
              />
            </DualInput>

            <InfoText>
              <span>
                Ao clicar Concordar e concluir, concordo com os{' '}
                <a href='action'>Termos de uso</a>, os{' '}
                <a href='action'>Termos de Serviço e Pagamentos</a>, a{' '}
                <a href='action'>Política de Privacidade</a> e a{' '}
                <a href='action'>Política de Não Discriminação</a> do Steams Lab.
              </span>
            </InfoText>

            <Button type='submit'>Concordar e concluir</Button>
          </Form>
        </Style>
      )}
    </>
  )
}

export default Signup
