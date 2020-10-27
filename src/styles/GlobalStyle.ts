import fromTheme from 'utils/fromTheme'

import { createGlobalStyle } from 'styled-components'

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
    scroll-behavior: smooth;
  }

  body {
    font-size: 1.6rem;
    color: ${fromTheme('tertiary')};
    background-color: ${fromTheme('background')};

    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0 30px white inset !important;
      box-shadow: 0 0 0 30px white inset !important;
    }

    &::-webkit-scrollbar {
      width: 12px;
      background-color: ${fromTheme('quaternary')};
    }

    &::-webkit-scrollbar-track {
      border-radius: 1px;
    }

    &::-webkit-scrollbar-thumb {
      box-shadow: inset 0 0 10px 1px rgba(255,255,255,0.8);
      border: solid 2px transparent;
      border-radius: 4px;


      &:hover {
        box-shadow: inset 0 0 10px 1px rgba(255,255,255,1);
      }
    }
  }

  a {
    text-decoration: none;
    color: ${fromTheme('primary')};
  }

  li {
    list-style-type: none;
  }

  button {
    background-color: transparent;
    border: none;
    font-size: 1.6rem;
  }

  button, label, input[type="checkbox"] {
    cursor: pointer
  }

  input[type="checkbox"] {
    &, &:focus, &:hover {
      box-shadow: initial;
    }
  }
`
