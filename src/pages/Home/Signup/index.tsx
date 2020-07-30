import React, { useRef, useCallback, useState, useEffect } from 'react'
import { Style, BackButton, Text } from './styles'
import signupSchema from 'validations/signup'
import Button from 'components/Button'
import { useRegisterSlide } from 'hooks/useRegisterSlide'
import getValidationErrors from 'utils/getValidationErrors'
import { Logo } from 'assets/Logo'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { MdPublic } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { FaUserLock } from 'react-icons/fa'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { FormHandles, SubmitHandler } from '@unform/core'
import InputText from '../../../components/InputText/index'

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
          <BackButton
            type='button'
            disabled={disabled}
            onClick={onBackButtonClick}
          >
            <RiArrowLeftSLine size={28} />
            <span>Voltar</span>
          </BackButton>
          <Logo />

          <Form ref={signupFormRef} onSubmit={onSignupSubmit}>
            <div>
              <InputText
                name='name'
                className='name'
                placeholder='Nome'
                icon={MdPublic}
              />
              <hr />
              <InputText
                name='surname'
                placeholder='Sobrenome'
                icon={MdPublic}
              />
            </div>
            <Text>
              Certifique-se de que corresponde ao nome no seu documento de
              indentificação oficial
            </Text>
            <InputText
              name='date'
              placeholder='Data de nascimento'
              icon={FaUserLock}
            />
            <InputText name='email' placeholder='E-mail' icon={FaUserLock} />

            <Text>Enviaremos um e-mail para confirmação</Text>
            <InputText
              name='password'
              placeholder='Senha'
              icon={FaUserLock}
              type='password'
              eye
            />
            <InputText
              type='password'
              name='confirm_password'
              placeholder='Confirmar Senha'
              icon={FaUserLock}
            />
            <Text>
              <span>
                Ao clicar Concordar e concluir, concordo com os{' '}
                <a href='action'>Termos de uso</a>, os{' '}
                <a href='action'>Termos de Serviço e Pagamentos</a>, a{' '}
                <a href='action'>Política de Privacidade</a> e a{' '}
                <a href='action'>Política de Não Discriminação</a> do Steams
                Lab.
              </span>
            </Text>
            <Button type='submit'>Concordar e concluir</Button>
          </Form>
        </Style>
      )}
    </>
  )
}

export default Signup
