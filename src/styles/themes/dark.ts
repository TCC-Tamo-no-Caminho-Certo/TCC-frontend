import { ThemeAttributes } from './'

const dark: ThemeAttributes = {
  name: 'dark',

  colors: {
    primary: '#d65881',
    secondary: '#fcfcfc',
    tertiary: '#6e4850',
    white: '#fcfcfc',
    green: '#00d053',
    yellow: '#fff500',
    red: '#ff0000',
    gray: '#C4C4C4',
  },

  roles: {
    guest: '#fff500',
    aris: '#f20089',
    student: '#00d053',
    customer: '#ff6b00',
    professor: '#329dff',
    evaluator: '#ba5eff',
    moderator: '#64e3ff',
    admin: '#d62828',
  },

  sidebar: {
    selected: '#d65881',
    letters: '#fcfcfc',
    background: '#303030',
  },
}

export default dark
