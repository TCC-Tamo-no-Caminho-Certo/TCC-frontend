import React, { useEffect, useState, useRef } from 'react'

import { PasswordBlock } from './styles'
import Style, { Recaptcha } from '../styles'

import Logo from 'styles/Logo'

import { passwordSchema } from 'utils/validations/forgotPassword'
import getValidationErrors from 'utils/getValidationErrors'

import api from 'services/api'

import InputText from 'components/Forms/InputText'
import Modal, { ModalAttributes } from 'components/Modal'

import * as Yup from 'yup'
import ReCAPTCHA from 'react-google-recaptcha'
import { Form } from '@unform/web'
import { FiLock } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { SubmitHandler, FormHandles } from '@unform/core'

interface ResetPassword {
  password: string
  token: string | null
}

const ConfirmPassword: React.FC = () => {
  const [modalAttributes, setModalAttributes] = useState<ModalAttributes>({ visible: false })

  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const passwordRef = useRef<FormHandles>(null)

  const history = useHistory()
  let token: string

  useEffect(() => {
    const path = window.location.pathname.split('/')
    // eslint-disable-next-line
    token = path[2]
  }, [])

  const handleModalOKClick = () => {
    setModalAttributes({ visible: false })
    history.push('/')
  }

  const handleResetPassSubmit: SubmitHandler<ResetPassword> = async (data, { reset }, event) => {
    event?.preventDefault()
    try {
      await passwordSchema.validate(data, { abortEarly: false })
      passwordRef.current?.setErrors({})
      const resetToken = token || localStorage.getItem('reset-password-token')
      // eslint-disable-next-line
      data.token = resetToken

      let captchaToken
      if (recaptchaRef.current) {
        captchaToken = await recaptchaRef.current.executeAsync()
      } else {
        throw new Error('recaptcha is equal null or undefined')
      }

      await api.post('reset-password', { ...data, captcha: captchaToken as string })
      reset()
      setModalAttributes({
        visible: true,
        title: 'Sucesso',
        message: 'Senha Alterada',
        color: '#13c47c',
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)
        passwordRef.current?.setErrors(errorList)
      }
      console.log(error)
    }
  }

  return (
    <>
      <Recaptcha
        ref={recaptchaRef}
        size='invisible'
        sitekey='6LfC97YZAAAAANhOv1bglq0SOzU8WMjL2R64l1xD'
      />
      <Modal {...modalAttributes} onOKClick={handleModalOKClick} />
      <Style>
        <article>
          <header>
            <Logo />
          </header>

          <PasswordBlock>
            <Form onSubmit={handleResetPassSubmit} ref={passwordRef}>
              <h2>Digite sua nova senha</h2>
              <InputText
                name='password'
                type='password'
                placeholder='Senha'
                eye
                icon={FiLock}
                size={23}
              />
              <h2>Confirme sua nova senha</h2>
              <InputText
                eye
                type='password'
                name='confirmPassword'
                placeholder='Confirmar senha'
                icon={FiLock}
                size={23}
              />

              <button type='submit'> Redefinir</button>
            </Form>
          </PasswordBlock>
        </article>
      </Style>
    </>
  )
}

export default ConfirmPassword
