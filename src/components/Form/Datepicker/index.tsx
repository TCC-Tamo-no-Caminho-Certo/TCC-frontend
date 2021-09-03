import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import Style from './styles'

import '../../../../node_modules/react-modern-calendar-datepicker/lib/DatePicker.css'
import Text, { TextProps } from '../Text'

import { datepickerToDate } from 'utils/dates'

import ptbr from 'i18n/dates/ptbr'
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker'

export interface DatepickerColors {
  body?: string
  header?: string
  disabled?: string
  selected?: string
}

export interface DatepickerProps extends TextProps {
  endYear?: number
  minimumDate?: any
  maximumDate?: any
  startYear?: number
  isBirthday?: boolean
  withoutStyle?: boolean
  dateColors?: DatepickerColors
  arrow?: 'auto' | 'top' | 'bottom'
}

type YearButton = HTMLButtonElement | null

const actualDate = new Date()

const present = {
  day: actualDate.getDate(),
  month: actualDate.getMonth(),
  year: actualDate.getFullYear()
}

const minimumDate = {
  day: present.day,
  year: present.year - 120,
  month: present.month + 1
}

const maximumDate = {
  day: present.day,
  year: present.year - 18,
  month: present.month + 1
}

const Datepicker = forwardRef<any, DatepickerProps>(
  (
    {
      name,
      arrow,
      value,
      endYear,
      startYear,
      icon: Icon,
      isBirthday,
      withoutStyle = false,
      minimumDate: minimumDateProp,
      maximumDate: maximumDateProp,
      dateColors = {
        body: '#fcfcfc',
        header: '#6e4850',
        selected: '#d65881',
        disabled: '#d62828'
      },
      ...rest
    },
    ref
  ) => {
    const [selectedDate, setSelectedDate] = useState<DayValue>(null)

    const renderCustomInput = useCallback(
      ({ ref }: any) => {
        const onClick = () => {
          const year: YearButton = document.querySelector('.Calendar__yearText')
          if (year && !selectedDate) year.click()
        }

        return !withoutStyle ? (
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
        ) : (
          <Text
            isDate
            readOnly
            ref={ref}
            id={name}
            name={name}
            icon={Icon}
            onClick={onClick}
            value={
              selectedDate ? datepickerToDate(selectedDate) : 'Selecione...'
            }
            {...rest}
          />
        )
      },
      [Icon, name, rest, selectedDate, withoutStyle]
    )

    useEffect(() => {
      setSelectedDate(value as DayValue)
    }, [value])

    return (
      <Style
        arrow={arrow}
        ref={ref as any}
        colors={dateColors}
        data-cy='Datepicker'
        className='Datepicker'
        withoutStyle={withoutStyle}
      >
        <div style={{ position: 'relative', zIndex: 3000 }}>
          <DatePicker
            locale={ptbr}
            data-cy='Calendar'
            value={selectedDate}
            onChange={setSelectedDate}
            calendarPopperPosition={arrow}
            renderInput={renderCustomInput}
            calendarClassName='CalendarSize'
            selectorEndingYear={endYear || present.year}
            selectorStartingYear={startYear || minimumDate.year}
            maximumDate={
              maximumDateProp || (isBirthday ? maximumDate : undefined)
            }
            minimumDate={
              minimumDateProp || (isBirthday ? minimumDate : undefined)
            }
          />
        </div>
      </Style>
    )
  }
)

export default Datepicker
