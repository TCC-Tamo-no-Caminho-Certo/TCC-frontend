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

  min-height: 35px;
  height: 4.5vh;
  font-size: calc(1.3rem + 0.5vh);
  border-radius: 10px;
  padding: 0 8px;

  background-color: transparent;
  border: solid 1px ${({ theme }) => theme.colors.tertiary};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};

    &,
    input::placeholder,
    .Icon {
      fill: ${({ theme }) => theme.colors.primary};
      -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
    }
  }

  input {
    flex: 1;
    height: 100%;
    border: none;

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

    width: 40px;
    height: 100%;

    .Icon {
      width: 24px;
      margin: 0 8px;

      fill: ${({ theme }) => theme.colors.tertiary};

      &:hover {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }
  }

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
`

export default Style

Style.displayName = 'Text-Style'
