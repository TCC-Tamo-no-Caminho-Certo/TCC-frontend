import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string
    secondary: string
    tertiary: string

    calendarPrimary: string
    calendarSecondary: string
    calendarTertiary: string
    calendarDisabled: string
    calendarBackground: string
    calendarHeader: string
  }
}
