import { createGlobalStyle } from 'styled-components'
import fromTheme from 'utils/fromTheme'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
  body {
    font-size: 62.5%;
    background-color: ${fromTheme('background')}
  }
  a {
    text-decoration: none
  }
  ul {
    list-style: none;
  }
  button {
    cursor: pointer;
  }
`
