// import fromTheme from 'utils/fromTheme'

import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.section)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;
  position: relative;
  background-color: #6e4850;

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
    background-color: #ec5878;
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
      color: #ec5878;
    }
  }

  .DotsLoader {
    margin: 8px 0 16px 0;
  }
`

export default Style

Style.displayName = 'EditProfile-Style'
