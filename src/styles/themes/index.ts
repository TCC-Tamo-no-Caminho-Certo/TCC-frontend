import light from './light'
import dark from './dark'

import { RoleType } from 'types/Responses/user/roles'

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
  sidebar: {
    letters: string
    selected: string
    background: string
  }
  roles: {
    [_key in RoleType]: string
  }
}

export default Themes
