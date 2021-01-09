import light from './light'
import dark from './dark'

export { light, dark }

export interface ThemeAttributes {
  name: string

  colors: {
    primary: string
    secondary: string
    tertiary: string
    white: string
    green: string
    yellow: string
    red: string
  }

  calendar: {
    primary: string
    secondary: string
    tertiary: string
    header: string
    disabled: string
    background: string
  }

  roles: {
    guest: string
    aris: string
    professor: string
    customer: string
    student: string
    moderator: string
    evaluator: string
    admin: string
  }

  sidebar: {
    selected: string
    letters: string
    background: string
  }
}
