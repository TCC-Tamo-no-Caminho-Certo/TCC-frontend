import React, { useState } from 'react'
import Style from './styles'

import '../../../../node_modules/react-modern-calendar-datepicker/lib/DatePicker.css'
import Input, { InputProps } from '../Input'

import ptbr from 'utils/locales/dates/ptbr'

import DatePicker, { DayValue } from 'react-modern-calendar-datepicker'

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

interface InputDateProps extends InputProps {
  valueColor?: string
  headerColor?: string
  bodyColor?: string
  disabledColor?: string
  selectedColor?: string

  arrow?: string
  isBirthday?: boolean
}

const InputDate: React.FC<InputDateProps> = ({
  valueColor = '#d65881',
  headerColor = '#6e4850',
  bodyColor = '#6e4850',
  selectedColor = '#d65881',
  disabledColor = '#d62828',
  isBirthday,
  arrow,
  icon: Icon,
  value,
  name,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState<DayValue>(null)

  const renderCustomInput = ({ ref }: any) => {
    const InputValue = (date: DayValue) => {
      return date
        ? `${date.day < 10 ? `0${date.day}` : date.day}/${
            date.month < 10 ? `0${date.month}` : date.month
          }/${date.year}`
        : ''
    }

    const onClick = () => {
      const year: HTMLButtonElement | null = document.querySelector('.Calendar__yearText')
      if (year && !selectedDate) year.click()
    }

    return (
      <Input
        readOnly
        ref={ref}
        id={name}
        type='text'
        icon={Icon}
        color={valueColor}
        onClick={onClick}
        value={InputValue(selectedDate) || value}
        {...rest}
      />
    )
  }

  return (
    <>
      <Style
        className='InputDate'
        arrow={arrow}
        headerColor={headerColor}
        bodyColor={bodyColor}
        selectedColor={selectedColor}
        disabledColor={disabledColor}
      >
        <DatePicker
          locale={ptbr}
          value={selectedDate}
          renderInput={renderCustomInput}
          onChange={setSelectedDate}
          minimumDate={isBirthday ? minimumDate : undefined}
          maximumDate={isBirthday ? maximumDate : undefined}
          selectorEndingYear={present.year}
          selectorStartingYear={minimumDate.year}
          calendarClassName='CalendarSize'
        />
      </Style>
    </>
  )
}

export default InputDate
