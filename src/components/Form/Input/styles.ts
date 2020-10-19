import styled, { css } from 'styled-components'

import fromTheme from 'utils/fromTheme'

interface StyleProps {
  hasIcon: boolean
  hasEye: boolean
  hidden?: boolean
  isFilled: boolean
  isErrored: boolean
}

function setBorderRadius(hasEye: boolean, hasIcon: boolean) {
  if (hasEye && hasIcon) return '0px'
  if (hasEye) return '10px 0px 0px 10px'
  if (hasIcon) return '0px 10px 10px 0px'
  return '10px'
}

function setWidth(hasEye: boolean, hasIcon: boolean) {
  if (hasEye && hasIcon) return '70%'
  if (hasEye || hasIcon) return '85%'
  return '100%'
}

export const DefaultInput = styled.div<StyleProps>`
  display: none;
`

export const Field = styled.div<StyleProps>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  align-items: center;
  min-height: 35px;
  height: 4.5vh;

  font-size: calc(1.3rem + 0.5vh);
  border-radius: 10px;
  background-color: transparent;
  border: solid 1px ${fromTheme('quaternary')};

  input {
    height: 100%;

    border: none;
    background-color: transparent;
    color: ${fromTheme('primary')};
    -webkit-text-fill-color: ${fromTheme('primary')};

    &::placeholder {
      color: ${fromTheme('quaternary')};
      -webkit-text-fill-color: ${fromTheme('quaternary')};
    }
  }

  .icon,
  .eyeIcon,
  .errorIcon {
    width: 15%;
    height: 100%;
    padding: 9px 0;

    color: ${fromTheme('quaternary')};
  }

  &:focus-within {
    border-color: ${fromTheme('primary')};

    &,
    input::placeholder,
    .icon,
    .eyeIcon {
      color: ${fromTheme('primary')};
      -webkit-text-fill-color: ${fromTheme('primary')};
    }
  }

  ${({ hasEye, hasIcon }) => css`
    input {
      width: ${setWidth(hasEye, hasIcon)};
      border-radius: ${setBorderRadius(hasEye, hasIcon)};
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
    `}
`

export const CheckboxStyle = styled.div<StyleProps>`
  position: relative;

  width: 16px;
  height: 16px;
  cursor: pointer;

  input,
  svg {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;
  }

  input {
    display: none;
  }
`

CheckboxStyle.displayName = 'Checkbox-Style'
Field.displayName = 'Field-Style'
