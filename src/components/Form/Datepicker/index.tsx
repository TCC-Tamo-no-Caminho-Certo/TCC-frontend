import React, { useCallback, useState } from 'react'
import Style from './styles'

import '../../../../node_modules/react-modern-calendar-datepicker/lib/DatePicker.css'
import Text, { TextProps } from '../Text'

import ptbr from 'utils/locales/dates/ptbr'
import { datepickerToDate } from 'utils/dates'

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

type YearButton = HTMLButtonElement | null

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

const Datepicker = ({
  name,
  arrow,
  isBirthday,
  icon: Icon,
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
          value={datepickerToDate(selectedDate)}
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
