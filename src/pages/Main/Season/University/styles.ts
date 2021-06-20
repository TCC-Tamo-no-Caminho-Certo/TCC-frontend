import { motion } from 'framer-motion'
import styled from 'styled-components'

const Style = styled(motion.ul)`
  width: clamp(320px, 60vw, 600px);

  #universityName {
    position: relative;
    z-index: 2;

    button {
      width: 100%;
      height: 72px;
      font-size: clamp(1.8rem, 0.6rem + 2.6vw, 2.4rem);

      box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.2);
      color: ${({ theme }) => theme.colors.secondary};
      background-color: ${({ theme }) => theme.colors.primary};
      border: solid 1px ${({ theme }) => theme.colors.secondary};
    }
  }

  #seasons {
    border-radius: 0px 0px 16px 16px;
    color: ${({ theme }) => theme.colors.tertiary};
    background-color: ${({ theme }) => theme.colors.secondary};

    li {
      button {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;

        .Icon {
          width: 18px;
          height: 18px;
          min-width: 18px;
          min-height: 18px;
          margin-right: 8px;
          transform: rotate(0deg);

          fill: ${({ theme }) => theme.colors.tertiary};
        }
      }

      p {
        margin-top: 16px;
        word-break: break-all;
      }
    }

    padding: 24px;
  }
`

export default Style
