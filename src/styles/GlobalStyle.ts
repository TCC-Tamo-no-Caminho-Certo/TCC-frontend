import { Overflow } from 'App'
import { darken, lighten } from 'polished'
import { createGlobalStyle, css, DefaultTheme } from 'styled-components'

interface GlobalProps {
  overflow: Overflow
  theme: DefaultTheme
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

        ${({ theme }) =>
          theme.name === 'light'
            ? css`
                box-shadow: inset 0 0 10px 1px
                  ${({ theme }) => darken(0.2, theme.colors.secondary)};
              `
            : css`
                box-shadow: inset 0 0 10px 1px
                  ${({ theme }) => darken(0.2, theme.colors.secondary)};
              `}

        &:hover {
          ${({ theme }) =>
            theme.name === 'light'
              ? css`
                  box-shadow: inset 0 0 10px 1px
                    ${({ theme }) => lighten(3, theme.colors.secondary)};
                `
              : css`
                  box-shadow: inset 0 0 10px 1px
                    ${({ theme }) => lighten(3, theme.colors.secondary)};
                `}
        }
      }

      &::-webkit-scrollbar-corner {
        background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)}
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

      h1 {
        font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.3rem);
      }

      h2 {
        font-size: clamp(1.6rem, 0.6rem + 2.6vw, 2.1rem);
      }

      h3 {
        font-size: clamp(1.4rem, 0.6rem + 2.6vw, 1.9rem);
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
        cursor: pointer;
        font-size: clamp(1.6rem, 0.6rem + 2.6vw, 2rem);
        line-height: clamp(1.6rem, 0.6rem + 2.6vw, 2rem);
      }

      input[type="checkbox"] {
        &, &:focus, &:hover {
          box-shadow: initial;
        }
      }
    }

    
    ${({ overflow }) => css`
      overflow-y: ${overflow.y} !important;
      overflow-x: ${overflow.x} !important;
      overflow-y: ${overflow.overflow} !important;
    `}
  }

  @media screen and (min-width: 545px) {

    html body {
      &::-webkit-scrollbar {
        width: 16px;
        z-index: 100;
      }
    }
  }
`
