import fromTheme from 'utils/fromTheme'

import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ConfirmModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  z-index: 3;

  height: 100%;
  width: 100%;

  background-color: rgba(0, 0, 0, 0.75);

  & > div {
    height: 35%;
    width: 25%;
    padding: 0;
    border-radius: 20px;
    justify-content: center;

    > div {
      width: 75%;
    }

    button {
      background-color: ${fromTheme('primary')};
      color: ${fromTheme('white')};
      border-radius: 10px;
      width: 40%;
      height: 100%;
    }

    > .buttons {
      height: 10%;
      width: 80%;
      display: flex;
      justify-content: space-around;
      margin-top: 10%;

      & + button {
        margin-right: 20px;
      }
    }
  }
`

const Style = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  position: relative;
  background-color: ${fromTheme('tertiary')};

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

    color: ${fromTheme('white')};
    background-color: ${fromTheme('primary')};
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

    color: ${fromTheme('white')};
    background-color: transparent;

    &:hover {
      color: ${fromTheme('primary')};
    }
  }
`

export default Style

Style.displayName = 'Slider-Style'
ConfirmModal.displayName = 'ConfirmModal-Style'
