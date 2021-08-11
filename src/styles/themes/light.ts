import Themes from './'

const light: Themes = {
  name: 'light',
  colors: {
    red: '#d62828',
    gray: '#C4C4C4',
    green: '#00d053',
    white: '#fcfcfc',
    yellow: '#f5d936',
    primary: '#d65881',
    tertiary: '#6e4850',
    secondary: '#fcfcfc'
  },
  roles: {
    administrator: '#d62828',
    guest: '#f5d936',
    student: '#00d053',
    customer: '#ff6b00',
    professor: '#329dff',
    evaluator: '#ba5eff',
    moderator: '#64e3ff',
    developer: '#400080'
  },
  sidebar: {
    letters: '#fcfcfc',
    selected: '#6e4850',
    background: '#d65881'
  }
}

export default light
