import styled, { css } from 'styled-components'

import fromTheme from 'utils/fromTheme'

interface StyleProps {
  hasIcon: boolean
  hasEye: boolean

  isFocused: boolean
  isFilled: boolean
  isErrored: boolean

  iconSize?: string
  eyeSize?: string
  errorSize?: string
}

const Style = styled.div<StyleProps>`
  display: flex;
  align-items: center;

  min-height: 35px;
  height: 5vh;
  font-size: calc(1.3rem + 0.5vh);
  border-radius: 10px;

  background-color: transparent;
  border: solid 1px ${fromTheme('quaternary')};

  input {
    border: none;
    width: ${({ hasEye }) => (hasEye ? '70%' : '85%')};

    background-color: transparent;
    color: ${fromTheme('primary')};
    -webkit-text-fill-color: ${fromTheme('primary')};

    &::placeholder {
      color: ${fromTheme('quaternary')};
      -webkit-text-fill-color: ${fromTheme('quaternary')};
    }
  }

  .icon, .eyeIcon, .errorIcon {
    width: 15%;

    color: ${fromTheme('quaternary')};
  }

  .icon {
    height: ${({ iconSize }) => iconSize};
  }

  .eyeIcon {
    height: ${({ eyeSize }) => eyeSize};
  }

  .errorIcon {
    height: ${({ errorSize }) => errorSize};
  }

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: ${fromTheme('primary')};

      &,
      input::placeholder,
      .icon,
      .eyeIcon {
        color: ${fromTheme('primary')};
        -webkit-text-fill-color: ${fromTheme('primary')};
      }
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      &,
      .icon {
        color: ${fromTheme('primary')};
        -webkit-text-fill-color: ${fromTheme('primary')};
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
