import React, { useState } from 'react'
import Style from './styles'

import '../../../../node_modules/react-modern-calendar-datepicker/lib/DatePicker.css'
import Input, { InputProps } from '../Input'

import ptbr from 'utils/locales/dates/ptbr'

import { RootState, ThemeState, useSelector } from 'store'

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
  arrow?: string
}

const InputDate: React.FC<InputDateProps> = ({ icon: Icon, value, arrow, ...rest }) => {
  const [selectedDate, setSelectedDate] = useState<DayValue>(null)
  const theme = useSelector<RootState, ThemeState>(state => state.theme)

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
        ref={ref}
        type='text'
        icon={Icon}
        onClick={onClick}
        value={InputValue(selectedDate) || value}
        readOnly
        {...rest}
      />
    )
  }

  return (
    <Style theme={theme} className='InputDate' arrow={arrow}>
      <DatePicker
        locale={ptbr}
        value={selectedDate}
        renderInput={renderCustomInput}
        onChange={setSelectedDate}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        selectorEndingYear={present.year}
        selectorStartingYear={minimumDate.year}
        colorPrimary='#D65881'
        calendarClassName='CalendarSize'
      />
    </Style>
  )
}

export default InputDate
