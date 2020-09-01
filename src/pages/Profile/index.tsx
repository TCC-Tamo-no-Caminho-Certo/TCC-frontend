import React, { useRef, useState, useEffect, useCallback } from 'react'
import Style, { DualInput, Recaptcha } from './styles'

import signupSchema from 'validations/signup'

import Button from 'components/Forms/Button'
import InputText from 'components/Forms/InputText'
import InputDate from 'components/Forms/InputDate'
import ThemeSwitch from 'components/ThemeSwitch'

import getValidationErrors from 'utils/getValidationErrors'

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

const Profile: React.FC = () => {
  const signupFormRef = useRef<FormHandles>(null)

  const onProfileSubmit: SubmitHandler<RegisterData> = async (data, { reset }, event) => {
    event?.preventDefault()

    try {
      await signupSchema.validate(data, { abortEarly: false })

      signupFormRef.current?.setErrors({})
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorList = getValidationErrors(error)
        signupFormRef.current?.setErrors(errorList)
      }
    }
  }

  return (
    <Style>
      <nav>
        <button type='button'>
          <RiArrowLeftSLine />

          <span>Voltar</span>
        </button>

        <ThemeSwitch />
      </nav>

      <Form ref={signupFormRef} onSubmit={onProfileSubmit}>
        <DualInput>
          <InputText name='name' placeholder='Nome' icon={MdPublic} iconSize='50%' />

          <InputText name='surname' placeholder='Sobrenome' icon={MdPublic} iconSize='50%' />
        </DualInput>

        <InputDate name='birthday' icon={FaUserLock} />

        <InputText name='email' placeholder='E-mail' icon={FaUserLock} />

        <DualInput>
          <InputText name='password' type='password' placeholder='Senha' icon={FaUserLock} eye />

          <InputText
            name='confirmPassword'
            type='password'
            placeholder='Confirmar Senha'
            icon={FaUserLock}
          />
        </DualInput>

        <Button type='submit'>Concordar e concluir</Button>
      </Form>
    </Style>
  )
}

export default Profile
