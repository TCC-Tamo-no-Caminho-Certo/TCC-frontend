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

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    color: ${fromTheme('tertiary')};
    background-color: ${fromTheme('primary')};
  }

  a {
    color: ${fromTheme('primary')};
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    background-color: transparent;
    border: none;
    font-size: 1.6rem;
    cursor: pointer;
  }

  input, select, textarea {
    &, &:hover, &:focus  {
      box-shadow: 0 0 0 30px ${fromTheme('secondary')} inset;
    }
  }

  input[type="checkbox"] {
    &, &:focus, &:hover {
      box-shadow: initial;
    }
  }
`
