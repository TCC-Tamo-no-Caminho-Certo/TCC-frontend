import light from './light'
import dark from './dark'

export { light, dark }

interface Themes {
  name: string
  colors: {
    red: string
    gray: string
    green: string
    white: string
    yellow: string
    primary: string
    tertiary: string
    secondary: string
  }
  roles: {
    admin: string
    guest: string
    student: string
    customer: string
    professor: string
    moderator: string
    evaluator: string
  }
  sidebar: {
    letters: string
    selected: string
    background: string
  }
}

export default Themes
