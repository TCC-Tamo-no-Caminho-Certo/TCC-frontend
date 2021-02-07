import Form from 'components/Form'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ConfirmForm = styled(Form)`
  position: relative;
  padding: 24px;
  border-radius: 16px;
  transform: scale(1.2);
  background-color: #fcfcfc;

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

    stroke: #6e4850;

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
      color: #6e4850;

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
      color: #fcfcfc;

      &:hover {
        filter: brightness(1.1);
        transform: scale(1.01);
      }
    }
  }
`

const Style = styled(motion.section)`
  position: relative;

  height: 100vh;

  background-color: #6e4850;

  &,
  ${ConfirmForm} {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  h2 {
    position: absolute;
    top: 5%;

    color: white;
    font-size: 3rem;
  }

  .Card + .Card {
    margin-left: 60px;
  }

  #saveButton {
    position: absolute;
    right: 10%;
    bottom: 8%;

    width: 200px;
    height: 40px;
    border-radius: 15px;

    color: #fcfcfc;
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 2px 3px 5px 0px rgba(0, 0, 0, 0.49);
    transition: transform 1s ease;

    &:hover {
      transform: scale(1.03);
    }
  }

  #discardButton {
    position: absolute;
    right: 10%;
    bottom: 8%;

    height: 40px;
    border-radius: 15px;
    margin-right: 220px;

    color: #fcfcfc;
    background-color: transparent;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .DotsLoader {
    margin: 8px 0 16px 0;
  }
`

export default Style

Style.displayName = 'EditProfile-Style'
