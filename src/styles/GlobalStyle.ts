import { darken } from 'polished'
import { createGlobalStyle, css } from 'styled-components'

interface GlobalProps {
  overflow: string
}

export default createGlobalStyle<GlobalProps>`
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;

    * {
      margin: 0;
      padding: 0;
      outline: 0;
      box-sizing: border-box;
      font-family: 'Roboto', sans-serif;
    }

    body {
      font-size: clamp(1.6rem, 0.6rem + 2.6vw, 1.9rem);
      line-height: clamp(1.6rem, 0.6rem + 2.6vw, 1.9rem);

      color: ${({ theme }) => theme.colors.tertiary};
      background-color: ${({ theme }) => theme.colors.primary};

      &::-webkit-scrollbar {
        width: 8px;

        background-color:${({ theme }) => darken(0.1, theme.colors.tertiary)};
      }

      &::-webkit-scrollbar-track {
        border-radius: 1px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;

        border: solid 2px transparent;
        box-shadow: inset 0 0 10px 1px rgba(255,255,255,0.8);

        &:hover {
          box-shadow: inset 0 0 10px 1px rgba(255,255,255,1);
        }
      }
      
      input:-webkit-autofill,
      input:-webkit-autofill:hover, 
      input:-webkit-autofill:focus, 
      input:-webkit-autofill:active  {
        transition: background-color 5000s ease-in-out 0s;
      }

      span, p, h1, h2, h3, h4, h5 {
        cursor: default;
        font-weight: normal;
      }

      a {
        text-decoration: none;

        color: ${({ theme }) => theme.colors.primary};
      }

      li {
        list-style-type: none;
      }

      button {
        border: none;
        background-color: transparent;
      }

      button, label, input[type="checkbox"] {
        font-size: clamp(1.6rem, 0.6rem + 2.6vw, 2rem);
        line-height: clamp(1.6rem, 0.6rem + 2.6vw, 2rem);

        cursor: pointer;
      }

      input[type="checkbox"] {
        &, &:focus, &:hover {
          box-shadow: initial;
        }
      }

      ${({ overflow }) =>
        overflow === 'hidden' &&
        css`
          overflow: hidden;
        `}
       
    }
  }

  @media screen and (min-width: 545px) {
    html body::-webkit-scrollbar {
      width: 16px;
    }
  }
`
