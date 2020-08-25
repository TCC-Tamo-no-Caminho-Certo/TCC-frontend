import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string
    secondary: string
    tertiary: string

    white: string

    calendarPrimary: string
    calendarSecondary: string
    calendarTertiary: string
    calendarDisabled: string
    calendarBackground: string
    calendarHeader: string
  }
}
