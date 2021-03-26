import React, { useCallback, useState } from 'react'
import Style from './styles'

import '../../../../node_modules/react-modern-calendar-datepicker/lib/DatePicker.css'
import Text, { TextProps } from '../Text'

import ptbr from 'utils/locales/dates/ptbr'

import DatePicker, { DayValue } from 'react-modern-calendar-datepicker'

export interface DatepickerColors {
  header?: string
  body?: string
  disabled?: string
  selected?: string
}

interface DatepickerProps extends TextProps {
  arrow?: 'auto' | 'top' | 'bottom'
  isBirthday?: boolean
  dateColors?: DatepickerColors
}

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
  icon: Icon,
  isBirthday,
  arrow,
  name,
  dateColors = {
    body: '#fcfcfc',
    header: '#6e4850',
    selected: '#d65881',
    disabled: '#d62828'
  },
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
          ref={ref}
          id={name}
          name={name}
          icon={Icon}
          onClick={onClick}
          value={datePickerToDate(selectedDate)}
          {...rest}
        />
      )
    },
    [Icon, name, rest, selectedDate]
  )

  return (
    <Style className='Datepicker' arrow={arrow} colors={dateColors}>
      <DatePicker
        calendarClassName='CalendarSize'
        calendarPopperPosition={arrow}
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
