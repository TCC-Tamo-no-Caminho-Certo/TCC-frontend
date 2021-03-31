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
  const dates = date.split('T')[0].split('-')

  if (returnType === 'all') return `${dates[2]}/${dates[1]}/${dates[0]}`
  if (returnType === 'day/month') return `${dates[2]}/${dates[1]}`
  if (returnType === 'day/month/2-year') {
    const year = dates[0].split('')
    return `${dates[2]}/${dates[1]}/${year[2] + year[3]}`
  }
  if (returnType === 'day/inFull-year')
    return date[2] + getMonthLabel(date[1] as Month)
  return ''
}

export const dateToValue = (date?: string) => {
  if (date) return date.replaceAll('/', '-')
  return ''
}

export const datepickerToDate = (date: DayValue) => {
  const day = date?.day
  const month = date?.month
  const year = date?.year

  return day && month && year
    ? `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
      }/${year}`
    : ''
}
