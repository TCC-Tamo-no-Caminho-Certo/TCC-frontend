import styled, { createGlobalStyle, keyframes } from 'styled-components'

import fromTheme from 'utils/fromTheme'

interface LoadingComponentProps {
  border: string
  size: string
}

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
    background-color: ${fromTheme('primary')};
    color: ${fromTheme('tertiary')}
  }

  a {
    color: ${fromTheme('primary')};
    text-decoration: none;

    &:hover {
      color: #408cff;
    }
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

const spin = keyframes`
  0% {
    transform: rotate(0deg);
    }
  100% {
    transform: rotate(360deg);
    }
`

export const Loader = styled.div<LoadingComponentProps>`
  border: ${props => props.border} solid ${fromTheme('tertiary')};
  border-radius: 50%;
  border-top: ${props => props.border} solid #fff;
  width: ${props => props.size};
  height: ${props => props.size};
  animation: ${spin} 2s linear infinite;
`
