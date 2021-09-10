import lightTheme from './light'
import darkTheme from './dark'
import css from './css'

import { RoleType } from 'types/Responses/user/roles'

export interface Themes {
  name: string
  shadow: { light: string; normal: string; invertedNormal: string }
  colors: {
    red: string
    gray: string
    green: string
    white: string
    yellow: string
    primary: string
    tertiary: string
    secondary: string
    roles: { [_key in RoleType]: string }
    sidebar: { letters: string; selected: string; background: string }
  }
}

export const dark: Themes = { ...darkTheme, ...css }
export const light: Themes = { ...lightTheme, ...css }

export default {}
