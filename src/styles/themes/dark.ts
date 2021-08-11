import Themes from './'

const dark: Themes = {
  name: 'dark',
  colors: {
    red: '#d62828',
    gray: '#C4C4C4',
    green: '#00d053',
    white: '#fcfcfc',
    yellow: '#fff500',
    primary: '#d65881',
    tertiary: '#a6a6a6',
    secondary: '#121212'
  },
  roles: {
    administrator: '#d62828',
    guest: '#fff500',
    student: '#00d053',
    customer: '#ff6b00',
    professor: '#329dff',
    evaluator: '#ba5eff',
    moderator: '#64e3ff',
    developer: '#400080'
  },
  sidebar: {
    letters: '#fcfcfc',
    selected: '#d65881',
    background: '#303030'
  }
}

export default dark
