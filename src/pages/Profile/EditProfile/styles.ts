import Form from 'components/Form'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ConfirmForm = styled(Form)`
  position: relative;
  padding: 24px;
  border-radius: 16px;
  transform: scale(1.2);
  background-color: ${({ theme }) => theme.colors.secondary};

  span {
    display: block;
    width: calc(100% - 24px);
    text-align: left;
  }

  #CloseIcon {
    position: absolute;
    top: 24px;
    right: 24px;
    width: 16px;

    stroke: ${({ theme }) => theme.colors.tertiary};

    &:hover {
      filter: brightness(1.1);

      stroke: ${({ theme }) => theme.colors.primary};
    }
  }

  .Text {
    margin: 16px 0;
  }

  #buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    height: 44px;

    button#cancel {
      color: ${({ theme }) => theme.colors.tertiary};

      &:hover {
        filter: brightness(1.1);
        transform: scale(1.01);

        color: ${({ theme }) => theme.colors.primary};
      }
    }

    button + button {
      height: 40px;
      width: 180px;
      border-radius: 8px;
      margin-left: 24px;

      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.secondary};

      &:hover {
        filter: brightness(1.1);
        transform: scale(1.01);
      }
    }
  }
`

const Style = styled(motion.section)`
  position: relative;

  min-height: 100vh;

  background-color: ${({ theme }) => theme.colors.tertiary};

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    height: 100%;
    width: 100%;
  }

  &,
  ${ConfirmForm} {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .Card + .Card {
    margin-left: 60px;
  }

  #submits {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      height: 40px;
      border-radius: 15px;

      color: ${({ theme }) => theme.colors.secondary};
      background-color: transparent;

      &:hover {
        color: ${({ theme }) => theme.colors.primary};
      }
    }

    button + button {
      width: 200px;
      height: 40px;
      border-radius: 15px;

      margin-left: 24px;

      color: ${({ theme }) => theme.colors.secondary};
      background-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.49);
      transition: transform 1s ease;

      &:hover {
        transform: scale(1.03);
      }
    }
  }

  .DotsLoader {
    margin: 8px 0 16px 0;
  }

  .Slider {
    margin: 32px 0;
  }

  @media screen and (min-width: 1500px) {
    #submits {
      align-self: flex-end;

      margin-right: 64px;
    }
  }
`

export default Style

ConfirmForm.displayName = 'ConfirmForm-Style'
Style.displayName = 'EditProfile-Style'
