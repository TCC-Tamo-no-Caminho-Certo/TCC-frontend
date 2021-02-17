import { Form as RealForm } from 'components/Form'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const LoginFailed = styled(motion.div)`
  width: auto;
  margin: 0;

  color: ${({ theme }) => theme.colors.red};
  align-self: flex-end;

  .Icon {
    width: 24px;
    fill: ${({ theme }) => theme.colors.red};

    margin-right: 8px;
  }
`

export const Register = styled.div`
  flex-direction: column;

  button {
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      filter: brightness(1.1);
      transform: scale(1.01);
    }
  }
`

export const Form = styled(RealForm)`
  flex-direction: column;

  width: clamp(300px, 70%, 530px);

  > * {
    width: 100%;
    margin-bottom: 2.5vh;

    &:last-child {
      margin-bottom: 0;
    }
  }

  button#login {
    position: relative;

    height: max(5vh, 35px);
    transition: all 0.2s;
    font-size: calc(1.3rem + 0.5vh);
    border-radius: 8px;

    border: none;
    color: ${({ theme }) => theme.colors.secondary};
    background-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      filter: brightness(1.1);
      transform: scale(1.01);
    }

    .DotsLoader {
      position: absolute;
      right: 10%;
      top: 50%;

      transform: translateY(-50%);
    }
  }

  div#fail {
    position: relative;
    margin-bottom: 0;

    height: 0;

    ${LoginFailed} {
      position: absolute;
      top: 0;
      left: 16px;
    }
  }

  .Text + .Text {
    margin-bottom: 0;
  }

  a {
    align-self: flex-end;

    padding: 4px 16px 4px 0px;
    width: auto;
    margin: 0;

    font-size: calc(1.1rem + 0.5vh);
    text-align: end;

    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      filter: brightness(1.1);
    }
  }

  #Padlock {
    width: 16px;
  }

  @media screen and (min-height: 700px) {
    form {
      margin-top: 0;
    }
  }
`

const Style = styled.div`
  position: relative;
  z-index: 2;

  width: max(100vw + 1px, 320px);
  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.secondary};

  &,
  ${Form}, ${LoginFailed}, ${Register} {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Checkbox {
    padding-bottom: 8px;

    border-bottom: 2px solid ${({ theme }) => theme.colors.tertiary};
  }

  .ThemeSwitch {
    position: absolute;
    top: 24px;
    right: 10%;

    height: max(4vh, 33px);
  }

  @media screen and (min-width: 1200px) {
    width: calc(38vw + 1px);
    border-radius: 20px 0 0 20px;
  }
`

export default Style

LoginFailed.displayName = 'LoginFailed-Style'
Register.displayName = 'Register-Style'
Form.displayName = 'ContentForm-Style'
Style.displayName = 'FormLogin-Style'
