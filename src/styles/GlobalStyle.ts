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
    background-color: ${fromTheme('quinary')};


    ::-webkit-scrollbar {
      width: 12px;

      background-color: ${fromTheme('tertiary')};
    }

    ::-webkit-scrollbar-track {
      border-radius: 1px;
    }

    ::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.90);
      border: solid 2px transparent;
      border-radius: 1px;
    }
  }

  a {
    text-decoration: none;
    color: ${fromTheme('primary')};
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
