import React, { useRef, useState, useEffect, useCallback } from 'react'
import Style, { DualInput, Recaptcha } from './styles'

import signupSchema from 'validations/signup'

import Button from 'components/Forms/Button'
import InputText from 'components/Forms/InputText'
import InputDate from 'components/Forms/InputDate'
import ThemeSwitch from 'components/ThemeSwitch'
import { Atributes } from 'components/Modal'

import { useAuth } from 'hooks/useAuth'
import { useHomeSlider } from 'hooks/useHomeSlider'

import getValidationErrors from 'utils/getValidationErrors'

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

interface SignupProps {
  setModalVisible: (Atribute: Atributes) => void
}

const Signup: React.FC<SignupProps> = ({ setModalVisible }) => {
  const signupFormRef = useRef<FormHandles>(null)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const { register } = useAuth()

  const { homeSlider, setHomeSlider } = useHomeSlider()
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

      await register({ ...data, birthday, captcha: captchaToken as string })
      setModalVisible({
        visible: true,
        title: 'Sucesso!',
        message:
          'Agora só falta confirmar seu cadastro clicando no link que enviamos para o seu email',
        color: '#13c47c',
      })
      signupFormRef.current?.setErrors({})
      setHomeSlider(false)
    } catch (error) {
      console.log(error)
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)
        signupFormRef.current?.setErrors(errorList)
      } else {
        setModalVisible({
          visible: true,
          title: 'Erro!',
          message: 'Verifique se o email já é cadastrado, e tente novamente',
          color: '#e8423f',
        })
      }
    }
  }

  const loginSliderAnimation = useCallback(() => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 1000)

    if (homeSlider) setShowRegister(true)
    else {
      setTimeout(() => {
        setShowRegister(false)
      }, 1000)
    }
  }, [homeSlider])

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
          <nav>
            <button type='button' disabled={disabled} onClick={() => setHomeSlider(false)}>
              <RiArrowLeftSLine />

              <span>Voltar</span>
            </button>

            <ThemeSwitch />
          </nav>

          <Form ref={signupFormRef} onSubmit={onSignupSubmit}>
            <DualInput>
              <InputText
                name='name'
                placeholder='Nome'
                icon={MdPublic}
                iconSize='50%'
                autoComplete='given-name'
              />

              <InputText
                name='surname'
                placeholder='Sobrenome'
                icon={MdPublic}
                iconSize='50%'
                autoComplete='family-name'
              />
            </DualInput>

            <span>
              Certifique-se de que corresponde ao nome no seu documento de identificação oficial
            </span>

            <InputDate name='birthday' icon={FaUserLock} />

            <span>Você precisa ter pelo menos 18 anos</span>

            <InputText name='email' placeholder='E-mail' icon={FaUserLock} autoComplete='email' />

            <span>Enviaremos um e-mail para confirmação</span>

            <DualInput>
              <InputText
                name='password'
                type='password'
                placeholder='Senha'
                icon={FaUserLock}
                eye
                autoComplete='new-password'
              />

              <InputText
                name='confirmPassword'
                type='password'
                placeholder='Confirmar Senha'
                icon={FaUserLock}
                autoComplete='new-password'
              />
            </DualInput>

            <span>
              Ao clicar em Concordar e concluir, concordo com os <a href='.'>Termos de uso</a>, os{' '}
              <a href='.'>Termos de Serviço e Pagamentos</a>, a{' '}
              <a href='.'>Política de Privacidade</a> e a{' '}
              <a href='.'>Política de Não Discriminação</a> do Steams Lab.
            </span>

            <Button type='submit'>Concordar e concluir</Button>
          </Form>
        </Style>
      )}
    </>
  )
}

export default Signup
