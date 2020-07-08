import {createGlobalStyle} from "styled-components"
import cursor from "assets/cursor.cur"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Satisfy', cursive;
    cursor: url(${cursor}), default;
    &:focus {
      outline: none;
    }
  }
  html body {
    font-size: 62.5%;
  }
  button {
    cursor: pointer;
  }
  label {
    margin-bottom: 0px;
  }
  ul {
    list-style: none;
  }
  svg {
    overflow: visible;
  }
  a {
    &:link {
      text-decoration: none;
    }
  }
`

export default GlobalStyle
