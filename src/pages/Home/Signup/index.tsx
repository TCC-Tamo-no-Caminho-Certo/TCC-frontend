import React, { useRef, useState, useEffect } from 'react'
import Style, { BackButton, InfoText, DualInput } from './styles'
import signupSchema from 'validations/signup'
import Button from 'components/Button'
import DatePicker from 'components/InputDate'
import InputText from 'components/InputText/index'
import { useRegisterSlide } from 'hooks/useRegisterSlide'
import { useAuth } from 'hooks/useAuth'
import getValidationErrors from 'utils/getValidationErrors'
import { Logo } from 'assets/Logo'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { MdPublic } from 'react-icons/md'
import { FaUserLock } from 'react-icons/fa'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { FormHandles, SubmitHandler } from '@unform/core'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

export interface RegisterData {
  name: string
  surname: string
  email: string
  birthday: string
  password: string
  captcha: string
}

const Signup: React.FC = () => {
  const signupFormRef = useRef<FormHandles>(null)
  const [disabled, setDisabled] = useState(true)
  const [showRegister, setShowRegister] = useState(false)
  const { register } = useAuth()
  const { registerSlide, setRegisterSlide } = useRegisterSlide()
  const [captchaToken, setCaptchaToken] = useState('')

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
      const old = data.birthday.split('/')
      const birthday = `${old[2]}-${old[1]}-${old[0]}`
      console.log({ ...data, birthday, captcha: captchaToken })
      await register({ ...data, birthday, captcha: captchaToken })
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

            <InfoText>Você precisa ter pelo menos 18 anos</InfoText>

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

            <GoogleReCaptcha onVerify={token => setCaptchaToken(token)} />

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
