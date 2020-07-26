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
  justify-content: center;
  align-items: center;
  width: 258px;
  height: 30px;
  border: none;
  background-color: transparent;
  position: relative;
  border-bottom: 2px solid ${fromTheme('tertiary')};

  .alert {
    opacity: 0.8;
    background-color: #cf3030;

    &.place-top {
      &:after {
        border-top-color: #cf3030;
      }
    }
  }

  & + div {
    margin-top: 20px;
  }

  svg {
    color: ${fromTheme('tertiary')};
    height: 100%;
    width: 10%;
    padding: 2px;
  }

  input {
    font-size: 1.1rem;
    padding: 0 4px;
    border: none;
    background-color: transparent;
    width: 90%;
    height: 100%;
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
