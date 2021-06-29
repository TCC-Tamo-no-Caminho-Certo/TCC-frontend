import { motion } from 'framer-motion'
import { darken } from 'polished'
import styled from 'styled-components'

const Style = styled(motion.div)`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-top: 24px;
  width: 320px;

  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 3px 3px 3px 0px rgba(0, 0, 0, 0.39);
  background-color: ${({ theme }) => darken(0.1, theme.colors.tertiary)};

  button {
    padding: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${({ theme }) => theme.colors.secondary};

    #closeIcon {
      border-radius: 50%;

      .Icon {
        width: 22px;
        height: 22px;

        stroke: ${({ theme }) => theme.colors.secondary};
      }
    }

    #invite {
      margin-left: 24px;
      text-align: center;
      font-size: clamp(1.4rem, 0.6rem + 2.6vw, 2rem);
    }
  }

  #body {
    width: 100%;
    padding: 0 24px 24px 24px;

    .Select {
      margin-bottom: 24px;
    }

    .Submit {
      margin-top: 24px;
      width: 100%;
    }
  }
`

export default Style
