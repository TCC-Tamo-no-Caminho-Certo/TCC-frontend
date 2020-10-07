import React, { useState, ComponentType } from 'react'
import Style from './styles'

import ptbr from 'locales/dates/ptbr'

import { ErrorTooltip } from 'components/Tooltips'

import { ThemeState } from 'store/Theme'
import { useSelector, RootState } from 'store'

import ModernDatePicker, { DayValue } from 'react-modern-calendar-datepicker'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'

import '../../../../node_modules/react-modern-calendar-datepicker/lib/DatePicker.css'

interface InputDateProps {
  name: string
  icon?: ComponentType<IconBaseProps>

  iconSize?: string
  errorSize?: string
}

const actualDate = new Date()

const present = {
  year: actualDate.getFullYear(),
  month: actualDate.getMonth(),
  day: actualDate.getDate(),
}

const minimumDate = {
  year: present.year - 120,
  month: present.month + 1,
  day: present.day,
}

const maximumDate = {
  year: present.year - 18,
  month: present.month + 1,
  day: present.day,
}

const InputDate: React.FC<InputDateProps> = ({
  name,
  icon: Icon,

  iconSize = '40%',
  errorSize = '55%',
}) => {
  const { fieldName, registerField, error, clearError } = useField(name)
  const [selectedDate, setSelectedDate] = useState<DayValue>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

  const renderCustomInput = ({ ref }: any) => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
    })

    const onInputFocus = () => {
      setIsFocused(true)
    }

    const onInputBlur = () => {
      setIsFocused(false)
      setIsFilled(!!ref.current?.value)
      clearError()
    }

    const InputValue = (date: DayValue) => {
      return date
        ? `${date.day < 10 ? `0${date.day}` : date.day}/${
            date.month < 10 ? `0${date.month}` : date.month
          }/${date.year}`
        : ''
    }

    const onFirstClick = () => {
      const year: HTMLButtonElement | null = document.querySelector('.Calendar__yearText')
      if (year && ref.current.value === '') year.click()
    }

    return (
      <input
        type='text'
        placeholder='Data de nascimento'
        ref={ref}
        value={InputValue(selectedDate)}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        onClick={onFirstClick}
        readOnly
      />
    )
  }

  return (
    <Style
      id={name}
      theme={theme}
      hasIcon={!!Icon}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      iconSize={iconSize}
      errorSize={errorSize}
      className='InputDate'
    >
      {error ? <ErrorTooltip content={error} /> : Icon && <Icon className='icon' />}

      <ModernDatePicker
        locale={ptbr}
        value={selectedDate}
        renderInput={renderCustomInput}
        onChange={setSelectedDate}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        selectorEndingYear={present.year}
        selectorStartingYear={minimumDate.year}
        colorPrimary={theme.primary}
        calendarPopperPosition='bottom'
        calendarClassName='CalendarSize'
      />
    </Style>
  )
}

export default InputDate
