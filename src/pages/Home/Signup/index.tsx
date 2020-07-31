import React, { useRef, useCallback, useState, useEffect } from 'react'
import { Style, BackButton, Text, DualInput } from './styles'
import signupSchema from 'validations/signup'
import Button from 'components/Button'
import InputText from 'components/InputText/index'
import { useRegisterSlide } from 'hooks/useRegisterSlide'
import getValidationErrors from 'utils/getValidationErrors'
import { Logo } from 'assets/Logo'
import * as Yup from 'yup'
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker'
import { Form } from '@unform/web'
import { MdPublic } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { FaUserLock } from 'react-icons/fa'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { FormHandles, SubmitHandler } from '@unform/core'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

interface FormData {
  emai: string
  password: string
}

interface TodayObject {
  year: number
  month: number
  day: number
}

const myCustomLocale = {
  // months list by order
  months: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],

  // week days by order
  weekDays: [
    {
      name: 'Domingo', // used for accessibility
      short: 'D', // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
    {
      name: 'Segunda',
      short: 'S',
    },
    {
      name: 'Terça',
      short: 'T',
    },
    {
      name: 'Quarta',
      short: 'Q',
    },
    {
      name: 'Quinta',
      short: 'Q',
    },
    {
      name: 'Sexta',
      short: 'S',
    },
    {
      name: 'Sabado',
      short: 'S',
      isWeekend: true,
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 0,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject: TodayObject) {
    return gregorainTodayObject
  },

  // return a native JavaScript date here
  toNativeDate(date: TodayObject) {
    return new Date(date.year, date.month - 1, date.day)
  },

  // return a number for date's month length
  getMonthLength(date: TodayObject) {
    return new Date(date.year, date.month, 0).getDate()
  },

  // return a transformed digit to your locale
  transformDigit(digit: string | number) {
    return digit
  },

  // texts in the date picker
  nextMonth: 'Próximo mês',
  previousMonth: 'Mês anterior',
  openMonthSelector: 'Selecionar mês',
  openYearSelector: 'Selecionar ano',
  closeMonthSelector: 'Fechar seleção de mês',
  closeYearSelector: 'Fechar seleção de ano',
  defaultPlaceholder: 'Selecione...',

  // for input range value
  from: 'de',
  to: 'até',

  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
}

const Signup: React.FC = () => {
  const signupFormRef = useRef<FormHandles>(null)
  const history = useHistory()
  const { registerSlide, setRegisterSlide } = useRegisterSlide()
  const [showRegister, setShowRegister] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [date, setDate] = useState<DayValue>(null)

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

            <Text>
              Certifique-se de que corresponde ao nome no seu documento de
              indentificação oficial
            </Text>

            <InputText name='email' placeholder='E-mail' icon={FaUserLock} />

            <Text>Enviaremos um e-mail para confirmação</Text>

            <DatePicker
              value={date}
              onChange={setDate}
              locale={myCustomLocale}
            />

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
