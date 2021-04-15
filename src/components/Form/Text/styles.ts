import { TextColors } from './'

import { lighten } from 'polished'
import styled, { css } from 'styled-components'

interface StyleProps {
  colors: TextColors
  hasEye: boolean
  hasIcon: boolean
  optional: boolean
  isFilled: boolean
  isErrored: boolean
  hidden?: boolean
}

export const IconSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 40px;
  max-width: 40px;
  height: 100%;
  margin: 0 2%;

  .Icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: clamp(24px, 2vh, 30px);
    height: clamp(24px, 2vh, 30px);
  }
`

const Style = styled.div<StyleProps>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  align-items: center;

  min-width: 284px;
  border-radius: 10px;
  height: clamp(35px, 3vh + 2vw, 44px);

  background-color: transparent;
  border: solid 1px ${({ colors }) => colors.unfocused};

  &:focus-within {
    border-color: ${({ colors }) => colors.focused};

    &,
    input::placeholder,
    ${IconSpace} .Icon {
      fill: ${({ colors }) => colors.focused};
      stroke: ${({ colors }) => colors.focused};
      -webkit-text-fill-color: ${({ colors }) => colors.focused};
    }
  }

  ${IconSpace} .Icon {
    fill: ${({ colors }) => colors.unfocused};
  }

  input {
    height: 100%;

    border: none;
    background-color: transparent;
    color: ${({ color }) => color};
    -webkit-text-fill-color: ${({ color }) => color};

    &::placeholder {
      color: ${({ colors }) => colors.unfocused};
      -webkit-text-fill-color: ${({ colors }) => colors.unfocused};

      ${({ optional, theme }) =>
        optional &&
        css`
          font-style: italic;

          color: ${lighten(0.1, theme.colors.tertiary)};
          -webkit-text-fill-color: ${lighten(0.1, theme.colors.tertiary)};
        `}
    }

    ${({ hasEye, hasIcon }) =>
      hasEye && hasIcon
        ? css`
            width: calc(100% - 80px);
          `
        : css`
            width: calc(100% - 40px);
          `}

    ${({ hasIcon }) =>
      !hasIcon &&
      css`
        padding-left: 16px;
      `}

    ${({ isErrored }) =>
      isErrored &&
      css`
        padding-left: 0px;
      `}
  }

  ${({ isFilled, colors }) =>
    isFilled &&
    css`
      &,
      ${IconSpace} .Icon {
        fill: ${colors.focused};
        stroke: ${colors.focused};
        -webkit-text-fill-color: ${colors.focused};
      }
    `}
`

export default Style

IconSpace.displayName = 'IconSpace-Style'
Style.displayName = 'Text-Style'
