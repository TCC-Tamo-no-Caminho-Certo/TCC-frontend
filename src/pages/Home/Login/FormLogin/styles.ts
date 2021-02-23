import { Form as RealForm } from 'components/Form'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const LoginFailed = styled(motion.div)`
  width: 100%;
  align-self: flex-end;

  color: ${({ theme }) => theme.colors.red};

  p {
    font-size: clamp(1.4rem, 0.6rem + 2.6vw, 1.8rem);
  }

  .Icon {
    width: 24px;
    fill: ${({ theme }) => theme.colors.red};

    margin-right: 8px;
  }
`
export const Form = styled(RealForm)`
  flex-direction: column;

  width: clamp(284px, 70%, 530px);

  > * {
    width: 100%;
    margin-bottom: max(2.5vh, 15px);
  }

  #submit {
    display: flex;
    flex-direction: column;

    a {
      align-self: flex-end;

      text-align: end;
      padding-bottom: 4px;
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.9rem);

      color: ${({ theme }) => theme.colors.primary};

      &:hover {
        filter: brightness(1.1);
      }
    }

    .Submit {
      transition: all 0.2s;

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
  }

  #footer {
    margin-bottom: 0px;

    .Checkbox {
      padding-bottom: 8px;
      border-bottom: 2px solid ${({ theme }) => theme.colors.tertiary};
    }

    #register {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      padding-top: 8px;

      &,
      button {
        font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.9rem);
      }

      button {
        color: ${({ theme }) => theme.colors.primary};

        &:hover {
          filter: brightness(1.1);
          transform: scale(1.01);
        }
      }
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
  ${Form}, ${LoginFailed} {
    display: flex;
    justify-content: center;
    align-items: center;
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
Form.displayName = 'ContentForm-Style'
Style.displayName = 'FormLogin-Style'
