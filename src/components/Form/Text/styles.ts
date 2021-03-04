import styled, { css } from 'styled-components'

interface StyleProps {
  hasIcon: boolean
  hasEye: boolean
  isFilled: boolean
  isErrored: boolean
  color: string
  hidden?: boolean
}

const Style = styled.div<StyleProps>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};
  align-items: center;

  height: clamp(35px, 3vh + 2vw, 44px);
  min-width: 284px;
  border-radius: 10px;

  background-color: transparent;
  border: solid 1px ${({ theme }) => theme.colors.tertiary};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};

    &,
    input::placeholder,
    .iconSpace .Icon {
      fill: ${({ theme }) => theme.colors.primary};
      stroke: ${({ theme }) => theme.colors.primary};
      -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
    }
  }

  input {
    height: 100%;

    border: none;
    background-color: transparent;
    color: ${({ color }) => color};
    -webkit-text-fill-color: ${({ color }) => color};

    &::placeholder {
      color: ${({ theme }) => theme.colors.tertiary};
      -webkit-text-fill-color: ${({ theme }) => theme.colors.tertiary};
    }

    ${({ hasEye }) =>
      hasEye
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
  }

  .iconSpace {
    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 40px;
    max-width: 40px;
    height: 100%;
    margin: 0 2%;

    .Icon {
      display: flex;
      justify-content: center;
      align-items: center;

      width: clamp(24px, 2vh, 30px);
      height: clamp(24px, 2vh, 30px);

      fill: ${({ theme }) => theme.colors.tertiary};
    }
  }

  ${({ isFilled }) =>
    isFilled &&
    css`
      &,
      .iconSpace .Icon {
        fill: ${({ theme }) => theme.colors.primary};
        stroke: ${({ theme }) => theme.colors.primary};
        -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
      }
    `}
`

export default Style

Style.displayName = 'Text-Style'
