import styled, { css } from 'styled-components'

import fromTheme from 'utils/fromTheme'

import captcha from 'react-google-recaptcha'

interface StyleProps {
  hasIcon: boolean

  hasEye: boolean

  hidden?: boolean

  isFilled: boolean

  isErrored: boolean
}

export const Style = styled.div<StyleProps>`
  display: ${({ hidden }) => (hidden ? 'none' : 'flex')};

  align-items: center;

  min-height: 35px;

  height: 4.5vh;

  font-size: calc(1.3rem + 0.5vh);

  border-radius: 10px;

  background-color: transparent;

  border: solid 1px ${fromTheme('quaternary')};

  input {
    border: none;

    border-radius: 10px;

    height: 100%;

    width: ${({ hasEye, hasIcon }) =>
      hasEye && hasIcon ? '70%' : hasEye || hasIcon ? '85%' : '100%'};

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

  cursor: pointer;

  width: 16px;

  height: 16px;

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

export const ReCAPTCHA = styled(captcha)`
  display: none;
`

export { captcha }

ReCAPTCHA.displayName = 'ReCAPTCHA'

CheckboxStyle.displayName = 'Style'

Style.displayName = 'Style'
