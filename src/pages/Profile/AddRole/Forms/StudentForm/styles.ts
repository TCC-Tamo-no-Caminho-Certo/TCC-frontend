import OriginalForm from 'components/Form'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const MotionReceipt = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 16px;
  padding: 8px 16px;
  border-radius: 16px;

  border: solid 1px ${({ theme }) => theme.colors.primary};

  #warning {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-bottom: 8px;

    color: ${({ theme }) => theme.colors.tertiary};

    b,
    p {
      font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.6rem);
    }

    p {
      text-align: center;
    }

    b {
      font-weight: normal;

      color: ${({ theme }) => theme.roles.moderator};
    }

    .Icon {
      height: 24px;
      width: 32px;

      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`

export const MotionWays = styled(motion.div)`
  margin-bottom: 0px;

  #title {
    height: 22px;
    margin-top: 16px;
    font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);
    line-height: clamp(1.5rem, 0.6rem + 2.6vw, 1.8rem);
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;

    margin: 16px 0;

    button {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 42px;
      border-radius: 4px;
      padding: 12px;
      transition: all 0.2s;
      font-size: clamp(1.5rem, 0.6rem + 2.6vw, 1.7rem);

      background-color: ${({ theme }) => theme.colors.tertiary};
      color: ${({ theme }) => theme.colors.white};
      box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.39);

      &:hover {
        transform: scale(1.01);

        filter: brightness(1.1);
      }

      & + button {
        margin-top: 8px;
      }
    }
  }

  #inputs {
    margin-bottom: 16px;

    .Text {
      padding-left: 8px;
      margin-bottom: 0px;
    }
  }

  @media screen and (min-width: 425px) {
    div {
      flex-direction: row;

      button {
        width: auto;

        & + button {
          margin-top: 0px;
        }
      }
    }
  }
`

export const Form = styled(OriginalForm)`
  width: 100%;

  color: ${({ theme }) => theme.colors.tertiary};

  .Text {
    margin-bottom: 16px;
  }

  .Select,
  .Text {
    height: 35px;
  }

  .Select {
    margin-bottom: 16px;
    background-color: transparent;
  }

  span {
    text-align: left;
    width: 100%;
    font-size: clamp(1.1rem, 0.6rem + 2.6vw, 1.4rem);
  }

  .Submit {
    width: 100%;

    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.39);
    transition: all 0s ease 0s;
  }
`

MotionReceipt.displayName = 'MotionReceipt-Style'
MotionWays.displayName = 'MotionWays-Style'
Form.displayName = 'Form-Style'
