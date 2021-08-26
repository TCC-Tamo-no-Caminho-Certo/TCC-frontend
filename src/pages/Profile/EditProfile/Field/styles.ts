import styled, { css } from 'styled-components'

interface StyleProps {
  isCheckbox: boolean
}

export const Label = styled.div`
  overflow: hidden;
  line-break: loose;
  text-align: center;
  word-wrap: break-word;
  font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

  @media screen and (min-width) {
    width: 100px;
  }
`

export const Input = styled.div`
  text-align: center;

  .value,
  .Datepicker input,
  .Text {
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);
  }

  .Select {
    width: 70%;

    .Select__control {
      border: none;
    }
  }

  .Datepicker,
  .Text {
    width: 100%;
    height: 100%;
    border: none;

    input {
      height: 40px;
      text-align: center;
      width: calc(100% - 32px);
    }
  }

  .Text {
    #EyeClosedIcon,
    #EyeIcon {
      transform: translateX(-24px);
    }
  }

  .value {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
    width: calc(100% - 64px);
  }
`

export const Icon = styled.div`
  width: 24px;
  text-align: right;
  font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

  .Icon {
    width: 18px;
    height: 18px;

    fill: ${({ theme }) => theme.colors.primary};
    stroke: ${({ theme }) => theme.colors.primary};
  }

  #CloseIcon {
    width: 16px;
    height: 16px;

    path {
      stroke-width: 50;
    }
  }
`

const Style = styled.div<StyleProps>`
  position: relative;

  display: flex;
  align-items: left;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  padding: 0 4px;
  border-radius: 5px;

  color: ${({ theme }) => theme.colors.tertiary};
  border: ${({ isCheckbox, theme }) =>
    isCheckbox ? 'none' : `solid 1px ${theme.colors.tertiary}`};

  & + & {
    margin-top: 24px;
  }

  ${Label}, ${Input}, ${Icon} {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 42px;
  }

  ${Label} {
    min-width: ${({ isCheckbox }) => (isCheckbox ? '50%' : '64px')};
  }

  ${Input} {
    flex: 1;
  }

  @media screen and (min-width: 545px) {
    flex-direction: row;

    ${Input} {
      ${({ isCheckbox }) =>
        isCheckbox
          ? css`
              width: 50%;
            `
          : css`
              flex: 1;
            `}
    }

    #icon {
      position: static;
    }
  }
`

export default Style

Label.displayName = 'Label-Style'
Input.displayName = 'Input-Style'
Icon.displayName = 'Icon-Style'
Style.displayName = 'Container-Style'
