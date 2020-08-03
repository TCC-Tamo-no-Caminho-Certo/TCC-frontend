import styled, { css } from 'styled-components'
import fromTheme from 'utils/fromTheme'

interface StyleProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
  hasIcon: boolean
}

export const Style = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 440px;
  height: 44px;
  position: relative;
  border-radius: 10px;
  background-color: transparent;
  border: solid 1px ${fromTheme('tertiary')};

  svg {
    width: 10%;
    color: ${fromTheme('tertiary')};
  }

  input {
    height: 100%;
    padding: 0 4px;
    border: none;
    flex: 1;
    background-color: transparent;
    font-size: 1.6rem;
    color: ${fromTheme('primary')};

    &::placeholder {
      color: ${fromTheme('tertiary')};
    }
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: ${fromTheme('primary')};
      &,
      input::placeholder,
      svg {
        color: ${fromTheme('primary')};
      }
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      &,
      svg {
        color: ${fromTheme('primary')};
      }
    `}

  ${({ hasIcon, isErrored }) =>
    !hasIcon &&
    !isErrored &&
    css`
      input {
        padding-left: 20px;
      }
    `}
`
