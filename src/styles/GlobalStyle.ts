import { darken } from 'polished'
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
    color: #6E4850;
    background-color: #D65881;
    
    span, p, h1, h2, h3, h4, h5 {
      cursor: default;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus, 
    input:-webkit-autofill:active  {
      transition: background-color 5000s ease-in-out 0s;
    }


    &::-webkit-scrollbar {
      width: 12px;
      background-color:${darken(0.1, '#6e4850')};
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
    color: #D65881;
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
