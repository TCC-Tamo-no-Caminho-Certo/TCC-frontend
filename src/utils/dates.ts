import { DayValue } from 'react-modern-calendar-datepicker'

type ReturnType = 'all' | 'day/month' | 'day/month/2-year' | 'day/inFull-year'

type Month =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'

const getMonthLabel = (month: Month) => {
  const months = {
    '01': 'jan',
    '02': 'fev',
    '03': 'mar',
    '04': 'mai',
    '05': 'abr',
    '06': 'jun',
    '07': 'jul',
    '08': 'ago',
    '09': 'set',
    10: 'out',
    11: 'nov',
    12: 'dez'
  }

  return months[month]
}

export const isoToDate = (date: string, returnType: ReturnType): string => {
  const dates = date?.split('T')[0]?.split('-')

  if (dates)
    switch (returnType) {
      case 'all':
        return `${dates[2]}/${dates[1]}/${dates[0]}`

      case 'day/month':
        return `${dates[2]}/${dates[1]}`

      case 'day/month/2-year': {
        const year = dates[0].split('')
        return `${dates[2]}/${dates[1]}/${year[2] + year[3]}`
      }

      case 'day/inFull-year':
        return date[2] + getMonthLabel(date[1] as Month)

      default:
        return ''
    }

  return ''
}

export const isoToDatepicker = (date?: string): DayValue => {
  const dates = date?.split('T')[0].split('-')

  if (dates)
    return {
      day: Number(dates[2]),
      year: Number(dates[0]),
      month: Number(dates[1])
    }
  else return { day: 0, year: 0, month: 0 }
}

export const dateToValue = (date?: string) => {
  if (date) {
    const dates = date?.split('/')
    return `${dates[2]}-${dates[1]}-${dates[0]}`
  }

  return ''
}

export const datepickerToDate = (date: DayValue) => {
  const day = date?.day
  const year = date?.year
  const month = date?.month

  return day && month && year
    ? `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
      }/${year}`
    : ''
}
