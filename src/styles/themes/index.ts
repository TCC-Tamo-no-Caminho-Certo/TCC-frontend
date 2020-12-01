import light from './light'
import dark from './dark'

export { light, dark }

export interface ThemeAttributes {
  name: string

  calendarPrimary: string
  calendarSecondary: string
  calendarTertiary: string
  calendarHeader: string
  calendarDisabled: string
  calendarBackground: string

  'base user': string
  'aris user': string
  professor: string
  customer: string
  student: string
  moderator: string
  evaluator: string
  admin: string
}
