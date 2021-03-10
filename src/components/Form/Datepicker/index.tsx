import React, { useCallback, useState } from 'react'
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

export const valueToDate = (date: string) => {
  const dates = date.split('T')[0].split('-')
  return date ? `${dates[2]}/${dates[1]}/${dates[0]}` : ''
}

type YearButton = HTMLButtonElement | null

export const dateToValue = (date?: string) => {
  if (date) {
    const dates = date.split('/')
    return `${dates[2]}-${dates[1]}-${dates[0]}`
  }

  return ''
}

const datePickerToDate = (date: DayValue) => {
  const day = date?.day
  const month = date?.month
  const year = date?.year

  return day && month && year
    ? `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
      }/${year}`
    : ''
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

  const renderCustomInput = useCallback(
    ({ ref }: any) => {
      const onClick = () => {
        const year: YearButton = document.querySelector('.Calendar__yearText')
        if (year && !selectedDate) year.click()
      }

      return (
        <Text
          isDate
          readOnly
          className='Datepicker'
          ref={ref}
          id={name}
          name={name}
          icon={Icon}
          onClick={onClick}
          color={valueColor}
          value={datePickerToDate(selectedDate)}
          {...rest}
        />
      )
    },
    [Icon, name, rest, selectedDate, valueColor]
  )

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
