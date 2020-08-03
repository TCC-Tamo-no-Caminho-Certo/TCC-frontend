import React, { useState, ComponentType, useContext } from 'react'
import { Style } from './styles'
import ptbr from 'locales/dates/ptbr'
import { ErrorTooltip } from 'components/Tooltips'
import ModernDatePicker, { DayValue } from 'react-modern-calendar-datepicker'
import { useField } from '@unform/core'
import { ThemeContext } from 'styled-components'
import { IconBaseProps } from 'react-icons'
import { IoIosArrowDown } from 'react-icons/io'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

interface DatePickerProps {
  name: string
  size?: string
  icon?: ComponentType<IconBaseProps>
}

const present = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
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

const DatePicker: React.FC<DatePickerProps> = ({ name, size, icon: Icon }) => {
  const { fieldName, registerField, error, clearError } = useField(name)
  const [selectedDate, setSelectedDate] = useState<DayValue>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const themes = useContext(ThemeContext)

  const renderCustomInput = ({ ref }: any) => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
      clearValue: (input: any) => {
        input.clear()
      },
    })

    const onInputFocus = () => setIsFocused(true)

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

    return (
      <input
        ref={ref}
        type='text'
        placeholder='Data de nascimento'
        value={InputValue(selectedDate)}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
      />
    )
  }

  return (
    <Style
      hasIcon={!!Icon}
      isFilled={isFilled}
      isErrored={!!error}
      isFocused={isFocused}
      id={name}
    >
      {error ? <ErrorTooltip content={error} /> : Icon && <Icon size={size} />}

      <ModernDatePicker
        value={selectedDate}
        onChange={setSelectedDate}
        colorPrimary={themes.primary}
        renderInput={renderCustomInput}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        locale={ptbr}
        calendarClassName='CalendarSize'
      />

      <IoIosArrowDown />
    </Style>
  )
}

export default DatePicker
