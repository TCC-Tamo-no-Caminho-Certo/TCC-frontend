import React, { useRef, useState, useEffect, useCallback } from 'react'
import Style, { DualInput, Recaptcha } from './styles'

import signupSchema from 'validations/signup'

import Button from 'components/Button'
import InputText from 'components/InputText'
import InputDate from 'components/InputDate'
import ThemeSwitch from 'components/ThemeSwitch'

import { useAuth } from 'hooks/useAuth'
import { useRegisterSlide } from 'hooks/useRegisterSlide'

import getValidationErrors from 'utils/getValidationErrors'

import { Logo } from 'assets/Logo'

import ReCAPTCHA from 'react-google-recaptcha'
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
  captcha: string
}

const Signup: React.FC = () => {
  const signupFormRef = useRef<FormHandles>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const { register } = useAuth()

  const { registerSlide, setRegisterSlide } = useRegisterSlide()
  const [showRegister, setShowRegister] = useState(false)
  const [disabled, setDisabled] = useState(true)

  const onSignupSubmit: SubmitHandler<RegisterData> = async (data, { reset }, event) => {
    event?.preventDefault()

    try {
      let captchaToken
      if (recaptchaRef.current) captchaToken = await recaptchaRef.current.executeAsync()
      else throw new Error('recaptcha is equal null or undefined')
      await signupSchema.validate(data, { abortEarly: false })

      const old = data.birthday.split('/')
      const birthday = `${old[2]}-${old[1]}-${old[0]}`

      console.log('signup', { ...data, birthday, captcha: captchaToken })
      await register({ ...data, birthday, captcha: captchaToken as string })

      signupFormRef.current?.setErrors({})
      reset()
      setRegisterSlide(false)
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)
        signupFormRef.current?.setErrors(errorList)
      }
    }
  }

  const loginSliderAnimation = useCallback(() => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 1000)

    if (registerSlide) setShowRegister(true)
    else {
      setTimeout(() => {
        setShowRegister(false)
      }, 1000)
    }
  }, [registerSlide])

  useEffect(() => {
    loginSliderAnimation()
  }, [loginSliderAnimation])

  return (
    <>
      <Recaptcha
        ref={recaptchaRef}
        size='invisible'
        sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
      />

      {showRegister && (
        <Style>
          <header>
            <button
              type='button'
              disabled={disabled}
              onClick={() => setRegisterSlide(false)}
            >
              <RiArrowLeftSLine />
              <span>Voltar</span>
            </button>

            <ThemeSwitch />
          </header>

          <Form ref={signupFormRef} onSubmit={onSignupSubmit}>
            {/* <Logo /> */}

            <DualInput>
              <InputText name='name' placeholder='Nome' iconSize='50%' icon={MdPublic} />

              <InputText
                name='surname'
                placeholder='Sobrenome'
                icon={MdPublic}
                iconSize='50%'
              />
            </DualInput>

            <span>
              Certifique-se de que corresponde ao nome no seu documento de identificação
              oficial
            </span>

            <InputDate name='birthday' icon={FaUserLock} />

            <span>Você precisa ter pelo menos 18 anos</span>

            <InputText name='email' placeholder='E-mail' icon={FaUserLock} />

            <span>Enviaremos um e-mail para confirmação</span>

            <DualInput>
              <InputText
                name='password'
                placeholder='Senha'
                icon={FaUserLock}
                type='password'
                eye
              />

              <InputText
                type='password'
                name='confirmPassword'
                placeholder='Confirmar Senha'
                icon={FaUserLock}
              />
            </DualInput>

            <span>
              Ao clicar em Concordar e concluir, concordo com os{' '}
              <a href='action'>Termos de uso</a>, os{' '}
              <a href='action'>Termos de Serviço e Pagamentos</a>, a{' '}
              <a href='action'>Política de Privacidade</a> e a{' '}
              <a href='action'>Política de Não Discriminação</a> do Steams Lab.
            </span>

            <Button type='submit'>Concordar e concluir</Button>
          </Form>
        </Style>
      )}
    </>
  )
}

export default Signup
