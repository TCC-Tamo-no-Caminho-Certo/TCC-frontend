import React, { useState } from 'react'
import Style from './styles'

import '../../../../node_modules/react-modern-calendar-datepicker/lib/DatePicker.css'
import Text, { TextProps } from '../Text'

import ptbr from 'utils/locales/dates/ptbr'

import DatePicker, { DayValue } from 'react-modern-calendar-datepicker'

const actualDate = new Date()

const present = {
  year: actualDate.getFullYear(),
  month: actualDate.getMonth(),
  day: actualDate.getDate()
}

const minimumDate = {
  year: present.year - 120,
  month: present.month + 1,
  day: present.day
}

const maximumDate = {
  year: present.year - 18,
  month: present.month + 1,
  day: present.day
}

interface DatepickerProps extends TextProps {
  valueColor?: string
  headerColor?: string
  bodyColor?: string
  disabledColor?: string
  selectedColor?: string
  arrow?: string
  isBirthday?: boolean
}

const Datepicker = ({
  valueColor = '#d65881',
  headerColor = '#6e4850',
  bodyColor = '#6e4850',
  selectedColor = '#d65881',
  disabledColor = '#d62828',
  icon: Icon,
  isBirthday,
  arrow,
  name,
  ...rest
}: DatepickerProps) => {
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
      const year: HTMLButtonElement | null = document.querySelector(
        '.Calendar__yearText'
      )
      if (year && !selectedDate) year.click()
    }

    return (
      <Text
        readOnly
        ref={ref}
        name={name}
        id={name}
        icon={Icon}
        color={valueColor}
        onClick={onClick}
        value={InputValue(selectedDate)}
        className='Datepicker'
        {...rest}
      />
    )
  }

  return (
    <Style
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
  )
}

export default Datepicker
