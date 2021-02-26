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
  bodyColor = '#6e4850',
  valueColor = '#d65881',
  headerColor = '#6e4850',
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
        className='Datepicker'
        ref={ref}
        id={name}
        name={name}
        icon={Icon}
        onClick={onClick}
        color={valueColor}
        value={InputValue(selectedDate)}
        {...rest}
      />
    )
  }

  return (
    <Style
      className='Datepicker'
      arrow={arrow}
      bodyColor={bodyColor}
      headerColor={headerColor}
      selectedColor={selectedColor}
      disabledColor={disabledColor}
    >
      <DatePicker
        calendarClassName='CalendarSize'
        locale={ptbr}
        value={selectedDate}
        onChange={setSelectedDate}
        renderInput={renderCustomInput}
        selectorEndingYear={present.year}
        selectorStartingYear={minimumDate.year}
        maximumDate={isBirthday ? maximumDate : undefined}
        minimumDate={isBirthday ? minimumDate : undefined}
      />
    </Style>
  )
}

export default Datepicker
