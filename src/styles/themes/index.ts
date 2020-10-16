import light from './light'
import dark from './dark'

export { light, dark }

export interface ThemeAttributes {
  name: string

  primary: string
  secondary: string
  tertiary: string
  quaternary: string
  quinary: string

  background: string

  white: string

  calendarPrimary: string
  calendarSecondary: string
  calendarTertiary: string
  calendarDisabled: string
  calendarBackground: string
  calendarHeader: string
}