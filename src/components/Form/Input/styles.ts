import styled, { css } from 'styled-components'

interface StyleProps {
  hasIcon: boolean
  hasEye: boolean
  hidden?: boolean
  isFilled: boolean
  isErrored: boolean
  color: string
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
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  align-items: center;

  min-height: 35px;
  height: 4.5vh;
  font-size: calc(1.3rem + 0.5vh);
  border-radius: 10px;

  .iconSpace {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 15%;
    height: 100%;
  }

  .Icon {
    width: 24px;
    margin: 0 8px;

    fill: ${({ theme }) => theme.colors.tertiary};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};

    &,
    input::placeholder,
    .Icon {
      color: ${({ theme }) => theme.colors.primary};
      -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
    }
  }

  ${({ isFilled }) =>
    isFilled &&
    css`
      &,
      .Icon {
        color: ${({ theme }) => theme.colors.primary};
        -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
      }
    `}

  ${({ hasEye, hasIcon, color }) => css`
    input {
      width: ${setWidth(hasEye, hasIcon)};
      height: 100%;

      border: none;
      border-radius: ${setBorderRadius(hasEye, hasIcon)};

      background-color: transparent;
      color: ${color};
      -webkit-text-fill-color: ${color};

      &::placeholder {
        color: ${({ theme }) => theme.colors.tertiary};
        -webkit-text-fill-color: ${({ theme }) => theme.colors.tertiary};
      }
    }
  `}
`

export const Field = styled.div<StyleProps>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  align-items: center;

  min-height: 35px;
  height: 4.5vh;
  font-size: calc(1.3rem + 0.5vh);
  border-radius: 10px;

  background-color: transparent;
  border: solid 1px ${({ theme }) => theme.colors.tertiary};

  input {
    height: 100%;
    border: none;
    padding-left: 16px;

    background-color: transparent;
    color: ${({ color }) => color};
    -webkit-text-fill-color: ${({ color }) => color};

    &::placeholder {
      color: ${({ theme }) => theme.colors.tertiary};
      -webkit-text-fill-color: ${({ theme }) => theme.colors.tertiary};
    }
  }

  .iconSpace {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 18%;
    height: 100%;

    .Icon {
      width: 24px;
      margin: 0 8px;

      fill: ${({ theme }) => theme.colors.tertiary};

      &:hover {
        fill: ${({ theme }) => theme.colors.red};
      }
    }
  }

  #Alert {
    fill: ${({ theme }) => theme.colors.red};
  }

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};

    &,
    input::placeholder,
    .Icon {
      fill: ${({ theme }) => theme.colors.primary};
      -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
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
      .Icon {
        color: ${({ theme }) => theme.colors.primary};
        fill: ${({ theme }) => theme.colors.primary};
        -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
      }
    `}

  ${({ hasIcon, isErrored }) =>
    !hasIcon &&
    !isErrored &&
    css`
      input {
        padding-left: 8px;
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
DefaultInput.displayName = 'DefaultInput-Style'
Field.displayName = 'Field-Style'
