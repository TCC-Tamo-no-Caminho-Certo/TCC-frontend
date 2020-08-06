import styled, { css } from 'styled-components'
import fromTheme from 'utils/fromTheme'

interface StyleProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
  hasIcon: boolean
  hasEye: boolean
}

const Style = styled.div<StyleProps>`
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: transparent;
  border: solid 1px ${fromTheme('tertiary')};

  svg {
    width: 15%;
  }

  input {
    background-color: transparent;
    border: none;
    color: ${fromTheme('primary')};
    width: ${({ hasEye }) => (hasEye ? '70%' : '85%')};

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
    `}`

export default Style
